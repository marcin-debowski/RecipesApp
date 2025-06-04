import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300">
      {/* Decorative SVG shapes */}
      <svg
        className="absolute top-[-80px] left-[-80px] w-96 h-96 opacity-20 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="200" fill="#fbbf24" />
      </svg>
      <svg
        className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] opacity-10 pointer-events-none"
        viewBox="0 0 500 500"
        fill="none"
      >
        <rect x="0" y="0" width="500" height="500" rx="250" fill="#f59e42" />
      </svg>
      <svg
        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-80 h-80 opacity-10 pointer-events-none"
        viewBox="0 0 320 320"
        fill="none"
      >
        <ellipse cx="160" cy="160" rx="160" ry="80" fill="#fde68a" />
      </svg>
      {/* Decorative food image */}
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
        alt="Decorative food"
        className="absolute top-24 right-16 w-56 h-56 object-cover rounded-full shadow-xl opacity-30 pointer-events-none"
      />
      <img
        src="/src/assets/sc-3.jpg"
        alt="Decorative food"
        className="absolute bottom-24 left-16 w-40 h-40 object-cover rounded-3xl shadow-xl opacity-20 pointer-events-none"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-16">
        <h1 className="text-5xl font-extrabold text-amber-700 drop-shadow-lg mb-4">
          Welcome to Tasty Recipes!
        </h1>
        <p className="text-lg text-amber-900 mb-8 max-w-xl">
          Discover, share, and enjoy delicious recipes from around the world. Explore our curated collection or add your own culinary creations!
        </p>
        <div className="flex gap-6">
          <Link
            to="/login"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full shadow transition"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-white hover:bg-amber-100 text-amber-700 font-semibold py-3 px-8 rounded-full shadow transition border border-amber-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;