import React from 'react';

interface RecipeCardProps {
  title: string;
  user: string;
  img: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, user, img }) => (
  <div className="recipe-card">
    <img src={img} alt={title} className="recipe-img" />
    <div className="recipe-title">{title}</div>
    <div className="recipe-user">
      <img className="user-avatar" src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" />
      <span>{user}</span>
    </div>
  </div>
);

export default RecipeCard; 