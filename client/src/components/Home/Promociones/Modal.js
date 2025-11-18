import React, { useState } from "react";
import "./Modal.css";
import { useCart } from "../../../context/CartContext";   


export default function Modal({
  id,
  imagen,
  titulo,
  descripcion,
  descuento,
  precioOriginal,
  precioFinal,
  inicio,
  fin,
}) {
  const [mostrar, setMostrar] = useState(false);
  const { addToCart } = useCart();                     

  return (
    <>
      <div className="promo-card" onClick={() => setMostrar(true)}>
        <figure className="promo-card-img">
          <img src={imagen} alt={titulo} />
        </figure>

        <div className="promo-card-body">
          <h3>{titulo}</h3>
          <p>{descripcion}</p>

          <p className="promo-discount">Descuento: {descuento}</p>
          <p className="promo-price-final">{precioFinal}</p>
          <p className="promo-dates">Hasta: {fin}</p>
        </div>
      </div>

      <div className={`modal ${mostrar ? "is-active" : ""}`}>
        <div className="modal-background" onClick={() => setMostrar(false)}></div>

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{titulo}</p>
            <button className="delete" onClick={() => setMostrar(false)}></button>
          </header>

          <section className="modal-card-body">
            <img src={imagen} alt={titulo} className="modal-img" />

            <p className="content">{descripcion}</p>

            <p className="promo-detail">
              <strong>Precio original:</strong> {precioOriginal}
            </p>
            <p className="promo-detail">
              <strong>Precio final:</strong> {precioFinal}
            </p>
            <p className="promo-detail">
              <strong>Descuento:</strong> {descuento}
            </p>
            <p className="promo-detail">
              <strong>Válido:</strong> {inicio} → {fin}
            </p>
          </section>

          <footer className="modal-card-foot">
            <button 
              onClick={() => addToCart(
                {
                  _id: id,
                  name: titulo,
                  price: precioFinal.replace(),
                  descripcion: descripcion,
                  image_url: imagen,
                },
                1
              )}
              className="button add-cart-btn">
                Añadir al carrito
              </button>
          </footer>
        </div>
      </div>
    </>
  );
}
