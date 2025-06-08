import { useRef } from "react";

export default function CreateRecipe() {
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col px-4 py-6 max-sm:pt-20 sm:pt-20 lg:pt-30">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto">
        {/* Left: Upload */}
        <div className="flex-1 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Create your recipe</h2>
          <div
            className="w-72 h-80 bg-gray-100 rounded-2xl flex flex-col items-center justify-center border border-gray-200 mb-6"
            onClick={() => fileInput.current?.click()}
            style={{ cursor: "pointer" }}
          >
            <div className="flex flex-col items-center">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 16V4M12 4l-4 4M12 4l4 4"
                  stroke="#222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="4"
                  y="16"
                  width="16"
                  height="4"
                  rx="2"
                  fill="#222"
                  opacity="0.08"
                />
              </svg>
              <p className="mt-4 text-center font-medium text-black">
                Choose a file or drag and drop<br />it here.
              </p>
              <p className="mt-4 text-xs text-gray-500 text-center max-w-[220px]">
                Recommendation: Use high quality jpg files of less than 20 MB or .mp4 files of less than 200 MB.
              </p>
            </div>
            <input
              ref={fileInput}
              type="file"
              className="hidden"
              accept="image/*,video/mp4"
            />
          </div>
          <hr className="w-full border-gray-200 mb-4" />
          <button
            className="w-full bg-gray-100 text-black rounded-full py-2 font-medium mt-2 transition hover:bg-gray-200"
            type="button"
          >
            Save from URL
          </button>
        </div>
        {/* Right: Form */}
        <form className="flex-1 flex flex-col gap-3">
          <label className="font-medium text-sm mt-1">Title
            <input
              type="text"
              placeholder="Add title"
              className="w-full border border-gray-300 rounded-full px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm"
            />
          </label>
          <label className="font-medium text-sm mt-1">Preparation time
            <input
              type="text"
              placeholder="Write it in minutes (e.g. 90 min)"
              className="w-full border border-gray-300 rounded-full px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm"
            />
          </label>
          <label className="font-medium text-sm mt-1">Portion
            <input
              type="text"
              placeholder="For how many people? (e.g. 3-4)"
              className="w-full border border-gray-300 rounded-full px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm"
            />
          </label>
          <label className="font-medium text-sm mt-1">Ingredients
            <input
              type="text"
              placeholder="Write it separated by comma (e.g. 1 egg, 1 tsp of oil, ... )"
              className="w-full border border-gray-300 rounded-full px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm"
            />
          </label>
          <label className="font-medium text-sm mt-1">Description
            <textarea
              placeholder="Add specific description with preparation steps"
              className="w-full border border-gray-300 rounded-2xl px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm min-h-[100px] resize-none"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-red-600 text-white rounded-full py-2 font-semibold mt-4 transition hover:bg-red-700"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}