import { useState } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    title: "Spaghetti Carbonara",
    desc: "Classic Italian pasta with creamy sauce.",
    details: "Ingredients: Spaghetti, eggs, pancetta, parmesan, black pepper. Instructions: Cook pasta, fry pancetta, mix with eggs and cheese, combine and serve.",
  },
  {
    src: "/src/assets/sc-3.jpg",
    title: "Fresh Salad",
    desc: "Healthy greens with vinaigrette.",
    details: "Ingredients: Lettuce, cucumber, tomato, olive oil, vinegar. Instructions: Chop veggies, mix, drizzle with vinaigrette.",
  },
  {
    src: "/src/assets/sc-2.jpg",
    title: "Grilled Steak",
    desc: "Juicy steak with herbs.",
    details: "Ingredients: Steak, salt, pepper, herbs. Instructions: Season steak, grill to desired doneness, rest and serve.",
  },
  {
    src: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    title: "Berry Dessert",
    desc: "Sweet berries with cream.",
    details: "Ingredients: Mixed berries, whipped cream, sugar. Instructions: Layer berries and cream, chill and serve.",
  },
  {
    src: "/src/assets/sc-5.jpg",
    title: "Avocado Toast",
    desc: "Toasted bread with avocado.",
    details: "Ingredients: Bread, avocado, salt, pepper, lemon. Instructions: Toast bread, mash avocado, season, spread and enjoy.",
  },
  {
    src: "/src/assets/sc-1.jpg",
    title: "Pancakes",
    desc: "Fluffy pancakes with syrup.",
    details: "Ingredients: Flour, eggs, milk, baking powder, syrup. Instructions: Mix batter, cook on skillet, serve with syrup.",
  },
  {
    src: "/src/assets/sc-4.jpg",
    title: "Sushi",
    desc: "Assorted sushi platter.",
    details: "Ingredients: Sushi rice, nori, fish, veggies. Instructions: Prepare rice, roll with fillings, slice and serve.",
  },
  {
    src: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80",
    title: "Pizza Margherita",
    desc: "Classic pizza with mozzarella.",
    details: "Ingredients: Pizza dough, tomato sauce, mozzarella, basil. Instructions: Top dough, bake at high temp, garnish with basil.",
  },
];

function Home() {
  const [selected, setSelected] = useState<null | typeof images[0]>(null);

  // Handler for closing popup when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSelected(null);
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-center
        bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300
        relative overflow-hidden`}
      style={{
        backgroundImage: `
          linear-gradient(135deg, #fbbf24 0%, #fde68a 100%),
          url('https://www.transparenttextures.com/patterns/food.png')
        `,
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Decorative SVG shapes */}
      <svg
        className="absolute top-0 left-0 w-64 h-64 opacity-20 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="200" fill="#f59e42" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-80 h-80 opacity-10 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <rect x="0" y="0" width="400" height="400" rx="200" fill="#fbbf24" />
      </svg>

      {/* Blur overlay when popup is open */}
      {selected && (
        <div className="fixed inset-0 z-30" onClick={handleOverlayClick}>
          <div className="absolute inset-0 backdrop-blur-[6px] bg-black/20 transition-all"></div>
        </div>
      )}

      <div className={`w-full max-w-screen-2xl px-4 py-25 relative z-40 transition-all ${selected ? "pointer-events-none blur-sm" : ""}`}>
        <h2 className="text-4xl font-bold mb-4 text-center text-amber-900 drop-shadow">
          Recipes Page
        </h2>
        <p className="text-3xl mb-12 text-center text-amber-800">
          Welcome to the Recipes page!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((img, idx) => (
            <button
              key={idx}
              className="bg-white/90 rounded-lg shadow-md overflow-hidden flex flex-col h-full backdrop-blur cursor-pointer transition hover:scale-105 focus:outline-none"
              onClick={() => setSelected(img)}
              tabIndex={0}
              aria-label={`Show details for ${img.title}`}
              disabled={!!selected}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col flex-1 justify-end">
                <h3 className="font-semibold text-lg text-gray-800">
                  {img.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{img.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 relative animate-fade-in z-50"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-1.5 right-2.5 text-amber-500 hover:text-amber-700 text-2xl font-bold hover:cursor-pointer"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selected.src}
              alt={selected.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-amber-800">{selected.title}</h3>
            <p className="text-gray-700 mb-2">{selected.desc}</p>
            <div className="text-gray-600 text-sm">{selected.details}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;