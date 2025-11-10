import { Button } from "@/components/ui/button";
import TextType from "@/components/TextType";
import { Link } from "react-router-dom";
import FooterPage from "./FooterPage";

const Hero = () => {
  return (
    <section className="relative flex flex-col px-5 md:px-0 justify-center items-center text-center min-h-[90vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-transparent -z-10"></div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-10 text-amber-600">
        Plan Less, Travel More — with AI by Your Side
      </h1>

      <h1 className="text-xl sm:text-2xl font-bold mt-2 text-amber-800">
        <TextType
          text={["Your Next Adventure Starts with One Click"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="|"
        />
      </h1>

      <p className="mt-3 text-gray-500 max-w-lg">
        “Say goodbye to stress. Get AI-powered itineraries that match your mood,
        budget, and travel goals in seconds.”
      </p>

      <Link to={"/create-trip"}>
        <Button className="mt-5 bg-amber-800 hover:bg-amber-700">
          <TextType
            text={["✨ Get Started — It’s Free!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
          />
        </Button>
      </Link>

      {/*Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 text-center max-w-3xl">
        {[
          {
            title: "🤖 AI-Powered Planning",
            desc: "Let AI build your perfect trip.",
          },
          { title: "💰 Budget Friendly", desc: "Trips that fit your wallet." },
          {
            title: "🌍 Mood-Based Ideas",
            desc: "Adventure, chill, or romance — your choice.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-amber-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
      <FooterPage />
    </section>
  );
};

export default Hero;
