
import './Sidebar.css';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {

    return (
        <div className="sidebar">

            <Link to="/patients">
                <button className="sidebar-button">
                    Patients</button>
            </Link>
            <Link to="/appointments">
                <button className="sidebar-button">

                    Appointments
                </button>
            </Link>
            <button className="sidebar-button">
                Calendar
            </button>
            <button className="sidebar-button">
                Posts
            </button>
            <button className="sidebar-button active" style={{ backgroundColor: `var(--secondary-color)`, color: `var(--text-color)` }}>
                <div className="sidebar-icon sidebar-icon-form" />
                Form
            </button>

        </div >
    );
}

export default Sidebar;
