import React from 'react';
import type { Recipe } from './recipesData';

interface ExpandedRecipeCardProps {
  recipe: Recipe;
  onClose: () => void;
  randomRecipes: (Recipe & { _idx: number })[];
  onRandomRecipeClick: (idx: number) => void;
}

const ExpandedRecipeCard: React.FC<ExpandedRecipeCardProps> = ({ recipe, onClose, randomRecipes, onRandomRecipeClick }) => (
  <main className="recipe-main">
    <div className="expanded-card-container">
      <div className="expanded-card">
        <div className="expanded-card-img-wrap">
          <img src={recipe.img} alt={recipe.title} className="expanded-card-img" />
        </div>
        <div className="expanded-card-content">
          <div className="expanded-card-header-row">
            <span className="expanded-card-author">@author-username</span>
            <div className="expanded-card-actions">
              <span className="profile-dropdown">Profile ▼</span>
              <button className="close-btn" onClick={onClose}>Zamknij</button>
            </div>
          </div>
          <h2 className="expanded-card-title">{recipe.title}</h2>
          <div className="expanded-card-desc">{recipe.description}</div>
          <div className="expanded-card-comments">
            <span className="comments-count">1 Comment ▶</span>
            <div className="add-comment-row">
              <input className="add-comment-input" placeholder="Add a Comment" />
              <button className="emoji-btn">😊</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="random-row">
      {randomRecipes.map((r) => (
        <div key={r._idx} className="random-recipe-card">
          <div
            className="recipe-card"
            onClick={() => onRandomRecipeClick(r._idx)}
            style={{ cursor: 'pointer' }}
          >
            <img src={r.img} alt={r.title} className="recipe-img" />
            <div className="recipe-title">{r.title}</div>
            <div className="recipe-user">
              <img className="user-avatar" src="https://randomuser.me/api/portraits/lego/1.jpg" alt="avatar" />
              <span>{r.user}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </main>
);

export default ExpandedRecipeCard; 