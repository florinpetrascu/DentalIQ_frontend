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
import ProtectedRoute from "./components/login/ProtectedRoute";
import Login from "./components/login/Login";
import ProtectedLayout from "./components/login/ProtectedLayout";

const App = () => {
  return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Grup de rute protejate cu layout care include sidebar */}
            <Route
                element={
                  <ProtectedRoute>
                    <ProtectedLayout />
                  </ProtectedRoute>
                }
            >
              <Route path="/" element={<Patients />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patient/:id" element={<Patient />} />
              {/* Adaugă și alte rute aici */}
            </Route>
          </Routes>
        </div>
      </Router>
  );
};
export default App;
