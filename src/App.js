import React from 'react';
import Patients from './components/patient/Patients.js';
import Appointments from './components/Appointments';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar/Navbar.js';
import Sidebar from './components/sidebar/Sidebar.js';
import '../src/theme/Themes.css';
import Patient from "./components/patient/Patient";


const App = () => {


  return (

    <Router>
      <div>
        <Navbar />

        <div className="sidebar-and-content">
          <Sidebar />
          <Routes>
            <Route path="/patient/:id" element={<Patient />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/calendar" element={<Patients />} />
            <Route path="/mesaje" element={<Patients />} />
            <Route path="/formular" element={<Patients />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

// "start": "react-scripts start",
//"proxy": "http://100.97.33.33:3000",


// {
//   "rewrites": [
//   {
//     "source": "/api/(.*)",
//     "destination": "http://100.97.33.33:3000/api/$1"
//   }
// ]
// }
//aici
export default App;
