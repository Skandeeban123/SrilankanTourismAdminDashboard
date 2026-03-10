import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Ensure the URL matches your ASP.NET backend port
            const res = await axios.post('https://localhost:7085/api/auth/login', data);
            
            // Save authentication details to browser storage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('role', res.data.role);

            // Redirect to home/dashboard
            window.location.href = '/'; 
        } catch (err) {
            setError(err.response?.data || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 animate__animated animate__fadeIn">
            <div className="card shadow-lg p-4 border-0" style={{ width: '400px', borderRadius: '20px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Welcome Back</h2>
                    <p className="text-muted small">Login to access business solutions</p>
                </div>

                {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary">Username</label>
                        <input 
                            type="text" 
                            className="form-control rounded-pill px-3 p-2" 
                            placeholder="Enter username"
                            required
                            onChange={e => setData({...data, username: e.target.value})} 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-bold text-secondary">Password</label>
                        <input 
                            type="password" 
                            className="form-control rounded-pill px-3 p-2" 
                            placeholder="••••••••"
                            required
                            onChange={e => setData({...data, password: e.target.value})} 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm"
                        disabled={loading}
                    >
                        {loading ? <span className="spinner-border spinner-border-sm"></span> : "Sign In"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="small text-muted">
                        Don't have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;