// src/types/TripTypes.ts
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
