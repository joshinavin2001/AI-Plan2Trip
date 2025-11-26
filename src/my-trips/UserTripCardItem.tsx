import placeHolder from "@/assets/IMG/placeholder.jpg";
import { getUnsplashImage } from "@/components/constants/getPlaceImage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Trip interface

interface Props {
  trip: Trip;
}
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface Place {
  name?: string;
  description?: string;
  best_time_to_visit?: string;
  geo_coordinates?: GeoCoordinates;
  image_url?: string;
}

export interface DayItinerary {
  day: number;
  places?: Place[];
}

export interface HotelOption {
  name: string;
  address: string;
  description: string;
  rating: number;
  price: number;
  image_url: string;
  geo_coordinates?: GeoCoordinates;
}

export interface DestinationProperties {
  formatted: string;
  address_line1?: string;
  city?: string;
  state_code?: string;
  postcode?: string;
}

export interface Destination {
  type?: string;
  bbox?: number[];
  geometry?: {
    type: string;
    coordinates: number[];
  };
  properties: DestinationProperties;
}

export interface UserSelection {
  days: number;
  budget: string;
  travelWith: string;
  destination: Destination;
}

export interface TripData {
  daily_itineraries: DayItinerary[];
  hotels?: HotelOption[];
}

export interface Trip {
  id: string;
  tripdata: TripData;
  user: string;
  userSelection: UserSelection;
}
const UserTripCardItem = ({ trip }: Props) => {
  const destinationName = trip?.userSelection?.destination?.properties?.city;
  const [imageUrl, setImageUrl] = useState<string>(placeHolder);

  useEffect(() => {
    const fetchImage = async () => {
      if (destinationName) {
        const img = await getUnsplashImage(destinationName);
        if (img) setImageUrl(img);
      }
    };
    fetchImage();
  }, [destinationName]);
  return (
    <>
      <Link to={"/view-trip/" + trip.id}>
        <div className="border p-4 rounded-xl shadow-md mt-4 flex gap-4 items-center">
          <img
            src={imageUrl}
            className="w-28 h-28 object-cover rounded-lg"
            alt="trip-img"
          />

          <div>
            <h2 className="font-bold text-xl">
              {trip.userSelection?.destination?.properties?.formatted ||
                "Unknown Destination"}
            </h2>

            <p className="text-gray-600">Days: {trip.userSelection?.days}</p>

            <p className="text-gray-600">
              Budget: {trip.userSelection?.budget}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserTripCardItem;
