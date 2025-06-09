import React, { useState, useEffect } from "react";

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

interface Comment {
  commentId: number;
  content: string;
  author: {
    userId: number;
    username: string;
  };
  createdAt: string;
}

interface ExpandedRecipeCardProps {
  recipe: Recipe;
  onClose: () => void;
  randomRecipes: (Recipe & { _idx: number })[];
  onRandomRecipeClick: (id: number) => void;
}

const ExpandedRecipeCard: React.FC<ExpandedRecipeCardProps> = ({
                                                                 recipe,
                                                                 onClose,
                                                                 randomRecipes,
                                                                 onRandomRecipeClick,
                                                               }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [commentsLoading, setCommentsLoading] = useState<boolean>(true);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [commentSubmitting, setCommentSubmitting] = useState<boolean>(false);
  const [commentSubmitError, setCommentSubmitError] = useState<string | null>(
      null
  );

  const fetchComments = async () => {
    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const response = await fetch(
          `http://localhost:8080/api/recipes/${recipe.recipeId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data.data.content || []);
    } catch (e: any) {
      setCommentsError(e.message);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (recipe.recipeId) {
      fetchComments();
    }
  }, [recipe.recipeId]);

  const handleCommentSubmit = async () => {
    if (!newCommentText.trim()) return;

    setCommentSubmitting(true);
    setCommentSubmitError(null);
    try {
      const response = await fetch(
          `http://localhost:8080/api/recipes/${recipe.recipeId}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              content: newCommentText,
            }),
          }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewCommentText("");
      fetchComments(); // Refresh comments after submission
    } catch (e: any) {
      setCommentSubmitError(e.message);
    } finally {
      setCommentSubmitting(false);
    }
  };

  return (
      <main className="recipe-main pt-20">
        <div className="expanded-card-container">
          <div className="expanded-card">
            <div className="expanded-card-img-wrap">
              <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="expanded-card-img"
              />
            </div>
            <div className="expanded-card-content">
              <div className="expanded-card-header-row">
              <span className="expanded-card-author">
                @{recipe.author.username}
              </span>
                <div className="expanded-card-actions">
                  <button
                      className="close-btn hover:cursor-pointer font-semibold px-4 py-2 rounded-3xl bg-black text-white"
                      onClick={onClose}
                  >
                    Zamknij
                  </button>
                </div>
              </div>
              <h2 className="expanded-card-title">{recipe.title}</h2>
              <div className="expanded-card-desc">{recipe.description}</div>

              <h4 className="text-lg font-semibold mb-1 text-amber-700 mt-4">
                Ingredients:
              </h4>
              <ul className="text-gray-700 mb-4 list-disc list-inside">
                {recipe.ingredients
                    .split("\n")
                    .map(
                        (item, index) =>
                            item.trim() && <li key={index}>{item.trim()}</li>
                    )}
              </ul>

              <h4 className="text-lg font-semibold mb-1 text-amber-700">
                Steps:
              </h4>
              <ul className="text-gray-700 mb-4 list-decimal list-inside">
                {recipe.steps
                    .split(".")
                    .map(
                        (item, index) =>
                            item.trim() && <li key={index}>{item.trim()}</li>
                    )}
              </ul>

              <div className="expanded-card-comments">
              <span className="comments-count">
                {comments.length} Comment{comments.length !== 1 ? "s" : ""} ▶
              </span>
                <div className="add-comment-row">
                  <input
                      className="add-comment-input"
                      placeholder="Add a Comment"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      disabled={commentSubmitting}
                  />
                  <button
                      className="send-btn"
                      onClick={handleCommentSubmit}
                      disabled={commentSubmitting}
                  >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
                {commentSubmitError && (
                    <div className="text-red-500 text-sm mt-2">
                      Error submitting comment: {commentSubmitError}
                    </div>
                )}
                <div className="comments-list mt-4">
                  {commentsLoading && (
                      <div className="text-gray-500">Loading comments...</div>
                  )}
                  {commentsError && (
                      <div className="text-red-500">
                        Error loading comments: {commentsError}
                      </div>
                  )}
                  {!commentsLoading &&
                      !commentsError &&
                      comments.length === 0 && (
                          <div className="text-gray-500">No comments yet.</div>
                      )}
                  {comments.map((comment) => (
                      <div
                          key={comment.commentId}
                          className="comment-item mb-2 p-2 bg-gray-100 rounded"
                      >
                        <div className="comment-author font-semibold text-gray-800">
                          @{comment.author?.username || "Unknown"}
                        </div>
                        <div className="comment-content text-gray-700">
                          {comment.content}
                        </div>
                        <div className="comment-date text-xs text-gray-500">
                          {(() => {
                            const date = new Date(comment.createdAt);
                            return isNaN(date.getTime())
                                ? ""
                                : date.toLocaleDateString("pl-PL", {
                                  day: "numeric",
                                  month: "long",
                                });
                          })()}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="random-row">
          {randomRecipes.map((r) => (
              <div key={r.recipeId} className="random-recipe-card">
                <div
                    className="recipe-card"
                    onClick={() => onRandomRecipeClick(r.recipeId)}
                    style={{ cursor: "pointer" }}
                >
                  <img src={r.imageUrl} alt={r.title} className="recipe-img" />
                  <div className="recipe-title">{r.title}</div>
                  <div className="recipe-user">
                    <img
                        className="user-avatar"
                        src="/src/assets/user.png"
                        alt="avatar"
                    />
                    <span>{r.author.username}</span>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </main>
  );
};

export default ExpandedRecipeCard;