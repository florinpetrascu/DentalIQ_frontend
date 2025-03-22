import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientTable from '../table/PatientTable.js';
import "./Patients.css";
import AddPatientForm from './AddPatientForm.js';


const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  // const fetchPatients = async () => {
  //   try {
  //     const response = await axios.get('/api/patients');
  //     setPatients(response.data);
  //   } catch (error) {
  //     console.error('Error fetching patients:', error);
  //   }
  // };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://100.97.33.33:3000/api/patients');
      console.log("API Response:", response.data); // Debugging

      if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else {
        console.error("Unexpected API response:", response.data);
        setPatients([]); // Evită erorile
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      setPatients([]); // Evită erorile
    }
  };

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredPatients = patients.filter(patient =>
  //   patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   patient.phoneNumber.includes(searchTerm)
  // );

  const filteredPatients = Array.isArray(patients) ? patients.filter(patient =>
      patient.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phoneNumber?.includes(searchTerm)
  ) : [];

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
