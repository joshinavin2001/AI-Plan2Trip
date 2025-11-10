import { Button } from "@/components/ui/button";
import logo from "@/assets/IMG/plan2TripLogo.png";
const Header = () => {
  return (
    <div>
      <header className="flex justify-between py-2 px-4 bg-gradient-to-t from-amber-50 via-amber-50 to-transparent shadow-sm">
        <img className="w-25 h-12" src={logo} alt="" />
        <Button className="bg-amber-800 mt-1 hover:bg-amber-700">
          Sign In
        </Button>
      </header>
    </div>
  );
};

export default Header;
