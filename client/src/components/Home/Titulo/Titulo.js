import React, {useState, useEffect} from "react";
import portada from "../Titulo/Portada.jpeg";
import "../Titulo/Titulo.css";
import { useNavigate } from 'react-router-dom';
import Suscribirse from "../Suscribirse/Suscribirse";


export default function Titulo({onClick}) {
    const navigate = useNavigate(); 
    const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() =>{
        const hasSeenModal = sessionStorage.getItem('modalShown') 
        if (!hasSeenModal) {
            setIsModalOpen(true);
            sessionStorage.setItem('modalShown', 'true');
          }
        
    }, [])

    return (
        <>  
            {isModalOpen && <Suscribirse onClose={() => setIsModalOpen(false)} />}

            <section className="hero is-fullheight-with-navbar">
                
                <div className="hero-background is-overlay">
                    <img 
                        src={portada} 
                        alt="Portada" 
                        className="image is-fullwidth is-fullheight" 
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                    
                    <div className="is-overlay has-background-black has-opacity-40"></div>
                </div>
                
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
                                    <button className="navbar-item">Sobre Nosotros</button>
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
                
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title has-text-white is-size-1 has-text-weight-bold has-text-shadow">
                            Carnicería
                        </h1>
                        <h2 className="subtitle has-text-white is-size-3 has-text-shadow">
                            Calidad y Buen Precio
                        </h2>
                    </div>
                </div>

                <div className="hero-foot">
                    <nav className="tabs is-boxed is-fullwidth">
                        <div className="container">
                            <ul className="is-flex is-justify-content-center">
                                <li><button onClick={() => navigate('/productos/res')}>Res</button></li>
                                <li><button onClick={() => navigate('/productos/cerdo')}>Cerdo</button></li>
                                <li><button onClick={() => navigate('/productos/pollo')}>Pollo</button></li>
                                <li><button onClick={() => navigate('/productos/pescado')}>Pescado</button></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>
        </>
    );
}