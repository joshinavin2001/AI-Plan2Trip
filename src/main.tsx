import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./create-trip/Index.tsx";
import Header from "./pages/homepage/Header.tsx";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

if (!clientId) {
  throw new Error(
    "Missing VITE_GOOGLE_AUTH_CLIENT_ID in .env! Add your Google OAuth client ID."
  );
}

// Router setup
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-trip", element: <Index /> },
]);

// Root render
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </>
  </GoogleOAuthProvider>
);
