import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
    };

    return (
        <div className="container">
            <h2>Kijelentkezés</h2>
            <button className="btn btn-danger" onClick={() => setShowModal(true)}>Kijelentkezés</button>
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Megerősítés</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Biztosan ki akarsz jelentkezni?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={handleLogout}>Igen</button>
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Mégse</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};