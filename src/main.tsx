import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./create-trip/Index.tsx";
import Header from "./pages/homepage/Header.tsx";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./View-Trip/[tripId]/ViewTrip.tsx";
import MyTrips from "./my-trips/MyTrips.tsx";

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

if (!clientId) {
  throw new Error("Missing VITE_GOOGLE_AUTH_CLIENT_ID in .env!");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header /> {/* ✔️ NOW INSIDE ROUTER */}
        <App />
      </>
    ),
  },
  {
    path: "/create-trip",
    element: (
      <>
        <Header />
        <Index />
      </>
    ),
  },
  {
    path: "/view-trip/:tripId",
    element: (
      <>
        <Header />
        <ViewTrip />
      </>
    ),
  },
  {
    path: "/my-trips",
    element: (
      <>
        <Header />
        <MyTrips />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <Toaster />
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
