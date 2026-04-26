import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({ error: "Missing API configuration" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(data.error_message || "Failed to fetch from Google");
    }

    // Filter for 5-star reviews
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fiveStarReviews = (data.result.reviews || []).filter((r: any) => r.rating === 5);

    return res.status(200).json({
      rating: data.result.rating,
      total_ratings: data.result.user_ratings_total,
      reviews: fiveStarReviews,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Google Reviews Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
