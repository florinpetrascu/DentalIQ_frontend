import React from 'react';
import './Navbar.css';
import useTheme from '../../theme/useTheme.js';

const Navbar = () => {

  const [theme, toggleTheme] = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <strong>DentalIQ</strong> solutions
      </div>

      <div>
        <button className="navbar-button" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '🌞'}
        </button>
        {/* Rest of your app */}
      </div>


    </nav>
  );
}

export default Navbar;