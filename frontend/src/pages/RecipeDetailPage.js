import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="fas fa-exclamation-circle me-2"></i>
        {error || 'Recipe not found'}
        <Link to="/" className="btn btn-primary ms-3">
          <i className="fas fa-home me-1"></i> Back to Home
        </Link>
      </div>
    );
  }

  const defaultImage = 'https://via.placeholder.com/800x400?text=No+Image';
  const imageUrl = recipe.image_url || (recipe.image_name 
    ? `/api/images/${recipe.image_name.split('\\').pop()}` 
    : defaultImage);

  return (
    <div className="fade-in">
      <Link to="/" className="btn btn-outline-primary mb-4">
        <i className="fas fa-arrow-left me-1"></i> Back to Recipes
      </Link>

      <div className="card mb-4 shadow">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-lg-6 position-relative">
              <img
                src={imageUrl}
                className="recipe-detail-img w-100"
                alt={recipe.name}
                onError={(e) => {e.target.src = defaultImage}}
              />
              {recipe.difficulty && (
                <span className={`position-absolute badge rounded-pill fs-6 
                  ${recipe.difficulty === 'easy' ? 'bg-success' : 
                    recipe.difficulty === 'medium' ? 'bg-warning' : 'bg-danger'}`}
                  style={{ top: '20px', right: '20px' }}>
                  {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                </span>
              )}
            </div>
            <div className="col-lg-6 p-4">
              <h1 className="display-6 fw-bold">{recipe.name}</h1>
              
              <div className="d-flex flex-wrap mb-3">
                {recipe.dietary_tags && recipe.dietary_tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <i className="fas fa-tag me-1 small"></i>{tag}
                  </span>
                ))}
              </div>
              
              <p className="lead mb-4">{recipe.description}</p>
              
              <div className="row mb-4 g-3">
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-globe-americas fs-4 me-2 text-primary"></i>
                    <div>
                      <p className="text-muted mb-0 small">Cuisine</p>
                      <p className="fw-bold mb-0">{recipe.cuisine || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-utensils fs-4 me-2 text-primary"></i>
                    <div>
                      <p className="text-muted mb-0 small">Course</p>
                      <p className="fw-bold mb-0">{recipe.course || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-hourglass-half fs-4 me-2 text-primary"></i>
                    <div>
                      <p className="text-muted mb-0 small">Prep Time</p>
                      <p className="fw-bold mb-0">{recipe.prep_time || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center">
                    <i className="far fa-clock fs-4 me-2 text-primary"></i>
                    <div>
                      <p className="text-muted mb-0 small">Total Time</p>
                      <p className="fw-bold mb-0">{recipe.total_time || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-users fs-4 me-2 text-primary"></i>
                    <div>
                      <p className="text-muted mb-0 small">Servings</p>
                      <p className="fw-bold mb-0">{recipe.servings || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-user-edit fs-4 me-2 text-primary"></i>
                    <div>
                      <p className="text-muted mb-0 small">Author</p>
                      <p className="fw-bold mb-0">{recipe.author || 'Unknown'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-map-marker-alt fs-4 me-2 text-primary"></i>
                    <div>
                      <p className="text-muted mb-0 small">Origin</p>
                      <p className="fw-bold mb-0">{recipe.origin || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {recipe.nutritional_info && (
                <div className="card shadow-sm mt-4">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0"><i className="fas fa-chart-pie me-2"></i>Nutritional Information (per serving)</h5>
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-circle d-inline-block mb-2">
                          <i className="fas fa-fire fs-4 text-primary"></i>
                        </div>
                        <p className="text-muted mb-0 small">Calories</p>
                        <p className="fw-bold mb-0">{recipe.nutritional_info.calories}</p>
                      </div>
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-circle d-inline-block mb-2">
                          <i className="fas fa-drumstick-bite fs-4 text-primary"></i>
                        </div>
                        <p className="text-muted mb-0 small">Protein</p>
                        <p className="fw-bold mb-0">{recipe.nutritional_info.protein}</p>
                      </div>
                      <div className="col-4">
                        <div className="p-3 bg-light rounded-circle d-inline-block mb-2">
                          <i className="fas fa-bread-slice fs-4 text-primary"></i>
                        </div>
                        <p className="text-muted mb-0 small">Carbs</p>
                        <p className="fw-bold mb-0">{recipe.nutritional_info.carbohydrates}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <i className="fas fa-list-ul me-2"></i>
              <h4 className="mb-0">Ingredients</h4>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li 
                    key={index} 
                    className="list-group-item ingredient-row"
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{ingredient.name}</strong>
                        {ingredient.notes && (
                          <p className="text-muted small mb-0">{ingredient.notes}</p>
                        )}
                      </div>
                      <div className="text-end fw-bold">
                        {ingredient.quantity}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {recipe.equipment_needed && recipe.equipment_needed.length > 0 && (
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-secondary text-white d-flex align-items-center">
                <i className="fas fa-blender me-2"></i>
                <h4 className="mb-0">Equipment Needed</h4>
              </div>
              <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                  {recipe.equipment_needed.map((item, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <span className="equipment-item">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {recipe.tips && recipe.tips.length > 0 && (
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-info text-white d-flex align-items-center">
                <i className="fas fa-lightbulb me-2"></i>
                <h4 className="mb-0">Tips</h4>
              </div>
              <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="list-group-item">
                      <i className="fas fa-info-circle text-info me-2"></i>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-8">
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white d-flex align-items-center">
              <i className="fas fa-tasks me-2"></i>
              <h4 className="mb-0">Instructions</h4>
            </div>
            <div className="card-body">
              {recipe.instructions && recipe.instructions.map((instruction) => (
                <div key={instruction.step} className="card step-card mb-3">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-primary text-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="fw-bold">{instruction.step}</span>
                      </div>
                      <h5 className="card-title mb-0">Step {instruction.step}</h5>
                    </div>
                    <p className="card-text ms-5">{instruction.description}</p>
                    <div className="d-flex flex-wrap mt-3 ms-5">
                      {instruction.duration && (
                        <span className="recipe-time-tag">
                          <i className="fas fa-hourglass me-2"></i> {instruction.duration}
                        </span>
                      )}
                      {instruction.temperature && instruction.temperature !== 'N/A' && (
                        <span className="recipe-time-tag">
                          <i className="fas fa-temperature-high me-2"></i> {instruction.temperature}
                        </span>
                      )}
                      {instruction.equipment && instruction.equipment.length > 0 && (
                        <span className="recipe-equipment-tag">
                          <i className="fas fa-tools me-2"></i> {instruction.equipment.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {recipe.health_analysis && (
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-warning d-flex align-items-center">
                <i className="fas fa-heartbeat me-2"></i>
                <h4 className="mb-0">Health Analysis</h4>
              </div>
              <div className="card-body">
                {recipe.health_analysis.diet_compatibility && (
                  <div className="mb-4">
                    <h5 className="mb-3">Diet Compatibility</h5>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="card h-100">
                          <div className={`card-body text-center ${recipe.health_analysis.diet_compatibility.keto_friendly ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                            <i className={`fas fa-circle-check fs-1 mb-3 ${recipe.health_analysis.diet_compatibility.keto_friendly ? 'text-success' : 'text-danger'}`}></i>
                            <h6>Keto Friendly</h6>
                            <span className={`badge ${recipe.health_analysis.diet_compatibility.keto_friendly ? 'bg-success' : 'bg-danger'}`}>
                              {recipe.health_analysis.diet_compatibility.keto_friendly ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card h-100">
                          <div className={`card-body text-center ${recipe.health_analysis.diet_compatibility.vegan_friendly ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                            <i className={`fas fa-leaf fs-1 mb-3 ${recipe.health_analysis.diet_compatibility.vegan_friendly ? 'text-success' : 'text-danger'}`}></i>
                            <h6>Vegan Friendly</h6>
                            <span className={`badge ${recipe.health_analysis.diet_compatibility.vegan_friendly ? 'bg-success' : 'bg-danger'}`}>
                              {recipe.health_analysis.diet_compatibility.vegan_friendly ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card h-100">
                          <div className={`card-body text-center ${recipe.health_analysis.diet_compatibility.gluten_free ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                            <i className={`fas fa-wheat-awn-circle-exclamation fs-1 mb-3 ${recipe.health_analysis.diet_compatibility.gluten_free ? 'text-success' : 'text-danger'}`}></i>
                            <h6>Gluten Free</h6>
                            <span className={`badge ${recipe.health_analysis.diet_compatibility.gluten_free ? 'bg-success' : 'bg-danger'}`}>
                              {recipe.health_analysis.diet_compatibility.gluten_free ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {recipe.health_analysis.health_modifications && recipe.health_analysis.health_modifications.length > 0 && (
                  <div className="mb-4">
                    <h5 className="border-bottom pb-2 mb-3"><i className="fas fa-edit me-2"></i>Health Modifications</h5>
                    <div className="card bg-light">
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          {recipe.health_analysis.health_modifications.map((mod, index) => (
                            <li key={index} className="list-group-item bg-transparent border-0 py-1">
                              <i className="fas fa-angle-right text-primary me-2"></i>{mod}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {recipe.additional_health_insights && (
                  <div>
                    <h5 className="border-bottom pb-2 mb-3"><i className="fas fa-brain me-2"></i>Health Insights</h5>
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      {recipe.additional_health_insights}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;