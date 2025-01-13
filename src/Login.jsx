import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://szallasjwt.sulla.hu/login", { username, password });
            const token = response.data.token;
            localStorage.setItem('jwt', token);
            setError('');
            navigate('/SzallasList');
        } catch (error) {
            setError("A hitelesítés sikertelen. Ellenőrizd a bejelentkezési adatokat!");
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Bejelentkezés</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Felhasználónév" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-success w-100" onClick={handleLogin}>Bejelentkezés</button>
        </div>
    );
};