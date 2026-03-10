import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [data, setData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:7085/api/auth/signup', data);
            alert("Account created! Please login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data || "Signup failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4 border-0 animate__animated animate__fadeIn" style={{ width: '380px', borderRadius: '20px' }}>
                <h3 className="text-center fw-bold mb-4">Create Account</h3>
                <form onSubmit={handleSignup}>
                    <input className="form-control mb-3 rounded-pill p-2 px-3" placeholder="Username" required
                        onChange={e => setData({...data, username: e.target.value})} />
                    <input className="form-control mb-3 rounded-pill p-2 px-3" type="password" placeholder="Password" required
                        onChange={e => setData({...data, password: e.target.value})} />
                    <button className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm">Sign Up</button>
                </form>
                <div className="text-center mt-3">
                    <small>Already have an account? <Link to="/login">Login</Link></small>
                </div>
            </div>
        </div>
    );
};

export default Signup;