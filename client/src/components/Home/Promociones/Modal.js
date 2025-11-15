import React, { useState } from "react";
import "./Modal.css";

export default function Modal({ imagen, titulo, descripcion, validoHasta, valor }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <>
      <div className="card has-text-centered promo-card" onClick={abrirModal}>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={imagen} alt={titulo} />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-4">{titulo}</p>
          <p className="subtitle is-6">{descripcion}</p>
          <p className="has-text-weight-semibold has-text-success mt-2">{valor}</p>
          <p className="is-size-7 mt-1">{validoHasta}</p>
        </div>
      </div>

      <div className={`modal ${mostrarModal ? "is-active" : ""}`}>
        <div className="modal-background" onClick={cerrarModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title has-text-weight-bold">{titulo}</p>
            <button 
              className="delete" 
              aria-label="close" 
              onClick={cerrarModal}
            >
              
            </button>
          </header>

          <section className="modal-card-body">
            <figure className="image is-4by3 mb-4">
              <img src={imagen} alt={titulo} />
            </figure>
            <p className="content is-medium">{descripcion}</p>
            <p className="has-text-weight-bold has-text-success is-size-5 mt-4">{valor}</p>
            <p className="mt-2">{validoHasta}</p>
          </section>

          <footer className="modal-card-foot is-justify-content-space-between">
            <button
              className="button is-link is-light is-fullwidth"
              onClick={cerrarModal}
            >
              Agregar al Carrito
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
