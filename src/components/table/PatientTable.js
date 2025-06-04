import React, {useEffect, useState} from 'react';
// eslint-disable-next-line
import { Link, useNavigate } from 'react-router-dom';
import './PatientTable.css';

const PatientTable = ({ patients }) => {
    const navigate = useNavigate();
    const [contextMenu, setContextMenu] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientList, setPatientList] = useState(patients);

    useEffect(() => {
        setPatientList(patients);
    }, [patients]);

    const handlePatientClick = (patient) => {
        console.log(`Patient with ID ${patient.id} clicked`);
        navigate(`/patient/${patient.id}`, { state: { patient } });
    };

    const handleDeletePatient = async (patient) => {
        try {
            const response = await fetch(`/api/patients/${patient.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Elimină pacientul din lista locală
                setPatientList(prev => prev.filter(p => p.id !== patient.id));
            } else {
                console.error('Failed to delete patient');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const handleContextMenu = (e, patient) => {
        e.preventDefault();
        setSelectedPatient(patient);
        setContextMenu({
            x: e.pageX,
            y: e.pageY,
        });
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
                {patientList.map(patient => (

                    <tr key={patient.id}
                        onClick={() => handlePatientClick(patient)}
                        onContextMenu={(e) => handleContextMenu(e, patient)}
                        className="clickable-row">
                        <td>{patient.first_name}</td>
                        <td>{patient.last_name}</td>
                        <td>{patient.phone_number}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {contextMenu && (
                <div
                    className="context-menu"
                    style={{

                        top: contextMenu.y,
                        left: contextMenu.x,

                    }}
                >
                    <h3> Do you whant to delete this patient?</h3>
                    <button onClick={() => {
                        handleDeletePatient(selectedPatient).then(r => alert("The patient was deleted succesfully." ));
                        setContextMenu(null);
                    }}>
                        Delete Patient
                    </button>
                </div>
            )}
        </div>
    );
};

export default PatientTable;
