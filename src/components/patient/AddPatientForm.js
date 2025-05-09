
import React, { useState } from 'react';
import axios from 'axios';
import "./Patients.css";

const AddPatientForm = ({ onAddPatient }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null); // 'error' or 'success'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dentaliq-backend-3979cd27bc0b.herokuapp.com/api/patients', {
        firstName,
        lastName,
        phoneNumber,
      });
      console.log("response from add ",response.data);
      onAddPatient(response.data); // Update state with the newly added patient
      setNotification('Patient added successfully!');
      setNotificationType('success');
      // Clear form fields after successful submission
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setNotification('ERROR: There is another patient with the same name');
      } else {
        console.error('Error adding patient:', error);
        setNotification('Error adding patient. Contact the development team');
      }
      setNotificationType('danger');
    } finally {
      // Clear notification after 3 seconds in both success and error cases
      setTimeout(() => {
        setNotification(null);
        setNotificationType(null);
      }, 3000);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="patient-form">

      {notification && (
        <div className={`alert alert-${notificationType}`} role="alert">
          {notification}
        </div>
      )}

      <input
        className="input-bar"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />

      <input
        className="input-bar"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />

      <input
        className="input-bar"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        required
      />

      <button type="submit" className="submit-button">Add New Patient</button>
    </form>
  );
};




export default AddPatientForm;
