// src/components/MyTrips.tsx

import { db } from "@/services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./UserTripCardItem";

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
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div>
        {userTrips.map((trip) => (
          <UserTripCardItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
