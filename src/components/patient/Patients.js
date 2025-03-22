import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientTable from '../table/PatientTable.js';
import "./Patients.css";
import AddPatientForm from './AddPatientForm.js';
import {Link, Route, Routes} from "react-router-dom";
import Appointments from "../Appointments";
import Patient from "./Patient";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber.includes(searchTerm)
  );

  return (
    <div className='main-content'>

      <div className="left-content">

        <input className="search-bar"
          type="text"
          placeholder="Filter"
          value={searchTerm}
          onChange={handleSearch}
        />

        <PatientTable patients={filteredPatients} />

      </div>

      <div className="right-content">
        <AddPatientForm onAddPatient={handleAddPatient} />
      </div>





    </div>

  );
};

export default Patients;
