import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchFilters = ({ onFilterChange }) => {
  const [cuisines, setCuisines] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    course: ''
  });

  // Fetch cuisines and courses for dropdowns
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [cuisinesRes, coursesRes] = await Promise.all([
          axios.get('/api/cuisines'),
          axios.get('/api/courses')
        ]);
        setCuisines(cuisinesRes.data);
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters = { search: '', cuisine: '', course: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="card mb-4 search-filter-card">
      <div className="card-body">
        <h5 className="card-title mb-3">
          <i className="fas fa-filter me-2"></i>
          Search & Filter
        </h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="search" className="form-label">Search Recipes</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="search"
                name="search"
                placeholder="Search by name or description"
                value={filters.search}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="cuisine" className="form-label">Cuisine</label>
            <select
              className="form-select"
              id="cuisine"
              name="cuisine"
              value={filters.cuisine}
              onChange={handleInputChange}
            >
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine, index) => (
                <option key={index} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="course" className="form-label">Course</label>
            <select
              className="form-select"
              id="course"
              name="course"
              value={filters.course}
              onChange={handleInputChange}
            >
              <option value="">All Courses</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={handleClearFilters}
          >
            <i className="fas fa-times me-1"></i>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters; 