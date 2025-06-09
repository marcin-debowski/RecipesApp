import { useState, useEffect } from "react";
import "./Page1.css";
import RecipeCard from "../components/RecipeCard";
import ExpandedRecipeCard from "../components/ExpandedRecipeCard";

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

function getRandomOtherRecipes(
  recipes: Recipe[],
  excludeId: number,
  count = 4
): (Recipe & { _idx: number })[] {
  const filtered = recipes
    .map((r, i) => ({ ...r, _idx: i }))
    .filter((r) => r.recipeId !== excludeId);
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  return filtered.slice(0, count);
}

const Page1 = () => {
  const [openedRecipeId, setOpenedRecipeId] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/recipes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.data.content);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-black pt-24">Loading recipes...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 pt-24">Error: {error}</div>;
  }

  const openedRecipe = recipes.find((r) => r.recipeId === openedRecipeId);

  if (openedRecipeId !== null && openedRecipe) {
    const randomRecipes = getRandomOtherRecipes(recipes, openedRecipeId, 8);
    return (
      <ExpandedRecipeCard
        recipe={openedRecipe}
        onClose={() => setOpenedRecipeId(null)}
        randomRecipes={randomRecipes}
        onRandomRecipeClick={setOpenedRecipeId}
      />
    );
  }

  return (
    <main className="recipe-main pt-24 pb-12">
      <div className="recipe-grid">
        {recipes.length === 0 && (
          <div className="text-center text-gray-500 w-full">
            No recipes found.
          </div>
        )}
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipeId}
            title={recipe.title}
            user={recipe.author.username}
            img={recipe.imageUrl}
            onClick={() => setOpenedRecipeId(recipe.recipeId)}
          />
        ))}
      </div>
    </main>
  );
};

export default Page1;
