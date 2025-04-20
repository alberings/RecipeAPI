import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import SearchFilters from '../components/SearchFilters';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    course: ''
  });

  // Fetch recipes based on current page and filters
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Build query parameters
        const params = new URLSearchParams({
          page: currentPage,
          limit: 12
        });
        
        // Add filters if they exist
        if (filters.search) params.append('search', filters.search);
        if (filters.cuisine) params.append('cuisine', filters.cuisine);
        if (filters.course) params.append('course', filters.course);
        
        const response = await axios.get(`/api/recipes?${params.toString()}`);
        
        setRecipes(response.data.recipes);
        setTotalPages(response.data.totalPages);
        setTotalRecipes(response.data.totalRecipes);
        setError(null);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.');
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage, filters]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Render function for category/cuisine badges at the top of recipe cards
  const renderCategoryLink = (category) => (
    <span className="category-tag">{category}</span>
  );

  return (
    <div>
      <div className="hero-section mb-5">
        <div className="hero-content">
          <h1 className="display-4 fw-bold mb-3">Discover Delicious Recipes</h1>
          <p className="fs-5 mb-4">Explore our collection of mouth-watering recipes from around the world.</p>
          <div className="d-flex gap-2">
            <a href="#recipes" className="btn btn-light px-4 py-2">
              <i className="fas fa-search me-2"></i>Browse Recipes
            </a>
            <a href="#filters" className="btn btn-outline-light px-4 py-2">
              <i className="fas fa-filter me-2"></i>Filter Options
            </a>
          </div>
        </div>
      </div>

      <div id="filters">
        <SearchFilters onFilterChange={handleFilterChange} />
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-circle me-2"></i>{error}
        </div>
      ) : (
        <div id="recipes" className="fade-in">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="mb-0">
              <i className="fas fa-list me-2"></i>
              Showing <strong>{recipes.length}</strong> of <strong>{totalRecipes}</strong> recipes
            </p>
            <div className="d-flex align-items-center">
              <i className="fas fa-sort me-2"></i>
              <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>
            </div>
          </div>

          {recipes.length === 0 ? (
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              No recipes found. Try adjusting your filters.
            </div>
          ) : (
            <div className="row g-4">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage; 