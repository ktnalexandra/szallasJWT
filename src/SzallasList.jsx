import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const SzallasList = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) throw new Error('Nem található JWT token.');

                const response = await axios.get("https://szallasjwt.sulla.hu/data", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
            } catch (error) {
                setError('Adatok lekérése sikertelen. Lehet, hogy nem vagy bejelentkezve.');
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h2 className="mb-4">Szállások listája</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
                {data.length > 0 ? data.map(item => (
                    <li key={item.id} className="list-group-item">
                        <strong>{item.name}</strong> - {item.hostname} - {item.location} - {item.price} Ft - {item.minimum_nights} éjszaka
                    </li>
                )) : <p>Nincs elérhető adat.</p>}
            </ul>
        </div>
    );
};
