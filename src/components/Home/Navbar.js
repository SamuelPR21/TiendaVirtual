import React from "react";
import logo from "../Home/imagen1.png";

export default function Navbar() {
    
    return(
        <>
            <nav className="navbar is-fluid" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#" style={{ padding: "0.5rem 0.75rem" }}>
                        <figure className="image is-480x600">  
                            <img className="is-rounded" src={logo} style={{ height: "100%" }} />
                        </figure>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Inicio 
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Productos
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    Res
                                </a>
                                <a className="navbar-item">
                                    Cerdo
                                </a>
                                <a className="navbar-item">
                                    Pollo
                                </a>
                                <hr className="navbar-divider"/>
                                <a className="navbar-item">
                                    Todos los productos
                                </a>
                            </div>
                        </div>

                        <a className="navbar-item">
                            Recetas
                        </a>

                        <a className="navbar-item">
                            Sobre nosotros
                        </a>
                    </div>  
                    
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Registrarse</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}