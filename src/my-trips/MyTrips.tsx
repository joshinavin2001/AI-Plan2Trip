// src/components/MyTrips.tsx

import { db } from "@/services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./UserTripCardItem";
import FooterPage from "@/pages/homepage/FooterPage";

/* ------------------ INTERFACES ------------------ */

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

/* ------------------ COMPONENT ------------------ */

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState<Trip[]>([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      navigate("/");
      return;
    }

    setUserTrips([]);

    const q = query(
      collection(db, "AiTrips"),
      where("user", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const tripData: Trip = {
        id: doc.id,
        tripdata: data.tripdata || { daily_itineraries: [], hotels: [] },
        user: data.user || "",
        userSelection: data.userSelection || {
          days: 0,
          budget: "",
          travelWith: "",
          destination: {
            properties: {
              formatted: "",
            },
          },
        },
      };

      setUserTrips((prev) => [...prev, tripData]);
    });
  };

  return (
    <div className="p-10 md:px-20 bg-gradient-to-t min-h-screen from-amber-50 via-amber-50 to-transparent lg:px-44 xl:px-56">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <h2
        className={`${
          userTrips.length === 0 ? "block" : "hidden"
        } font-medium text-gray-400 mt-2`}
      >
        Sorry No Trips Found. Please create a trip first!
      </h2>

      <div>
        {userTrips.map((trip) => (
          <UserTripCardItem key={trip.id} trip={trip} />
        ))}
      </div>
      <FooterPage />
    </div>
  );
};

export default MyTrips;
