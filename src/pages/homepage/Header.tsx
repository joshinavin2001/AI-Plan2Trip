import { Button } from "@/components/ui/button";
import logo from "@/assets/IMG/plan2TripLogo.png";
import { FcGoogle } from "react-icons/fc";
import { MdMenuOpen } from "react-icons/md";
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
  const currentPath = window.location.pathname.trim();

  console.log(user);
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
          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/create-trip">
              <Button
                variant="outline"
                className={`rounded-full cursor-pointer bg-amber-700 hover:bg-amber-600 text-white hover:text-white ${
                  currentPath === "/" || currentPath === "/create-trip"
                    ? "hidden"
                    : "block"
                }`}
              >
                +Create Trip
              </Button>
            </a>

            <a href="/my-trips">
              <Button
                variant="outline"
                className={`rounded-full cursor-pointer bg-amber-700 hover:bg-amber-600 text-white hover:text-white ${
                  currentPath === "/my-trips" ? "hidden" : "block"
                }`}
              >
                My Trips
              </Button>
            </a>
          </div>

          {/* PROFILE + MOBILE MENU */}
          <Popover>
            <PopoverTrigger>
              <MdMenuOpen className="h-9 cursor-pointer text-amber-700 active:scale-95 w-9" />
            </PopoverTrigger>

            <PopoverContent className="w-65 mt-4 bg-gradient-to-b from-amber-50 via-amber-50 to-transparent shadow-amber-200">
              <div className="flex justify-end mb-4 gap-2  ">
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <h2 className="text-sm"> {user.email} </h2>
                </div>

                <img
                  src={user.picture}
                  className="h-10 w-10 rounded-full cursor-pointer"
                  alt="User"
                />
              </div>

              <div className="flex flex-col gap-3">
                {/* MOBILE MENU */}
                <div className="md:hidden flex flex-col gap-2">
                  <a href="/create-trip">
                    <Button
                      variant="outline"
                      className={`rounded-full cursor-pointer w-full bg-amber-700 hover:bg-amber-600 text-white hover:text-white ${
                        currentPath === "/" || currentPath === "/create-trip"
                          ? "hidden"
                          : "block"
                      }`}
                    >
                      +Create Trip
                    </Button>
                  </a>

                  <a href="/my-trips">
                    <Button
                      variant="outline"
                      className={`w-full cursor-pointer bg-amber-700 hover:bg-amber-600 text-white hover:text-white rounded-full ${
                        currentPath === "/my-trips" ? "hidden" : "block"
                      } `}
                    >
                      My Trips
                    </Button>
                  </a>
                </div>

                {/* LOGOUT */}
                <Button
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="rounded-full outline-none cursor-pointer bg-amber-700 hover:bg-amber-600 text-white hover:text-white"
                  variant="outline"
                >
                  LogOut <CiLogout />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button
          onClick={() => setOpenDialog(true)}
          className="bg-amber-800 cursor-pointer mt-1 hover:bg-amber-700"
        >
          Sign In
        </Button>
      )}

      {/* Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="w-25 h-12" src={logo} alt="Plan2Trip Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={() => logIn()}
                className="w-full cursor-pointer mt-5 bg-amber-800 hover:bg-amber-700 flex items-center justify-center gap-2"
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
