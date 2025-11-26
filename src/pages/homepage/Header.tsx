import { Button } from "@/components/ui/button";
import logo from "@/assets/IMG/plan2TripLogo.png";
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { CiLogout } from "react-icons/ci";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [openDialog, setOpenDialog] = useState(false);
  // --- Google Login Setup ---
  const logIn = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log("Google Token:", tokenInfo);
      getUserProfile(tokenInfo); // <-- YEH CALL MISSING THA
    },
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo: { access_token: string }) => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((res) => {
        console.log("User Profile:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <header className="flex justify-between py-2 px-4 bg-gradient-to-t from-amber-50 via-amber-50 to-transparent shadow-sm">
      <img className="w-25 h-12" src={logo} alt="Logo" />

      {user && user.picture ? (
        <div className="flex items-center gap-3">
          <a href="/create-trip">
            <Button variant="outline" className="rounded-full">
              Create Trip
            </Button>
          </a>
          <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
          </a>
          <Popover>
            <PopoverTrigger>
              {" "}
              <img
                src={user.picture}
                className="h-8 w-8 rounded-full cursor-pointer"
                alt="User"
              />
            </PopoverTrigger>
            <PopoverContent className="text-end">
              {" "}
              <Button
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}
                className="rounded-ful cursor-pointerl"
                variant={"outline"}
              >
                LogOut <CiLogout />
              </Button>{" "}
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button
          onClick={() => setOpenDialog(true)}
          className="bg-amber-800 mt-1 hover:bg-amber-700"
        >
          Sign In
        </Button>
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
    </header>
  );
};

export default Header;
