import { useState } from "react";
import "@/styles/geoapify-custom.css";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import logo from "@/assets/IMG/plan2TripLogo.png";
import { FcGoogle } from "react-icons/fc";

import {
  selectBudgetOption,
  selectTravelList,
} from "@/components/constants/Options";
import FooterPage from "@/pages/homepage/FooterPage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { generateTripPlan } from "@/services/AImodel";

interface GeoapifyPlace {
  properties: {
    city?: string;
    formatted?: string;
  };
}

interface FormData {
  destination?: GeoapifyPlace;
  days?: number;
  budget?: string;
  travelWith?: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // --- Google Login Setup ---
  const logIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login success:", tokenResponse);
      localStorage.setItem("user", JSON.stringify(tokenResponse));

      try {
        const profile = await getUserProfile(tokenResponse.access_token);
        console.log("User Profile:", profile);
        localStorage.setItem("userProfile", JSON.stringify(profile));
      } catch (err) {
        console.error("Error fetching Google user profile:", err);
      }

      setOpenDialog(false); // Close login dialog after successful login
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      alert("Google login failed, please try again.");
    },
  });

  const getUserProfile = (accessToken: string) => {
    return axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      })
      .then((resp) => resp.data);
  };

  // --- Form Handlers ---
  const handlePlaceSelect = (value: GeoapifyPlace | null) => {
    if (value) setFormData((prev) => ({ ...prev, destination: value }));
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, days: Number(e.target.value) }));

  const handleBudgetSelect = (budget: string) =>
    setFormData((prev) => ({ ...prev, budget }));

  const handleTravelSelect = (travelWith: string) =>
    setFormData((prev) => ({ ...prev, travelWith }));

  // --- Submit Trip ---
  const handleSubmit = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true); // Open login dialog if user not logged in
      return;
    }

    if (
      !formData.destination ||
      !formData.days ||
      !formData.budget ||
      !formData.travelWith
    ) {
      alert("Please fill out all the fields before generating your trip.");
      return;
    }

    setLoading(true);

    try {
      const cityName =
        formData.destination?.properties?.city ||
        formData.destination?.properties?.formatted ||
        "your chosen location";

      const tripPlan = await generateTripPlan({
        cityName,
        days: formData.days,
        travelWith: formData.travelWith,
        budget: formData.budget,
      });

      setAiResponse(tripPlan);
    } catch (error) {
      console.error("Error generating trip:", error);
      alert(
        "Something went wrong. Please check your API key or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" px-7 sm:px-15 md:px-30 lg:px-60  pt-5 bg-gradient-to-t from-amber-50 via-amber-50 to-transparent">
      <div>
        <h1 className="lg:text-3xl text-2xl text-amber-800 font-bold">
          Build Your Dream Trip in Minutes
          <span className="text-xl lg:text-2xl">🍂</span>
        </h1>
        <p className="text-gray-500">
          Answer a few simple questions — our AI trip planner will craft a
          personalized itinerary that fits your vibe, time, and budget.
        </p>
      </div>
      <div className="my-custom-input mt-10">
        <h1 className="font-semibold mb-1 ml-1">Where do you want to go?</h1>
        <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
          <GeoapifyGeocoderAutocomplete
            placeholder="Search destination…"
            debounceDelay={300}
            type="city"
            value=""
            placeSelect={handlePlaceSelect}
          />
        </GeoapifyContext>
        <h1 className="font-semibold ml-1 mb-1 mt-3">
          Enter the total number of travel days?
        </h1>
        <input
          onChange={handleDaysChange}
          type="number"
          placeholder="Enter days.."
          className="py-1 px-2 w-full rounded-[15px] outline-none  border-[#ecd7b3] focus:border-[#f8b033] bg-white  border-2"
        />
      </div>
      {/* budget select  */}
      <h1 className="mt-4 font-semibold ml-1 mb-1">
        What’s your travel budget?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {selectBudgetOption.map((elem, i) => {
          return (
            <div
              onClick={() => handleBudgetSelect(elem.title)}
              key={i}
              className={`bg-white cursor-pointer  border-amber-200 border rounded-2xl p-5 shadow-sm hover:shadow-md transition ${
                formData.budget === elem.title
                  ? "border-amber-700 border-2"
                  : "border-amber-200"
              } `}
            >
              <h1 className="text-3xl">{elem.icon}</h1>
              <h1 className="font-bold">{elem.title}</h1>
              <p className="text-gray-500">{elem.desc}</p>
            </div>
          );
        })}
      </div>
      {/* select travel  */}
      <h1 className="mt-4 font-semibold ml-1 mb-1">
        Whats your travel budget..?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {selectTravelList.map((elem, i) => {
          return (
            <div
              onClick={() => handleTravelSelect(elem.title)}
              key={i}
              className={`bg-white border ${
                formData.travelWith === elem.title
                  ? "border-amber-700 border-2"
                  : "border-amber-200"
              } border-amber-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition`}
            >
              <h1 className="text-3xl">{elem.icon}</h1>
              <h1 className="font-bold">{elem.title}</h1>
              <p className="text-gray-500">{elem.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          className="my-5 bg-amber-800 hover:bg-amber-600 text-white px-6 py-2 rounded-md transition"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate My Trip ✨"}
        </button>
      </div>

      {/* AI Response */}
      {aiResponse && (
        <div className="mt-10 bg-white p-5 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold text-amber-800 mb-2">
            Your AI Trip Plan
          </h2>
          <pre className="whitespace-pre-wrap text-gray-700">{aiResponse}</pre>
        </div>
      )}

      {/* Google Login Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="w-25 h-12" src={logo} alt="Plan2Trip Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={() => logIn()}
                className="w-full mt-5 bg-amber-800 hover:bg-amber-700 flex items-center justify-center gap-2"
              >
                <FcGoogle /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <FooterPage />
    </div>
  );
};

export default Index;
