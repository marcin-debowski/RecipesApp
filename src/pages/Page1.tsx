import React from 'react';
import './Page1.css';
import RecipeCard from '../components/RecipeCard';

const recipes = [
  {
    title: 'Mac & cheese',
    user: 'Username',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Kurczak złocisty',
    user: 'Username',
    img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Zupa krem z dyni',
    user: 'Username',
    img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Omlet warzywny',
    user: 'Username',
    img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Owsianka z borówkami',
    user: 'Username',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Smoothie',
    user: 'Username',
    img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Pancakes',
    user: 'Username',
    img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
  },
];

const Page1 = () => {
  return (
    <main className="recipe-main">
      <div className="recipe-grid">
        {recipes.map((recipe, idx) => (
          <RecipeCard key={idx} title={recipe.title} user={recipe.user} img={recipe.img} />
        ))}
      </div>
    </main>
  );
};

export default Page1; 