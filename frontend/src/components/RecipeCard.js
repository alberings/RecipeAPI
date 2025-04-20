import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const defaultImage = 'https://via.placeholder.com/300x200?text=No+Image';
  
  // Transform the image path to use the API
  const imageUrl = recipe.image_name 
    ? `/api/images/${recipe.image_name.split('\\').pop()}`
    : defaultImage;

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card recipe-card h-100 shadow-sm">
        <div className="position-relative">
          <img 
            src={imageUrl} 
            className="card-img-top" 
            alt={recipe.name}
            onError={(e) => {e.target.src = defaultImage}}
          />
          {recipe.difficulty && (
            <span className={`position-absolute badge rounded-pill 
              ${recipe.difficulty === 'easy' ? 'bg-success' : 
                recipe.difficulty === 'medium' ? 'bg-warning' : 'bg-danger'}`}
              style={{ top: '15px', right: '15px' }}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </span>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between mb-2">
            <div>
              {recipe.cuisine && <span className="category-tag me-1">{recipe.cuisine}</span>}
              {recipe.course && <span className="category-tag">{recipe.course}</span>}
            </div>
            {recipe.total_time && <small><i className="far fa-clock me-1"></i>{recipe.total_time}</small>}
          </div>
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text small mb-3">
            {recipe.description && recipe.description.length > 120
              ? `${recipe.description.substring(0, 120)}...`
              : recipe.description}
          </p>
          
          <div className="mt-auto">
            {recipe.dietary_tags && recipe.dietary_tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                <i className="fas fa-tag me-1 small"></i>{tag}
              </span>
            ))}
            <div className="d-grid mt-3">
              <Link to={`/recipe/${recipe.id}`} className="btn btn-primary stretched-link">
                <i className="fas fa-eye me-1"></i>View Recipe
              </Link>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          {recipe.nutritional_info && recipe.nutritional_info.calories && (
            <span className="text-muted small"><i className="fas fa-fire me-1"></i>{recipe.nutritional_info.calories} cal</span>
          )}
          {recipe.author && (
            <span className="text-muted small text-end"><i className="fas fa-user me-1"></i>{recipe.author}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard; 