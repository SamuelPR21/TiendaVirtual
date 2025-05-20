import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Suscribirse from "../Home/Suscribirse/Suscribirse";

export default function NavbarGeneral() {
    const navigate = useNavigate(); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const hasSeenModal = sessionStorage.getItem('modalShown') 
        if (!hasSeenModal) {
            setIsModalOpen(true);
            sessionStorage.setItem('modalShown', 'true');
        }
    }, []);

    return (
        <>
            {isModalOpen && <Suscribirse onClose={() => setIsModalOpen(false)} />}

            <div className="hero-head">
                <nav className="navbar is-transparent">
                    <div className="container">
                        <div className="navbar-brand">
                            <span className="navbar-burger" data-target="navbarMenuHeroB">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div id="navbarMenuHeroB" className="navbar-menu">
                            <div className="navbar-end">
                                <button className="navbar-item" onClick={() => navigate('/')}>Inicio</button>
                                <button className="navbar-item">Puntos de Venta</button>
                                <button className="navbar-item">Recetas</button>
                                <button className="navbar-item" onClick={() => navigate('/AboutUs')}>Sobre Nosotros</button>
                                <span className="navbar-item">
                                    <button className="button is-text"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                    <span className="icon">
                                        <i className="fas fa-user"></i>  
                                    </span>
                                        <span>Registrate</span> 
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}