import React from 'react';
import "../Footer/Footer.css"

export default function Footer() {
    return (
        <footer className="footer py-2">
            <div className="container">
                <div className="columns is-mobile is-gapless">
                    <div className="column is-4">
                        <div className="has-text-centered">
                            <h1 className="title is-5 has-text-white mb-3">Síguenos</h1>
                            <div className="buttons is-centered are-small">
 
                                <a className="button is-white is-outlined is-rounded">
                                    <span className="icon has-text-white">
                                        <i className="fab fa-facebook-f"></i>
                                    </span>
                                </a>
                                <a className="button is-white is-outlined is-rounded">
                                    <span className="icon has-text-white">
                                        <i className="fab fa-instagram"></i>
                                    </span>
                                </a>
                                <a className="button is-white is-outlined is-rounded">
                                    <span className="icon has-text-white">
                                        <i className="fab fa-whatsapp"></i>
                                    </span>
                                </a>
                            </div>
                            <p className="has-text-white-ter is-size-7 mt-2">@CarniceriaCalidad</p>
                        </div>
                    </div>

                    <div className="column is-4">
                        <div className="has-text-centered">
                            <h1 className="title is-5 has-text-white mb-3 ">Visítanos</h1>
                            <div className="content has-text-white-ter">
                                <p className='is-size-7 mb-1'> Av. Principal 123</p>
                                <p className='is-size-7'> Lun-Sáb: 8am - 8pm</p>
                            </div>
                        </div>
                    </div>

                    <div className="column is-4">
                        <div className="has-text-centered">
                            <h1 className="title is-4 has-text-white">Contáctanos</h1>
                            <div className="content has-text-white-ter">
                                <p className="is-size-7 mb-1">+1 234 567 890</p>
                                <p className="is-size-7">contacto@carniceris.com</p>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="has-text-centered mt-4">
                    <p className="has-text-white-ter is-size-7">
                        © {new Date().getFullYear()} Carnicería "Calidad y Buen Precio" - Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
}