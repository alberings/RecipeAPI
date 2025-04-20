const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from the img directory
app.use('/api/images', express.static(path.join(__dirname, 'recipe-data/img')));

// Read recipes data
const recipesFilePath = path.join(__dirname, 'recipe-data/recipes_enhanced.json');
let recipes = [];

try {
  const rawData = fs.readFileSync(recipesFilePath);
  recipes = JSON.parse(rawData);
  console.log(`Loaded ${recipes.length} recipes`);
} catch (error) {
  console.error('Error loading recipes:', error);
}

// Routes
app.get('/api/recipes', (req, res) => {
  // Extract pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Extract filter parameters
  const { cuisine, course, search } = req.query;

  // Apply filters if they exist
  let filteredRecipes = [...recipes];
  
  if (cuisine) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.cuisine && recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
  }
  
  if (course) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.course && recipe.course.toLowerCase() === course.toLowerCase()
    );
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredRecipes = filteredRecipes.filter(recipe => 
      (recipe.name && recipe.name.toLowerCase().includes(searchLower)) ||
      (recipe.description && recipe.description.toLowerCase().includes(searchLower))
    );
  }

  // Prepare pagination response
  const paginatedResults = {
    totalRecipes: filteredRecipes.length,
    totalPages: Math.ceil(filteredRecipes.length / limit),
    currentPage: page,
    recipes: filteredRecipes.slice(startIndex, endIndex)
  };

  res.json(paginatedResults);
});

// Get recipe by ID
app.get('/api/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  
  // Transform image path for frontend
  if (recipe.image_name) {
    recipe.image_url = `/api/images/${path.basename(recipe.image_name)}`;
  }
  
  res.json(recipe);
});

// Get available cuisines
app.get('/api/cuisines', (req, res) => {
  const cuisines = [...new Set(
    recipes
      .filter(recipe => recipe.cuisine)
      .map(recipe => recipe.cuisine)
  )].sort();
  
  res.json(cuisines);
});

// Get available courses
app.get('/api/courses', (req, res) => {
  const courses = [...new Set(
    recipes
      .filter(recipe => recipe.course)
      .map(recipe => recipe.course)
  )].sort();
  
  res.json(courses);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 