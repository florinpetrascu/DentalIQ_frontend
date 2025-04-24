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


  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/patients');
      console.log("API Response:", response.data); // Debugging

      if (Array.isArray(response.data)) {
        setPatients(response.data);
        console.log("Patients aici");
        console.log(patients);
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



  const filteredPatients = Array.isArray(patients) ? patients.filter(patient =>
      patient.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone_number?.includes(searchTerm)
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
