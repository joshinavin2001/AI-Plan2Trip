import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <div>
      <footer className="mt-5 w-full border-t border-amber-200 pt-6 pb-4 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-amber-700 font-medium">Plan2Trip</span> — Built
          with 💛 by AI.
        </p>
        <p className="mt-1">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{" "}
          ·{" "}
          <Link to="/create-trip" className="text-amber-700 hover:underline">
            Plan a Trip
          </Link>{" "}
          ·{" "}
          <a
            href="https://github.com/joshinavin2001/AI-Plan2Trip"
            target="_blank"
            rel="noreferrer"
            className="text-amber-700 hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default FooterPage;
