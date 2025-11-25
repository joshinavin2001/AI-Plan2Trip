import Hotels from "@/components/View_Trips/Hotels";
import InfoSection from "@/components/View_Trips/InfoSection";
import VisitPlaces from "@/components/View_Trips/VisitPlaces";
import FooterPage from "@/pages/homepage/FooterPage";
import { db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewTrip = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [trip, setTrip] = useState({});

  useEffect(() => {
    if (!tripId) return;

    const fetchTrip = async () => {
      const docRef = doc(db, "AiTrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        setTrip({});
      }
    };

    fetchTrip();
  }, [tripId]);

  return (
    <div className="p-10 bg-gradient-to-t from-amber-50 via-amber-50 to-transparent md:px-20 lg:px-44 xl:px-56">
      {/* information section  */}
      <InfoSection trip={trip} />
      {/* hotels  */}
      <Hotels trip={trip} />
      {/* daily plans */}
      <VisitPlaces trip={trip} />
      {/* footer  */}
      <FooterPage />
    </div>
  );
};

export default ViewTrip;
