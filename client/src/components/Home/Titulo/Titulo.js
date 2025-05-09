import React from "react";
import portada from "../Titulo/Portada.jpeg";
import "../Titulo/Titulo.css";
import { useNavigate } from 'react-router-dom';


export default function Titulo() {
    const navigate = useNavigate(); 
    return (
        <>
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
                                    <a className="navbar-item" onClick={() => navigate('/')}>Inicio</a>
                                    <a className="navbar-item">Puntos de Venta</a>
                                    <a className="navbar-item">Recetas</a>
                                    <a className="navbar-item">Sobre Nosotros</a>
                                    <span className="navbar-item">
                                        <a className="button is-text">
                                        <span className="icon">
                                            <i className="fas fa-user"></i>  
                                        </span>
                                            <span>Registrate</span> 
                                        </a>
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
                            <ul>
                                <li><a onClick={() => navigate('/productos/res')}>Res</a></li>
                                <li><a onClick={() => navigate('/productos/cerdo')}>Cerdo</a></li>
                                <li><a onClick={() => navigate('/productos/pollo')}>Pollo</a></li>
                                <li><a onClick={() => navigate('/productos/pescado')}>Pescado</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>
        </>
    );
}