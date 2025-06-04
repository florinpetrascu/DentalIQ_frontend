
import React from 'react';
import './Navbar.css';
import useTheme from '../../theme/useTheme.js';
import Sidebar from "../sidebar/Sidebar";

const User = () => {

    const [theme, toggleTheme] = useTheme();

    return (
        <Sidebar/>


    );
}

// mere treaba
export default User;