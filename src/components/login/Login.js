import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // 🚀 Navigare

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);

            const response = await axios.post('http://localhost:8000/api/login/token', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            const { access_token } = response.data;
            localStorage.setItem('token', access_token); // 🔐 Salvezi tokenul

            navigate('/patients'); // ✅ Navighează după login
        } catch (err) {
            console.error(err);
            setError('Incorrect username or password');
        }
    };

    return (

        <div className="login-wrapper">

            <form  className="login-form" onSubmit={handleLogin}>
                <strong className="login-title">Login</strong>
                <input className="login_input-bar" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="login_input-bar" placeholder="Parola" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="login-submit-button">Login</button>
                {error && <p className="login_error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
