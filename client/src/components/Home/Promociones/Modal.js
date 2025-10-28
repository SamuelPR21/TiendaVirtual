import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";

export default function Modal({ imagen, titulo, descripcion, validoHasta, valor }) {
  const { addToCart } = useCart();
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  const handleAgregar = () => {
    addToCart({ titulo, valor });
    cerrarModal();
  };

  return (
    <>
      {/* Tarjeta del producto */}
      <div
        className="card has-text-centered promo-card"
        onClick={abrirModal}
        style={{ cursor: "pointer" }}
      >
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={imagen} alt={titulo} />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-4 has-text-white">{titulo}</p>
          <p className="subtitle is-6 has-text-white">{descripcion}</p>
          <p className="has-text-weight-semibold has-text-success mt-2">{valor}</p>
          <p className="is-size-7 has-text-white mt-1">{validoHasta}</p>
        </div>
      </div>

   
      <div className={`modal ${mostrarModal ? "is-active" : ""}`}>
        <div className="modal-background" onClick={cerrarModal}></div>
        <div className="modal-card" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <header className="modal-card-head">
            <p className="modal-card-title has-text-weight-bold">{titulo}</p>
            <button className="delete" aria-label="close" onClick={cerrarModal}></button>
          </header>

          <section className="modal-card-body">
            <figure className="image is-4by3 mb-4">
              <img src={imagen} alt={titulo} />
            </figure>
            <p className="content is-medium">{descripcion}</p>
            <p className="has-text-weight-bold has-text-success is-size-5 mt-4">
              {valor}
            </p>
            <p className="has-text-white mt-2">{validoHasta}</p>
          </section>

          <footer className="modal-card-foot is-justify-content-space-between">
            <button className="button is-success is-fullwidth" onClick={handleAgregar}>
               Agregar al carrito
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
