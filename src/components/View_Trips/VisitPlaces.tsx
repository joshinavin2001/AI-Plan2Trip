import { useEffect, useState } from "react";
import { getUnsplashImage } from "@/components/constants/getPlaceImage";
import placeHolder from "@/assets/IMG/placeholder.jpg";

interface Place {
  place_name: string;
  description?: string;
  best_time_to_visit?: string;
  ticket_pricing?: string;
  travel_time?: string;
  image_url?: string;
  geo_coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface DailyItinerary {
  day: number;
  places: Place[];
}

interface TripDataNested {
  daily_itineraries?: DailyItinerary[];
}

interface TripData {
  tripdata?: TripDataNested;
}

interface Trip {
  tripdata?: TripData;
}

interface VisitProps {
  trip?: Trip | null;
}

const VisitPlaces: React.FC<VisitProps> = ({ trip }) => {
  const [placeImages, setPlaceImages] = useState<{ [key: string]: string }>({});

  const itineraries: DailyItinerary[] =
    trip?.tripdata?.tripdata?.daily_itineraries || [];

  // Load Images for places
  useEffect(() => {
    if (!itineraries.length) return;

    const fetchImages = async () => {
      const images: { [key: string]: string } = {};

      for (const day of itineraries) {
        for (const place of day.places) {
          let finalImage = place.image_url;

          if (!finalImage || finalImage.includes("example.com")) {
            finalImage =
              (await getUnsplashImage(place.place_name + " tourism")) ||
              placeHolder;
          }

          images[place.place_name] = finalImage;
        }
      }

      setPlaceImages(images);
    };

    fetchImages();
  }, [itineraries]);

  if (!trip) return <p>Loading itinerary...</p>;
  if (!itineraries.length) return <p>No itineraries available</p>;

  // ⭐ OPEN GOOGLE MAPS EXACT LOCATION
  const openPlaceInMaps = (place: Place) => {
    const name = place.place_name || "";
    const lat = place.geo_coordinates?.latitude;
    const lng = place.geo_coordinates?.longitude;

    if (!lat || !lng) {
      alert("Location not available");
      return;
    }

    const query = encodeURIComponent(name);
    const url = `https://www.google.com/maps/search/${query}/@${lat},${lng},18z`;

    window.open(url, "_blank");
  };

  return (
    <div className="mt-8 space-y-10">
      {itineraries.map((day) => (
        <div key={day.day}>
          <h2 className="text-2xl font-semibold mb-3">
            Day {day.day} Itinerary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {day.places.map((place) => (
              <div
                key={place.place_name}
                className="relative border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* IMAGE */}
                <img
                  src={placeImages[place.place_name] || placeHolder}
                  alt={place.place_name}
                  className="w-full h-48 object-cover"
                />

                {/* MAP BUTTON */}
                <button
                  onClick={() => openPlaceInMaps(place)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-600"
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

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{place.place_name}</h3>

                  {place.description && (
                    <p className="text-gray-600 text-sm">{place.description}</p>
                  )}

                  {place.best_time_to_visit && (
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Best Time:</span>{" "}
                      {place.best_time_to_visit}
                    </p>
                  )}

                  {place.ticket_pricing && (
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Ticket:</span>{" "}
                      {place.ticket_pricing}
                    </p>
                  )}

                  {place.travel_time && (
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Travel Time:</span>{" "}
                      {place.travel_time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisitPlaces;
