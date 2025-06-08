import { useState } from "react";
import { Link } from "react-router-dom";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

export default function Something() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative z-300"
      style={{
        backgroundImage:
          "url('/src/assets/back.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="absolute inset-0" />
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-6xl mx-auto min-h-[80vh]">
        {/* Left side */}
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold drop-shadow-lg leading-tight max-w-lg text-center lg:text-left">
            <span className="px-2 py-1">
              Log in <br /> to discover <br /> recipes!
            </span>
          </h1>
        </div>
        {/* Right side - Login box */}
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
              alt="Chef hat"
              className="w-14 h-14 mb-2"
            />
            <h2 className="text-2xl font-bold mb-6 text-center">
              Welcome in our App!
            </h2>
            <form className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                E-mail address
                <input
                  type="email"
                  placeholder="E-mail"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </label>
              <label className="block mb-4 text-sm font-medium text-gray-700 relative">
                Password
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <span role="img" aria-label="Hide">
                      <MdVisibilityOff />
                    </span>
                  ) : (
                    <span role="img" aria-label="Show">
                      <MdVisibility />
                    </span>
                  )}
                </button>
              </label>
              <Link to="/recipes">
                <button
                  type="submit"
                  className="w-full bg-rose-300 hover:bg-rose-400 transition-colors text-gray-700 py-2 rounded-md font-semibold mb-3 mt-2 cursor-pointer"
                >
                  Log In
                </button>
              </Link>
            </form>
            <p className="mt-2 text-sm text-gray-700 text-center">
              You don't have an account yet?{" "}
              <button
                type="button"
                className="text-blue-600 underline hover:cursor-pointer"
                onClick={() => setShowRegister(true)}
              >
                Register here!
              </button>
            </p>
            <p className="mt-4 text-xs text-gray-400 text-center">
              By continuing, you agree to the Application for Business Terms of Use and acknowledge that you have read our Privacy Policy. Notice of personal data collection.
            </p>
          </div>
        </div>
      </div>

      {/* Register Popup */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md flex flex-col items-center relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700 hover:cursor-pointer"
              onClick={() => setShowRegister(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
              alt="Chef hat"
              className="w-14 h-14 mb-2 mt-2"
            />
            <h2 className="text-2xl font-bold mb-6 text-center">
              Register in our App!
            </h2>
            <form className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                E-mail address
                <input
                  type="email"
                  placeholder="E-mail"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </label>
              <label className="block mb-4 text-sm font-medium text-gray-700 relative">
                Password
                <input
                  type={showRegisterPassword ? "text" : "password"}
                  placeholder="Password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500"
                  tabIndex={-1}
                  onClick={() => setShowRegisterPassword((v) => !v)}
                >
                  {showRegisterPassword ? (
                    <span role="img" aria-label="Hide">
                      <MdVisibilityOff />
                    </span>
                  ) : (
                    <span role="img" aria-label="Show">
                      <MdVisibility />
                    </span>
                  )}
                </button>
              </label>
              <label className="block mb-4 text-sm font-medium text-gray-700 relative">
                Confirm Password
                <input
                  type={showRegisterConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500"
                  tabIndex={-1}
                  onClick={() => setShowRegisterConfirm((v) => !v)}
                >
                  {showRegisterConfirm ? (
                    <span role="img" aria-label="Hide">
                      <MdVisibilityOff />
                    </span>
                  ) : (
                    <span role="img" aria-label="Show">
                      <MdVisibility />
                    </span>
                  )}
                </button>
              </label>
              <button
                type="submit"
                className="w-full bg-rose-200 text-gray-700 py-2 rounded-md font-semibold mb-3 mt-2 cursor-pointer"
                onClick={() => setShowRegister(false)}
              >
                Register
              </button>
            </form>
            <p className="mt-2 text-sm text-gray-700 text-center">
              You already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 underline hover:cursor-pointer"
                onClick={() => setShowRegister(false)}
              >
                Log in here!
              </button>
            </p>
            <p className="mt-4 text-xs text-gray-400 text-center">
              By continuing, you agree to the Application for Business Terms of Use and acknowledge that you have read our Privacy Policy. Notice of personal data collection.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}