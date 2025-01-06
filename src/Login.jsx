import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const navigate = useNavigate();
    const handleLogin = async() => {
        try {
            const response = await  axios.post("https://szallasjwt.sulla.hu/login", {username, password});
            const token = response.data.token;
            localStorage.setItem('jwt, token');
            setError('');
            navigate('/SzallasList');
        }
        catch(error){
            setError("A hitelesítés sikertelen. Ellenőrizd a bejelentkezési adatokat!");
            console.error("Hiba a bejelentkezés során: ", error);
        }
    }

    return(
        <div>
            <h2>Bejelentkezés</h2>
            Felhasználónév:
            {error && <p style={{color: "red"}}>{error}</p>}
            <input type='text' placeholder='Felhasználónév' value={username}
            onChange={(e) => setUsername(e.target.value)}/> <br />
            Jelszó:
            <input type='password' placeholder='Jelszó' value={password}
            onChange={(e) => setPassword(e.target.value)}/> <br />
            <button onClick={handleLogin}>Bejelentkezés</button>
        </div>
    )
}