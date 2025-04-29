import React from "react";
import Modal from "./Modal";
import "./Promociones.css"; // Importamos el CSS

export default function Promociones() {
    return (
        <section className="section">
            <div className="container">
                <h2 className="title has-text-centered mb-6 is-size-1 has-text-weight-bold">Promociones Especiales</h2>
                
                
                <div className="columns is-centered promo-scroll-container">
                    <div className="column is-5">
                        <Modal />
                        <Modal />
                        <Modal />
                    </div>
                    
                    <div className="column is-5">
                        <Modal />
                        <Modal />
                        <Modal />
                    </div>
                </div>
            </div>
        </section>
    );
}