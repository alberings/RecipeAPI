import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </main>
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="mb-3">Recipe Book</h5>
              <p className="mb-3">Discover and explore a collection of delicious recipes from around the world.</p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white fs-5"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-white fs-5"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white fs-5"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white fs-5"><i className="fab fa-pinterest"></i></a>
              </div>
            </div>
            <div className="col-md-3 mt-4 mt-md-0">
              <h6 className="mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/" className="text-decoration-none text-white-50 hover-white">Home</a></li>
                <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">About</a></li>
                <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Contact</a></li>
                <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-3 mt-4 mt-md-0">
              <h6 className="mb-3">Subscribe</h6>
              <p className="small text-white-50 mb-3">Subscribe to our newsletter for new recipes</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email address" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
          <hr className="my-4 bg-secondary" />
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 small">© {new Date().getFullYear()} Recipe Book - All rights reserved</p>
            <div>
              <a href="#" className="text-white-50 text-decoration-none small me-3">Terms</a>
              <a href="#" className="text-white-50 text-decoration-none small">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 