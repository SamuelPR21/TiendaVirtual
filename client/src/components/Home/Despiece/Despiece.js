import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cerdo from "./ImagenesDespiece/cerdo.png";
import Pollo from "./ImagenesDespiece/pollo.png";
import Res from "./ImagenesDespiece/res.png";
import Pescado from "./ImagenesDespiece/pez.jpg";

export default function Despiece() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const productos = [
    { nombre: "Cerdo", imagen: Cerdo, ruta: "/productos/cerdo" },
    { nombre: "Pescado", imagen: Pescado, ruta: "/productos/pescado" },
    { nombre: "Pollo", imagen: Pollo, ruta: "/productos/pollo" },
    { nombre: "Res", imagen: Res, ruta: "/productos/res" },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="notification is-dark">
          <h1 className="title has-text-white has-text-centered mb-2">Despiece</h1>
          <p className="subtitle has-text-centered has-text-light mb-5">
            Descubre el despiece de nuestros productos
          </p>

          <div className="columns is-multiline is-centered">
            {productos.map((prod, index) => (
              <div key={index} className="column is-3">
                <div className="card has-background-light">
                  <div className="card-content has-text-centered">
                    <h3
                      className="title is-5 has-text-primary is-clickable mb-3"
                      onClick={() => navigate(prod.ruta)}
                    >
                      {prod.nombre}
                    </h3>

                    <figure
                      className="image is-4by3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedImage(prod.imagen)}
                    >
                      <img
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="is-rounded"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`modal ${selectedImage ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={() => setSelectedImage(null)}
        ></div>

        <div className="modal-content has-text-centered">
          <div
            className="box p-5 has-background-white"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              margin: "auto",
              overflow: "hidden",
            }}
          >
            <figure className="image">
              <img
                src={selectedImage}
                alt="Vista ampliada"
                className="is-fullwidth"
                style={{
                  objectFit: "contain",
                  maxHeight: "80vh",
                  borderRadius: "10px",
                }}
              />
            </figure>
          </div>
        </div>

        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setSelectedImage(null)}
        ></button>
      </div>
    </section>
  );
}
