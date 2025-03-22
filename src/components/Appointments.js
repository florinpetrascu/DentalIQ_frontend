
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('/api/appointments')
            .then(response => setAppointments(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Appointments</h1>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>{appointment.time}</li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;
