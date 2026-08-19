import type Anthropic from "@anthropic-ai/sdk";
import { searchCars } from "@/data/cars";
import { searchPowersports } from "@/data/powersports";
import { getServices, getServicesByCategory } from "@/data/services";
import { getDealers, getDealersByCountry } from "@/data/dealers";
import { getShippingRate, getShippingRates } from "@/data/shipping";
import { findFaqAnswer } from "@/data/faq";
import type { CarCategory, CarCondition, PowersportType, ServiceCategory, VehicleType } from "@/types";

export const aiTools: Anthropic.Tool[] = [
  {
    name: "search_cars",
    description:
      "Search real, currently in-stock cars in the AutoMarketplace catalog. Always use this before describing any specific car, price, or availability.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Free-text search on make/model/trim" },
        make: { type: "string" },
        category: {
          type: "string",
          enum: ["sedan", "suv", "truck", "sports-car", "luxury", "electric", "hatchback"],
        },
        condition: { type: "string", enum: ["new", "used", "certified-pre-owned"] },
        country: { type: "string", description: "Country the car is currently located in" },
        maxPrice: { type: "number" },
      },
    },
  },
  {
    name: "search_powersports",
    description:
      "Search real, currently in-stock motorcycles, dirt bikes, and jet skis in the AutoMarketplace catalog. Always use this before describing any specific listing, price, or availability.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string" },
        type: { type: "string", enum: ["motorcycle", "dirt-bike", "jet-ski"] },
      },
    },
  },
  {
    name: "get_services",
    description:
      "Get real warranty, maintenance, insurance, or detailing services we offer, with real prices.",
    input_schema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["warranty", "maintenance", "insurance", "detailing"],
        },
      },
    },
  },
  {
    name: "get_dealers",
    description: "Get real AutoMarketplace dealer/pickup locations, optionally filtered by country.",
    input_schema: {
      type: "object",
      properties: {
        country: { type: "string" },
      },
    },
  },
  {
    name: "get_shipping_rate",
    description:
      "Get the real shipping cost and estimated delivery time to a destination country for a vehicle type. We currently ship to exactly these 10 countries: Canada, United States, United Kingdom, France, India, United Arab Emirates, China, South Korea, Australia, New Zealand. If asked about any other country, tell the customer we don't currently ship there instead of guessing a cost.",
    input_schema: {
      type: "object",
      properties: {
        destinationCountry: { type: "string" },
        vehicleType: { type: "string", enum: ["car", "motorcycle", "jet-ski"] },
      },
      required: ["destinationCountry", "vehicleType"],
    },
  },
  {
    name: "get_all_shipping_rates",
    description: "Get the full shipping rate table for all 10 supported destination countries.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "find_faq_answer",
    description: "Search AutoMarketplace's FAQ for a policy or how-it-works question.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
  },
];

export async function executeAiTool(name: string, input: Record<string, unknown>): Promise<string> {
  switch (name) {
    case "search_cars": {
      const results = await searchCars({
        query: input.query as string | undefined,
        make: input.make as string | undefined,
        category: input.category as CarCategory | undefined,
        condition: input.condition as CarCondition | undefined,
        country: input.country as string | undefined,
        maxPrice: input.maxPrice as number | undefined,
      });
      return JSON.stringify(
        results.slice(0, 8).map((car) => ({
          id: car.id,
          year: car.year,
          make: car.make,
          model: car.model,
          trim: car.trim,
          category: car.category,
          price: car.price,
          currency: car.currency,
          condition: car.condition,
          mileage: car.mileage,
          country: car.country,
          location: car.location,
          shippingCost: car.shippingCost,
          estimatedShippingDays: car.estimatedShippingDays,
        }))
      );
    }
    case "search_powersports": {
      const results = await searchPowersports({
        query: input.query as string | undefined,
        type: input.type as PowersportType | undefined,
      });
      return JSON.stringify(
        results.slice(0, 8).map((item) => ({
          id: item.id,
          year: item.year,
          make: item.make,
          model: item.model,
          type: item.type,
          price: item.price,
          currency: item.currency,
          condition: item.condition,
          country: item.country,
          location: item.location,
          shippingCost: item.shippingCost,
          estimatedShippingDays: item.estimatedShippingDays,
        }))
      );
    }
    case "get_services": {
      const results = input.category
        ? await getServicesByCategory(input.category as ServiceCategory)
        : await getServices();
      return JSON.stringify(results);
    }
    case "get_dealers": {
      const results = input.country
        ? await getDealersByCountry(input.country as string)
        : await getDealers();
      return JSON.stringify(
        results.map((dealer) => ({
          name: dealer.name,
          city: dealer.city,
          country: dealer.country,
          phone: dealer.phone,
          servicesOffered: dealer.servicesOffered,
        }))
      );
    }
    case "get_shipping_rate": {
      const rate = await getShippingRate(
        input.destinationCountry as string,
        input.vehicleType as VehicleType
      );
      return rate ? JSON.stringify(rate) : JSON.stringify({ error: "We don't currently ship to that destination." });
    }
    case "get_all_shipping_rates": {
      const rates = await getShippingRates();
      return JSON.stringify(rates);
    }
    case "find_faq_answer": {
      const match = await findFaqAnswer(input.query as string);
      return match ? JSON.stringify(match) : JSON.stringify({ error: "No FAQ match found." });
    }
    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}
