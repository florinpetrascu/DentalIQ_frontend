import React, {useEffect} from 'react';
// eslint-disable-next-line
import { Link, useNavigate } from 'react-router-dom';
import './PatientTable.css';

const PatientTable = ({ patients }) => {
    const navigate = useNavigate();

    const handlePatientClick = (patient) => {
        console.log(`Patient with ID ${patient.id} clicked`);
        navigate(`/patient/${patient.id}`, { state: { patient } });
    };

    useEffect(() => {
        console.log("patientTable");
        console.log(patients);
    }, []);

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
                        <td>{patient.first_name}</td>
                        <td>{patient.last_name}</td>
                        <td>{patient.phone_number}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientTable;
