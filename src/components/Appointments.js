
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('/api/appointments')
            .then(response => {
                console.log("API Response:", response.data); // Debugging
                if (Array.isArray(response.data)) {
                    setAppointments(response.data);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setAppointments([]); // Evită erorile
                }
            })
            .catch(error => {
                console.error("Error fetching appointments:", error);
                setAppointments([]); // În caz de eroare, setează un array gol
            });
    }, []);

    return (
        <div>
            <h1>Appointments</h1>
            <ul>
                {Array.isArray(appointments) && appointments.length > 0 ? (
                    appointments.map(appointment => (
                        <li key={appointment.id}>{appointment.time}</li>
                    ))
                ) : (
                    <p>No appointments available</p>
                )}
            </ul>
        </div>
    );
};

export default Appointments;
