import React from "react";

export default function Navbar() {

    return(
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
                        
                    </div>
                </div>
            </div>
        </nav>
    )
}