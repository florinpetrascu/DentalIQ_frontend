import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PatientTable.css';

const PatientTable = ({ patients }) => {
    const navigate = useNavigate();

    const handlePatientClick = (patient) => {
        console.log(`Patient with ID ${patient.id} clicked`);
        navigate(`/patient/${patient.id}`, { state: { patient } });
    };

    return (
        <div>
            <table className="patient-table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                </tr>
                </thead>
                <tbody>
                {patients.map(patient => (
                    <tr key={patient.id} onClick={() => handlePatientClick(patient)} className="clickable-row">
                        <td>{patient.firstName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.phoneNumber}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientTable;
