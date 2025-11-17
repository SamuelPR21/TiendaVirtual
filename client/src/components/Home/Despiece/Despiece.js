import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cerdo from "./ImagenesDespiece/cerdo.png";
import Pollo from "./ImagenesDespiece/pollo.png";
import Res from "./ImagenesDespiece/res.png";
import Pescado from "./ImagenesDespiece/pez.jpg";
import "./Despiece.css";

export default function Despiece() {
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const productos = [
    {
      nombre: "Cerdo",
      imagen: Cerdo,
      ruta: "/productos/cerdo",
      descripcion:
        "El cerdo es la joya versátil de nuestra selección. Jugoso, noble y perfecto para cualquier preparación.",
    },
    {
      nombre: "Pescado",
      imagen: Pescado,
      ruta: "/productos/pescado",
      descripcion:
        "Nuestro pescado es sinónimo de frescura. Ligero, saludable y perfecto para paladares exigentes.",
    },
    {
      nombre: "Pollo",
      imagen: Pollo,
      ruta: "/productos/pollo",
      descripcion:
        "El pollo: suave, ligero y siempre confiable. Ideal para comidas rápidas o recetas gourmet.",
    },
    {
      nombre: "Res",
      imagen: Res,
      ruta: "/productos/res",
      descripcion:
        "La res es la reina del sabor intenso. Cortes selectos para quienes buscan excelencia.",
    },
  ];

  // Autoplay cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % productos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [productos.length]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % productos.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + productos.length) % productos.length);
  };

  return (
    <section className="despiece-section">
      <h1 className="despiece-title">Despiece</h1>
      <p className="despiece-subtitle">
        Nuestros cortes premium, explicados y presentados para ti.
      </p>

      {/* Carrusel */}
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevSlide}>
          ❮
        </button>

        <div className="carousel-card">
          <div className="card-left" onClick={() => setSelectedImage(productos[index].imagen)}>
            <img
              src={productos[index].imagen}
              alt={productos[index].nombre}
              className="carousel-image"
            />
          </div>

          <div className="card-right">
            <h2>{productos[index].nombre}</h2>
            <p>{productos[index].descripcion}</p>
            <button
              className="btn-producto"
              onClick={() => navigate(productos[index].ruta)}
            >
              Ver productos
            </button>
          </div>
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>
          ❯
        </button>
      </div>

      {/* Puntos del carrusel */}
      <div className="carousel-dots">
        {productos.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>

      {/* Modal */}
      <div className={`modal ${selectedImage ? "is-active" : ""}`}>
        <div className="modal-background" onClick={() => setSelectedImage(null)}></div>
        <div className="modal-content">
          <img src={selectedImage} alt="Vista ampliada" className="modal-img" />
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
