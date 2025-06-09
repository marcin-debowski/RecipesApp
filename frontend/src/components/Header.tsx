import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSearch } from "react-icons/fa";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="bg-white py-2 px-2 sm:px-4 shadow flex items-center w-full fixed top-0 z-100">
      {/* Logo */}
      <Link to="/" className="flex items-center mr-2 sm:mr-6">
        <img
          src="/src/assets/logo.png"
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Link>

      {/* Navigation */}
      <nav className="hidden sm:flex items-center space-x-1 sm:space-x-2">
        <Link 
          to="/page1" 
          className="font-semibold px-2 sm:px-3 py-2 rounded-full hover:bg-gray-100 flex items-center text-xs sm:text-base"
        >
          Home <span className="ml-1 text-red-500 text-xs">•</span>
        </Link>
        {/* <Link 
          to="/recipes" 
          className="bg-black text-white px-3 sm:px-4 py-2 rounded-full font-semibold focus:outline-none text-xs sm:text-base"
        >
          Today
        </Link> */}
        <Link 
          to="/create-recipe" 
          className="font-semibold px-2 sm:px-3 py-2 rounded-full hover:bg-gray-100 text-xs sm:text-base">
          Create
        </Link>
      </nav>

      {/* Mobile nav */}
      <nav className="flex sm:hidden items-center space-x-2">
        <Link to="/" className="font-semibold px-2 py-1 rounded hover:bg-gray-100 text-xs">
          Home
        </Link>
        <Link to="/recipes" className="bg-black text-white px-2 py-1 rounded font-semibold text-xs">
          Today
        </Link>
      </nav>

      {/* Search bar */}
      <div className="flex-1 flex items-center mx-2 sm:mx-6 min-w-0">
        <div className="w-full bg-gray-100 rounded-full flex items-center px-2 sm:px-4 py-1 sm:py-2">
          <FaSearch className="text-gray-400 mr-1 sm:mr-2 text-sm sm:text-base" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-2 sm:space-x-4 mr-1 sm:mr-2 relative w-7" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="focus:outline-none"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          <FaUserCircle className="text-gray-300 text-xl w-6 h-6 sm:w-7 sm:h-7 hover:cursor-pointer" />
        </button>
        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-10 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-t-xl"
              onClick={() => setDropdownOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-rose-400 rounded-b-xl"
              onClick={() => {
                setDropdownOpen(false);
                // Add your logout logic here
              }}
            >
              Log out
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;