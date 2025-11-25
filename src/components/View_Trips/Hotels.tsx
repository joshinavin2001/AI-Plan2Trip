import { useEffect, useState } from "react";
import { getUnsplashImage } from "@/components/constants/getPlaceImage";
import placeHolder from "@/assets/IMG/placeholder.jpg";

interface Hotel {
  name: string;
  description?: string;
  price?: number;
  rating?: number;
  image_url?: string;
  address?: string;
  geo_coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface TripDataNested {
  hotels?: Hotel[];
}

interface TripData {
  tripdata?: TripDataNested;
}

interface Trip {
  tripdata?: TripData;
}

interface HotelsProps {
  trip?: Trip | null;
}

const Hotels: React.FC<HotelsProps> = ({ trip }) => {
  const [hotelImages, setHotelImages] = useState<{ [key: string]: string }>({});

  const hotels: Hotel[] = trip?.tripdata?.tripdata?.hotels || [];

  // Load Images
  useEffect(() => {
    if (!hotels.length) return;

    let isMounted = true;

    const fetchImages = async () => {
      const images: { [key: string]: string } = {};

      for (const hotel of hotels) {
        let finalImage = hotel.image_url;

        if (!finalImage || finalImage.includes("example.com")) {
          finalImage =
            (await getUnsplashImage(hotel.name + " hotel")) || placeHolder;
        }

        images[hotel.name] = finalImage;
      }

      if (isMounted) setHotelImages(images);
    };

    fetchImages();
    return () => {
      isMounted = false;
    };
  }, [hotels]);

  if (!trip) return <p>Loading trip data...</p>;
  if (!hotels.length) return <p>No hotels available</p>;

  // ⭐ OPEN GOOGLE MAPS EXACT HOTEL PAGE
  const openHotelInMaps = (hotel: Hotel) => {
    const name = hotel.name || "";
    const lat = hotel.geo_coordinates?.latitude;
    const lng = hotel.geo_coordinates?.longitude;

    if (!lat || !lng) {
      alert("Hotel location not available");
      return;
    }

    // BEST URL FORMAT → name search + exact location
    const query = encodeURIComponent(name);
    const url = `https://www.google.com/maps/search/${query}/@${lat},${lng},18z`;

    window.open(url, "_blank");
  };

  return (
    <div>
      <h1 className=" text-2xl  sm:text-3xl font-bold mt-4">
        Recommended Hotels
      </h1>
      <div className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.name}
            className="relative border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* HOTEL IMAGE */}
            <img
              src={hotelImages[hotel.name] || placeHolder}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />

            {/* MAP BUTTON (SVG ONLY CLICKABLE) */}
            <button
              onClick={() => openHotelInMaps(hotel)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
            >
              {/* Map Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-6 h-6 text-amber-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.2-7.5 11.25-7.5 11.25S4.5 17.7 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </button>

            {/* CARD CONTENT */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>

              {hotel.description && (
                <p className="text-gray-600 text-sm">{hotel.description}</p>
              )}

              {hotel.address && (
                <p className="text-gray-500 text-sm">{hotel.address}</p>
              )}

              <div className="flex justify-between items-center mt-2">
                {hotel.price !== undefined && (
                  <span className="font-medium">₹{hotel.price}</span>
                )}

                {hotel.rating !== undefined && (
                  <span className="bg-amber-700 text-white text-xs px-2 py-1 rounded-full">
                    {hotel.rating} ⭐
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
