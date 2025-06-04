import React from 'react';
import './Navbar.css';
import useTheme from '../../theme/useTheme.js';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [theme, toggleTheme] = useTheme();
    const navigate = useNavigate(); // hook pentru navigare

    const handleLogout = () => {
        localStorage.removeItem('token'); // șterge tokenul
        navigate('/login');               // redirecționează
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <strong>DentalIQ</strong> solutions
            </div>

            <div>
                <button className="navbar-button" onClick={handleLogout}>
                    Logout
                </button>
                <button className="navbar-button" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '🌞'}
                </button>
            </div>
        </nav>
    );
};

// mere treaba
export default Navbar;