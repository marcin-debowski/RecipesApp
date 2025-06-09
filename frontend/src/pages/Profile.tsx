import { useState } from "react";

const createdImages = [
  // przykładowe obrazki
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", alt: "Pancakes" },
  { src: "/src/assets/sc-1.jpg", alt: "Waffles" },
  { src: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc", alt: "Spaghetti" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", alt: "Casserole" },
  { src: "/src/assets/sc-2.jpg", alt: "Tacos" },
  { src: "/src/assets/sc-5.jpg", alt: "Salad" },
  { src: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc", alt: "Sushi" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", alt: "Chicken" },
];

const savedImages = [
  // przykładowe obrazki
  { src: "/src/assets/sc-1.jpg", alt: "Saved 1" },
  { src: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc", alt: "Saved 2" },
];

export default function Profile() {
  const [tab, setTab] = useState<"created" | "saved">("created");

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pb-12">
      {/* Cover */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-xl">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="cover"
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-b-3xl"
          />
        </div>
      </div>
      {/* Avatar */}
      <div className="relative flex flex-col items-center -mt-12 sm:-mt-16">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="avatar"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover shadow-lg"
        />
      </div>
      {/* Username & stats */}
      <div className="mt-2 flex flex-col items-center">
        <h2 className="text-2xl font-bold">Username</h2>
        <div className="text-gray-500 text-sm">@username</div>
        <div className="text-gray-700 text-sm mt-1">
          421 followers · 0 following
        </div>
        <div className="text-gray-500 text-xs mt-1">348.7k monthly views</div>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2 mt-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M17 8V7a5 5 0 00-10 0v1" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            <rect x="5" y="8" width="14" height="12" rx="2" stroke="#222" strokeWidth="2" />
          </svg>
        </button>
        <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-700 transition">
          Follow
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="2" fill="#222" />
            <circle cx="12" cy="12" r="2" fill="#222" />
            <circle cx="19" cy="12" r="2" fill="#222" />
          </svg>
        </button>
      </div>
      {/* Tabs */}
      <div className="flex gap-8 mt-8 mb-6">
        <button
          className={`pb-2 font-semibold border-b-2 transition ${
            tab === "created"
              ? "border-black text-black"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("created")}
        >
          Created
        </button>
        {/* <button
          className={`pb-2 font-semibold border-b-2 transition ${
            tab === "saved"
              ? "border-black text-black"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("saved")}
        >
          Saved
        </button> */}
      </div>
      {/* Masonry grid */}
      <div className="w-full max-w-6xl px-2">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {(tab === "created" ? createdImages : savedImages).map((img, idx) => (
            <div key={idx} className="mb-4 break-inside-avoid">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full rounded-2xl object-cover mb-2"
                style={{ minHeight: 120, maxHeight: 340 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}