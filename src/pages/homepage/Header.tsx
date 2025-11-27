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
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 🎯 FIX
import axios from "axios";

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
}

const Header = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const location = useLocation(); // 🎯 React Router ka correct path hook
  const currentPath = location.pathname;

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const logIn = useGoogleLogin({
    onSuccess: (tokenInfo) => getUser(tokenInfo),
    onError: (err) => console.log(err),
  });

  const getUser = (tokenInfo: { access_token: string }) => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setOpenDialog(false);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header className="flex justify-between py-2 px-4 bg-gradient-to-t from-amber-50 via-amber-50 to-transparent shadow-sm">
      <img className="w-25 h-12" src={logo} alt="Logo" />

      {user ? (
        <div className="flex items-center gap-3">
          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center gap-3">
            {/* Create Trip */}
            <a href="/create-trip">
              <Button
                className={`rounded-full bg-amber-700 text-white ${
                  currentPath === "/create-trip" ? "hidden" : "block"
                }`}
              >
                +Create Trip
              </Button>
            </a>

            {/* My Trips */}
            <a href="/my-trips">
              <Button
                className={`rounded-full bg-amber-700 text-white ${
                  currentPath === "/my-trips" ? "hidden" : "block"
                }`}
              >
                My Trips
              </Button>
            </a>
          </div>

          {/* MOBILE MENU */}
          <Popover>
            <PopoverTrigger>
              <MdMenuOpen className="h-9 w-9 text-amber-700 cursor-pointer" />
            </PopoverTrigger>

            <PopoverContent className="w-65 mt-4 bg-gradient-to-b from-amber-50 via-amber-50 to-transparent shadow-amber-200">
              <div className="flex justify-end mb-4 gap-2">
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <h2 className="text-sm">{user.email}</h2>
                </div>

                <img src={user.picture} className="h-10 w-10 rounded-full" />
              </div>

              <div className="flex flex-col gap-3">
                {/* MOBILE BUTTONS */}
                <div className="md:hidden flex flex-col gap-2">
                  <a href="/create-trip">
                    <Button
                      className={`rounded-full bg-amber-700 text-white w-full ${
                        currentPath === "/create-trip" ? "hidden" : "block"
                      }`}
                    >
                      +Create Trip
                    </Button>
                  </a>

                  <a href="/my-trips">
                    <Button
                      className={`rounded-full bg-amber-700 text-white w-full ${
                        currentPath === "/my-trips" ? "hidden" : "block"
                      }`}
                    >
                      My Trips
                    </Button>
                  </a>
                </div>

                <Button
                  onClick={handleLogout}
                  className="rounded-full bg-amber-700 text-white"
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
          className="bg-amber-800 hover:bg-amber-700"
        >
          Sign In
        </Button>
      )}

      {/* LOGIN DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="w-25 h-12" src={logo} alt="Logo" />

              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>

              <Button
                onClick={() => logIn()}
                className="w-full mt-5 bg-amber-800 text-white flex items-center gap-2"
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
