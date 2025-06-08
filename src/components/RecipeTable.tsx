import React from 'react';
import RecipeCard from './RecipeCard';

export interface Recipe {
  title: string;
  user: string;
  img: string;
}

interface RecipeTableProps {
  recipes: Recipe[];
  onRecipeClick: (idx: number) => void;
}

const RecipeTable: React.FC<RecipeTableProps> = ({ recipes, onRecipeClick }) => (
  <div className="recipe-grid">
    {recipes.map((recipe, idx) => (
      <RecipeCard
        key={idx}
        title={recipe.title}
        user={recipe.user}
        img={recipe.img}
        onClick={() => onRecipeClick(idx)}
      />
    ))}
  </div>
);

export default RecipeTable; 