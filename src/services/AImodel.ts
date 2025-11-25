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
Generate a detailed travel plan for ${cityName} for ${days} days for ${travelWith} with a ${budget} budget.

IMPORTANT — ALWAYS FOLLOW THESE RULES:

1. Return ONLY valid JSON, no extra text.
2. Use EXACT keys as shown: "tripdata", "hotels", "daily_itineraries", "places".
3. Do NOT change key names or structure.
4. Only fill in values, do NOT add or remove keys.
5. daily_itineraries must have ${days} items, one per day.
6. Each "places" must be an array with at least four place per day.
7. hotels must be an array with at least 4 hotel.

Here is the template to fill:

{
  "tripdata": {
    "hotels": [
      {
        "name": "",
        "address": "",
        "price": 0,
        "rating": 0,
        "image_url": "",
        "description": "",
        "geo_coordinates": {
          "latitude": 0,
          "longitude": 0
        }
      }
    ],
    "daily_itineraries": [
      ${Array.from({ length: days })
        .map(
          (_, i) => `{
        "day": ${i + 1},
        "places": [
          {
            "place_name": "",
            "description": "",
            "image_url": "",
            "ticket_pricing": "",
            "travel_time": "",
            "best_time_to_visit": "",
            "geo_coordinates": {
              "latitude": 0,
              "longitude": 0
            }
          }
        ]
      }`
        )
        .join(",")}
    ]
  }
}
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
