import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Suscribirse from "../Home/Suscribirse/Suscribirse";
//import FloatingCart from "../Home/Carrito/FloatingCart";
import "./NavbarGeneral.css"; 

export default function NavbarGeneral() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActive, setIsActive] = useState(false); // Para el menú hamburguesa

    useEffect(() => {
        const hasSeenModal = sessionStorage.getItem('modalShown');
        if (!hasSeenModal) {
            setIsModalOpen(true);
            sessionStorage.setItem('modalShown', 'true');
        }
    }, []);

    const toggleMenu = () => setIsActive(!isActive);

    return (
        <>
            {isModalOpen && <Suscribirse onClose={() => setIsModalOpen(true)} />}

            <nav className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
                <div className="container">
                    
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <span className="logo-text">Carnicería</span>
                        </a>
                        
                        {/* <FloatingCart /> */}

                        <button 
                            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
                            aria-label="menu"
                            aria-expanded="false"
                            onClick={toggleMenu}
                        >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>

                    <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                        <div className="navbar-start">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <button className="navbar-link" onClick={() => navigate('/productos')}>
                                    Productos
                                </button>
                                <div className="navbar-dropdown">
                                    <button 
                                        className="navbar-item" 
                                        onClick={() => navigate('/productos/res')}
                                    >
                                        Res
                                    </button>
                                    <button 
                                        className="navbar-item"
                                        onClick={() => navigate('/productos/cerdo')}
                                    >
                                        Cerdo
                                    </button>
                                    <button 
                                        className="navbar-item"
                                        onClick={() => navigate('/productos/pollo')}
                                    >
                                        Pollo
                                    </button>
                                    <button 
                                        className="navbar-item"
                                        onClick={() => navigate('/productos/pescado')}
                                    >
                                        Pescado
                                    </button>
                                </div>
                            </div>
                            
                            <button className="navbar-item" onClick={() => navigate('/AboutUs')}>
                                Sobre Nosotros
                            </button>
                            <button className="navbar-item" onClick={() => navigate('/recetas')}>
                                Recetas
                            </button>
                            <button className="navbar-item" onClick={() => navigate('/PuntosVenta')}>
                                Puntos de Venta
                            </button>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <button 
                                        className="button is-primary is-outlined"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <span className="icon">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        <span>Regístrate</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}