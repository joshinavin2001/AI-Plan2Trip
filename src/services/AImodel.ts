// services/AImodel.ts
import OpenAI from "openai";

interface GenerateTripParams {
  cityName: string;
  days: number;
  travelWith: string;
  budget: string;
}

export const generateTripPlan = async ({
  cityName,
  days,
  travelWith,
  budget,
}: GenerateTripParams) => {
  try {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
      dangerouslyAllowBrowser: true,
    });

    const prompt = `
      Generate a detailed travel plan for ${cityName}
      for ${days} days for ${travelWith} with a ${budget} budget.

      Give me:
      1. Hotel options with name, address, price, image URL, geo coordinates, rating, description
      2. Daily itineraries with place name, description, image URL, geo coordinates, ticket pricing, travel time, best time to visit
      Return everything in valid JSON.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices?.[0]?.message?.content ?? "";
    return content;
  } catch (error) {
    console.error("Error generating trip:", error);
    throw error;
  }
};
