import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="columns is-mobile">
                    <div className="column is-4">
                        <div className="has-text-centered">
                            <h1 className="title is-4">Síguenos</h1>
                            <div className="buttons is-centered">
                                <a className="button is-white is-outlined is-rounded">
                                    <span className="icon">
                                        <i className="fab fa-facebook-f"></i>
                                    </span>
                                </a>
                                <a className="button is-white is-outlined is-rounded">
                                    <span className="icon">
                                        <i className="fab fa-instagram"></i>
                                    </span>
                                </a>
                                <a className="button is-white is-outlined is-rounded">
                                    <span className="icon">
                                        <i className="fab fa-whatsapp"></i>
                                    </span>
                                </a>
                            </div>
                            <p className="has-text-white-ter">@CarniceriaCalidad</p>
                        </div>
                    </div>

                    <div className="column is-4">
                        <div className="has-text-centered">
                            <h1 className="title is-4 ">Visítanos</h1>
                            <div className="content has-text-white-ter">
                                <p>
                                    <span className="icon-text">
                                        <span className="icon">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </span>
                                        <span>Av. Principal 123</span>
                                    </span>
                                </p>
                                <p>
                                    <span className="icon-text">
                                        <span className="icon">
                                            <i className="fas fa-clock"></i>
                                        </span>
                                        <span>Lun-Sáb: 8am - 8pm</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="column is-4">
                        <div className="has-text-centered">
                            <h1 className="title is-4 has-text-white">Contáctanos</h1>
                            <div className="content has-text-white-ter">
                                <p>
                                    <span className="icon-text">
                                        <span className="icon">
                                            <i className="fas fa-phone"></i>
                                        </span>
                                        <span>+1 234 567 890</span>
                                    </span>
                                </p>
                                <p>
                                    <span className="icon-text">
                                        <span className="icon">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        <span>contacto@carniceria.com</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="has-text-centered mt-6">
                    <p className="has-text-white-ter">
                        © {new Date().getFullYear()} Carnicería "Calidad y Buen Precio" - Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
}