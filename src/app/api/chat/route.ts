import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { aiTools, executeAiTool } from "@/lib/ai/tools";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the AutoMarketplace shopping assistant. AutoMarketplace lets customers buy cars, motorcycles, and jet skis online and have them shipped internationally, with warranty, maintenance, insurance, and detailing services, trade-ins, and a supplier network for sourcing hard-to-find vehicles.

Rules you must follow:
- Never state a specific vehicle, price, shipping cost, or service detail unless it came from a tool result earlier in this conversation. Call the relevant tool first.
- We currently ship to exactly these 10 countries: Canada, United States, United Kingdom, France, India, United Arab Emirates, China, South Korea, Australia, New Zealand. If asked about shipping anywhere else, say honestly that we don't support that destination yet.
- If a tool returns no results or an error, say so plainly and suggest the Contact page or the Buy-For-Me sourcing request — never invent a listing, price, or fact to fill the gap.
- Keep answers short, warm, and easy to follow for a non-technical or first-time buyer. Avoid jargon.
- You cannot place orders, process payments, or access anyone's account — direct account/order questions to the Contact page or their Account dashboard.`;

const MAX_TOOL_ITERATIONS = 6;

interface ChatRequestMessage {
  role: "user" | "assistant";
  text: string;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      reply:
        "The AI assistant isn't connected yet — an ANTHROPIC_API_KEY needs to be added to the server environment. In the meantime, visit the Contact page and our team will help.",
    });
  }

  const body = await request.json();
  const history: ChatRequestMessage[] = Array.isArray(body.messages) ? body.messages : [];

  const client = new Anthropic();
  const messages: Anthropic.MessageParam[] = history.map((message) => ({
    role: message.role,
    content: message.text,
  }));

  let finalText = "";

  for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: aiTools,
      output_config: { effort: "low" },
      messages,
    });

    if (response.stop_reason === "pause_turn") {
      messages.push({ role: "assistant", content: response.content });
      continue;
    }

    const toolUseBlocks = response.content.filter(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    const textBlocks = response.content.filter(
      (block): block is Anthropic.TextBlock => block.type === "text"
    );
    finalText = textBlocks.map((block) => block.text).join("\n") || finalText;

    if (toolUseBlocks.length === 0) {
      break;
    }

    messages.push({ role: "assistant", content: response.content });

    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const toolUse of toolUseBlocks) {
      const result = await executeAiTool(toolUse.name, toolUse.input as Record<string, unknown>);
      toolResults.push({ type: "tool_result", tool_use_id: toolUse.id, content: result });
    }

    messages.push({ role: "user", content: toolResults });
  }

  return NextResponse.json({
    reply: finalText || "I couldn't find an answer to that. Please try the Contact page and our team will help.",
  });
}
