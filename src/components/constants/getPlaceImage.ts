export const getUnsplashImage = async (
  query: string,
  perPage: number = 10
): Promise<string | null> => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
        },
      }
    );

    const data = await res.json();
    if (!data.results || data.results.length === 0) return null;

    // Pick a random image from the results
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return data.results[randomIndex].urls.regular;
  } catch (error) {
    console.error("Unsplash API Error:", error);
    return null;
  }
};
