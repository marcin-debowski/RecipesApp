import { useState } from 'react';
import './Page1.css';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../components/recipesData';
import type { Recipe } from '../components/recipesData';
import ExpandedRecipeCard from '../components/ExpandedRecipeCard';

function getRandomOtherRecipes(recipes: Recipe[], excludeIdx: number, count = 4): (Recipe & { _idx: number })[] {
  const filtered = recipes.map((r, i) => ({ ...r, _idx: i })).filter((_, i) => i !== excludeIdx);
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  return filtered.slice(0, count);
}

const Page1 = () => {
  const [openedIdx, setOpenedIdx] = useState<number | null>(null);

  if (openedIdx !== null) {
    const randomRecipes = getRandomOtherRecipes(recipes, openedIdx, 8);
    return (
      <ExpandedRecipeCard
        recipe={recipes[openedIdx]}
        onClose={() => setOpenedIdx(null)}
        randomRecipes={randomRecipes}
        onRandomRecipeClick={setOpenedIdx}
      />
    );
  }

  return (
    <main className="recipe-main pt-24 pb-12">
      <div className="recipe-grid">
        {recipes.map((recipe, idx) => (
          <RecipeCard key={idx} title={recipe.title} user={recipe.user} img={recipe.img} onClick={() => setOpenedIdx(idx)} />
        ))}
      </div>
    </main>
  );
};

export default Page1; 