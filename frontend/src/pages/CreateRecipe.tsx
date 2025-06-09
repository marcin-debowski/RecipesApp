import React, { useState, useRef } from "react";
import React, { useState, useRef } from "react";

export default function CreateRecipe() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(""); // Dodany stan na imageUrl
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    // Przygotuj dane do wysłania jako multipart/form-data
    const formData = new FormData();
    type RecipeData = {
      title: string;
      description: string;
      ingredients: string;
      steps: string;
      imageUrl?: string;
    };

    const recipeData: RecipeData = {
      title,
      description,
      ingredients,
      steps,
    };
    // Dodaj imageUrl jeśli podany
    if (imageUrl.trim() !== "") {
      recipeData.imageUrl = imageUrl.trim();
    }
    formData.append("recipe", JSON.stringify(recipeData));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:8080/api/recipes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      setSuccessMessage("Recipe added successfully!");
      // Wyczyść formularz
      setTitle("");
      setIngredients("");
      setSteps("");
      setDescription("");
      setImageFile(null);
      setImageUrl("");
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col px-4 py-6 max-sm:pt-20 sm:pt-20 lg:pt-30">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto">
        {/* Left: Upload */}
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">Create your recipe</h2>
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
                Choose a file or drag and drop
                <br />
                it here.
                Choose a file or drag and drop
                <br />
                it here.
              </p>
              <p className="mt-4 text-xs text-gray-500 text-center max-w-[220px]">
                Recommendation: Use high quality jpg files of less than 20 MB or
                .mp4 files of less than 200 MB.
                Recommendation: Use high quality jpg files of less than 20 MB or
                .mp4 files of less than 200 MB.
              </p>
            </div>
            <input
              ref={fileInput}
              type="file"
              className="hidden"
              accept="image/*,video/mp4"
              onChange={handleFileChange}
              onChange={handleFileChange}
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
        <form className="flex-1 flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="font-medium text-sm mt-1">
            Title
        <form className="flex-1 flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="font-medium text-sm mt-1">
            Title
            <input
              type="text"
              placeholder="Add title"
              className="w-full border border-gray-300 rounded-full px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className="font-medium text-sm mt-1">
            Ingredients
            <input
              type="text"
              placeholder="Write it separated by comma (e.g. 1 egg, 1 tsp of oil, ... )"
              className="w-full border border-gray-300 rounded-full px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </label>
          <label className="font-medium text-sm mt-1">
            Steps
            <textarea
              placeholder="Add preparation steps"
              className="w-full border border-gray-300 rounded-2xl px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm min-h-[100px] resize-none"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              required
            />
          </label>
          <label className="font-medium text-sm mt-1">
            Description
            <textarea
              placeholder="Add description"
              className="w-full border border-gray-300 rounded-2xl px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm min-h-[60px] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="font-medium text-sm mt-1">
            Image URL
            <textarea
              placeholder="Paste image URL (optional)"
              className="w-full border border-gray-300 rounded-2xl px-4 py-2 mt-1 outline-none focus:border-red-400 transition text-sm min-h-[40px] resize-none"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          {errorMessage && (
            <div className="text-red-500 text-center text-sm mt-2">
              Error: {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-green-500 text-center text-sm mt-2">
              Success: {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-500 text-center text-sm mt-2">
              Error: {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-green-500 text-center text-sm mt-2">
              Success: {successMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-red-600 text-white rounded-full py-2 font-semibold mt-4 transition hover:bg-red-700"
            disabled={loading}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
            {loading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
}
