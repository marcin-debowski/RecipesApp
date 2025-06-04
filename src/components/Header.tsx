import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  // Simulated auth state (replace with real auth logic in production)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <header className="bg-amber-500 text-white py-4 shadow-md fixed top-0 left-0 w-full z-100">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Tasty Recipes
        </Link>
        <nav className="flex space-x-6 list-none items-center">
          <li>
            <Link to="/" className="hover:text-amber-200 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <a
              href="/recipes"
              className="hover:text-amber-200 transition duration-300"
            >
              Recipes
            </a>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-amber-200 transition duration-300"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-amber-200 transition duration-300"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-amber-200 transition duration-300 bg-transparent border-none cursor-pointer"
              >
                Log Out
              </button>
            </li>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;