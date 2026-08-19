"use client";

import { useState } from "react";
import faqData from "@/data/mock/faq.json";
import type { FaqEntry } from "@/types";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

const quickReplies = (faqData as FaqEntry[]).slice(0, 4);

const WELCOME_MESSAGE: ChatMessage = {
  role: "bot",
  text: "Hi! I'm the AutoMarketplace assistant. Ask me about real cars, powersports, shipping, warranty, or insurance — or tap a question below.",
};

const FALLBACK_ANSWER =
  "Something went wrong reaching the assistant. Please try again, or visit the Contact page and our team will help.";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role === "bot" ? "assistant" : "user",
            text: message.text,
          })),
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply ?? FALLBACK_ANSWER }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: FALLBACK_ANSWER }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <p className="text-base font-semibold">AutoMarketplace Assistant</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <p className="max-w-[85%] rounded-2xl bg-muted px-3 py-2 text-sm text-muted-foreground">
                  Thinking…
                </p>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 border-t px-4 py-3">
              {quickReplies.map((faq) => (
                <button
                  key={faq.id}
                  type="button"
                  onClick={() => sendMessage(faq.question)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground/90 hover:bg-muted"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2 border-t p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a question..."
              disabled={isLoading}
              className="h-10 flex-1 rounded-full border border-border px-4 text-sm disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-10 shrink-0 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-105 hover:bg-primary/90"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
