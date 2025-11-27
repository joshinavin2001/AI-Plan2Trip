export const selectBudgetOption = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscius of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];
export const selectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveles in exploration",
    icon: "🙋‍♂️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two Travel in tandem",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "👪",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "😎",
    people: "5 to 10 People",
  },
];
// export const AI_PROMPT = `
// Generate a detailed and realistic travel plan in valid JSON format only (no extra text).

// Details:
// Destination: {location}
// Duration: {days} days
// Traveler type: {traveler}
// Budget level: {budget}

// The JSON must include:
// - destination
// - duration_days
// - traveler_type
// - hotel_information: {
//     name,
//     address,
//     price_per_night_usd,
//     image_url,
//     geo: { lat, lng },
//     rating,
//     description
//   }
// - itinerary: {
//     day_wise_plan (for each day → morning, afternoon, evening)
//     Each time slot should include multiple places with:
//       - name
//       - image_url
//       - geo: { lat, lng }
//       - ticket_price_usd (0 if free)
//       - short_description
//       - best_time_to_visit
//       - estimated_travel_time_minutes
//   }
// - transportation_tips
// - money_saving_tips
// - total_estimated_budget_summary

// Return only valid JSON (no markdown, no extra explanation).
// `;
