import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ReviewList from './components/ReviewList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import AddReview from './components/AddReview';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };


  return (
    <Router>
      <div className="min-vh-100 bg-light">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
          <div className="container">
            <Link className="navbar-brand fw-bold" href="/">
              <span className="text-primary">SRI LANKA</span> TOURISM AI
            </Link>
            <div className="navbar-nav gap-2">
              <Link className="nav-link" to="/">Dashboard</Link>
              <Link className="nav-link" to="/reviews">Review Hub</Link>
              {/* <Link className="btn btn-primary btn-sm ms-lg-3 rounded-pill px-3 mt-1 mb-2" to="/add-review">Write Review</Link> */}
              {token ? (
              <>
                <Link className="nav-link text-info" to="/add-review">Write Review</Link>
                <span className="text-white mx-2 mt-2">Hi, {username}</span>
                <button className="btn btn-outline-danger btn-sm rounded-pill" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm rounded-pill px-3 py-2" to="/signup">Join</Link>
              </>
            )}
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/add-review" element={<AddReview />} />
            <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;