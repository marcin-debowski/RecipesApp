import React from 'react';

interface RecipeCardProps {
  title: string;
  user: string;
  img: string;
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, user, img, onClick }) => (
  <div className="recipe-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <img src={img} alt={title} className="recipe-img" />
    <div className="recipe-title">{title}</div>
    <div className="recipe-user">
      <img className="user-avatar" src="/src/assets/user.png" alt="avatar" />
      <span>{user}</span>
    </div>
  </div>
);

export default RecipeCard; 