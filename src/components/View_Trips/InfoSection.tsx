import { useEffect, useState } from "react";
import placeHolder from "@/assets/IMG/placeholder.jpg";
import { Button } from "../ui/button";
import { getUnsplashImage } from "@/components/constants/getPlaceImage";
import { FaMapLocation } from "react-icons/fa6";
interface DestinationProperties {
  city?: string;
  country?: string;
}

interface Destination {
  properties?: DestinationProperties;
}

interface UserSelection {
  destination?: Destination;
  travelWith?: string;
  days?: number;
  budget?: string;
}

interface Trip {
  us?: string;
  userSelection?: UserSelection;
}

const InfoSection = ({ trip }: { trip?: Trip }) => {
  const destinationName = trip?.userSelection?.destination?.properties?.city;
  const countryName = trip?.userSelection?.destination?.properties?.country;
  const travelWith = trip?.userSelection?.travelWith;
  const days = trip?.userSelection?.days;
  const budget = trip?.userSelection?.budget;

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
    <div>
      <img
        src={imageUrl}
        className="w-full h-[300px] object-cover rounded-xl"
        alt={destinationName || "Trip placeholder"}
      />
      <div className="mt-4 space-y-1">
        <h2 className="text-4xl ml-1 font-semibold">
          {destinationName
            ? `${destinationName}${countryName ? ", " + countryName : ""}`
            : trip?.us}
        </h2>
        <div className="flex justify-between mt-2 gap-5">
          <div className="sm:flex  gap-4">
            <h2 className="p-1 px-3 mb-2 font-semibold bg-gray-200 rounded-full">
              <p>Days: {days}</p>
            </h2>
            <h2 className="p-1 px-3 mb-2 font-semibold bg-gray-200 rounded-full">
              <p>Budget: {budget}</p>
            </h2>
            <h2 className="p-1 px-3 mb-2 font-semibold bg-gray-200 rounded-full">
              <p>Traveling with: {travelWith}</p>
            </h2>
          </div>
          <div>
            <Button className="bg-amber-700 cursor-pointer">
              <FaMapLocation />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
