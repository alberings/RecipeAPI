# Recipe Book Application

A full-stack web application for browsing and viewing recipes.
This project has in total 1740 recipes. All recipes has images.

# Frontend
## Home page
![Screenshot_20-4-2025_22232_localhost](https://github.com/user-attachments/assets/df2d8031-3fbd-4c99-87ac-2c31656dcdd1)
## Recipe detail page
![Screenshot_20-4-2025_222253_localhost](https://github.com/user-attachments/assets/1aa36b47-49f3-4548-8606-ffedd467139b)

## Project Structure

- `/API` - Node.js backend with Express REST API
- `/frontend` - React frontend application

## Features

- Browse recipes with pagination
- Filter recipes by cuisine, course, and search terms
- View detailed recipe information including:
  - Ingredients and instructions
  - Nutritional information
  - Health analysis
  - Equipment needed
  - Tips
- Responsive design for desktop and mobile

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd API
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd API
   npm run dev
   ```
2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/recipes` - Get paginated recipes with optional filters
- `GET /api/recipes/:id` - Get detailed recipe information by ID
- `GET /api/cuisines` - Get list of available cuisines
- `GET /api/courses` - Get list of available courses
- `GET /api/images/:filename` - Get recipe image

## Technologies Used

### Backend
- Node.js
- Express.js
- CORS for cross-origin requests
- Morgan for request logging

### Frontend
- React
- React Router for navigation
- Axios for API requests
- Bootstrap for styling

## License

This project is licensed under the MIT License.
