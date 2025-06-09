import { useState, useEffect } from "react";

interface Recipe {
  recipeId: number;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  imageUrl: string;
  author: {
    userId: number;
    username: string;
  };
}
import { useState, useEffect } from "react";

interface Recipe {
  recipeId: number;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  imageUrl: string;
  author: {
    userId: number;
    username: string;
  };
}

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [detailedRecipe, setDetailedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [popupLoading, setPopupLoading] = useState<boolean>(false);
  const [popupError, setPopupError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/recipes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.data.content); // Access the 'content' array inside the 'data' object
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (selectedRecipeId) {
      const fetchDetailedRecipe = async () => {
        setPopupLoading(true);
        setPopupError(null);
        try {
          const response = await fetch(
              `http://localhost:8080/api/recipes/${selectedRecipeId}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setDetailedRecipe(data.data);
        } catch (e: any) {
          setPopupError(e.message);
        } finally {
          setPopupLoading(false);
        }
      };
      fetchDetailedRecipe();
    } else {
      setDetailedRecipe(null);
    }
  }, [selectedRecipeId]);

  // Handler for closing popup when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSelectedRecipeId(null);
    if (e.target === e.currentTarget) setSelectedRecipeId(null);
  };

  return (
      <div
          className="w-full min-h-screen flex flex-col items-center justify-center
        bg-white
         "
      >
        {/* Blur overlay when popup is open */}
        {selectedRecipeId && (
            <div className="fixed inset-0 z-30" onClick={handleOverlayClick}>
              <div className="absolute inset-0 backdrop-blur-[6px] bg-black/20 transition-all"></div>
            </div>
        )}

        <div
            className={`w-full max-w-screen-2xl px-4 pt-25 pb-16 relative z-40 transition-all ${
                selectedRecipeId ? "pointer-events-none blur-sm" : ""
            }`}
        >
          <p className="text-2xl text-center text-black">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h2 className="text-4xl font-bold mb-16 text-center text-black">
            Find your recipe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loading && (
                <div className="text-center text-black">Loading recipes...</div>
            )}
            {error && (
                <div className="text-center text-red-500">Error: {error}</div>
            )}
            {!loading && !error && recipes.length === 0 && (
                <div className="text-center text-gray-500">No recipes found.</div>
            )}
            {recipes.map((recipe, idx) => (
                <button
                    key={idx}
                    className="bg-white/90 rounded-2xl shadow-md overflow-hidden flex flex-col h-full backdrop-blur cursor-pointer transition hover:scale-105 focus:outline-none"
                    onClick={() => setSelectedRecipeId(recipe.recipeId)}
                    tabIndex={0}
                    aria-label={`Show details for ${recipe.title}`}
                    disabled={!!selectedRecipeId}
                >
                  <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-64 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1 justify-end">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {recipe.description}
                    </p>
                  </div>
                </button>
            ))}
          </div>
        </div>

        {/* Popup */}
        {selectedRecipeId && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={handleOverlayClick}
            >
              {popupLoading && (
                  <div className="text-center text-black">Loading details...</div>
              )}
              {popupError && (
                  <div className="text-center text-red-500">Error: {popupError}</div>
              )}
              {detailedRecipe && !popupLoading && !popupError && (
                  <div
                      className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 relative animate-fade-in z-50"
                      onClick={(e) => e.stopPropagation()}
                  >
                    <button
                        className="absolute top-1.5 right-2.5 text-amber-500 hover:text-amber-700 text-2xl font-bold hover:cursor-pointer"
                        onClick={() => setSelectedRecipeId(null)}
                        aria-label="Close"
                    >
                      &times;
                    </button>
                    <img
                        src={detailedRecipe.imageUrl}
                        alt={detailedRecipe.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2 text-amber-800">
                      {detailedRecipe.title}
                    </h3>
                    <p className="text-gray-700 mb-2">{detailedRecipe.description}</p>
                    <h4 className="text-lg font-semibold mb-1 text-amber-700">
                      Ingredients:
                    </h4>
                    <div className="text-gray-600 text-sm mb-4">
                      {detailedRecipe.ingredients}
                    </div>
                    <h4 className="text-lg font-semibold mb-1 text-amber-700">
                      Steps:
                    </h4>
                    <div className="text-gray-600 text-sm">
                      {detailedRecipe.steps}
                    </div>
                  </div>
              )}
            </div>
        )}

        {/* End of page message */}
        <div className="flex flex-col items-center justify-center mb-15">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="black" />
              <path
                  d="M8 12.5l3 3 5-5"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-gray-800 font-medium text-center mb-1">
            That's all for today!
          </div>
          <div className="text-lg font-semibold text-center mb-4">
            Come back tomorrow for more daily recipes
            <br />
            inspiration
          </div>
          <button
              className="bg-gray-100 text-black rounded-full px-5 py-2 font-medium hover:bg-gray-200 transition hover:cursor-pointer"
              onClick={() => (window.location.href = "/")}
          >
            Go to home feed
          </button>
        </div>
      </div>
  );
}

export default Home;
