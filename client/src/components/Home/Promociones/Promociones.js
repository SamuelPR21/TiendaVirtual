import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./Promociones.css";
import Suscribirse from "../Suscribirse/Suscribirse";
import ImgCarrusel1 from "./Img/ImgCarrusel/carrusel1.jpg";
import ImgCarrusel2 from "./Img/ImgCarrusel/carrusel2.jpg";
import { useUser } from "../../../context/UserContext";
import {getAllOfferts} from "../../../API/offerts"

const carouselImages = [
  ImgCarrusel1,
  ImgCarrusel2,
  
];


export default function Promociones() {
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);


  const [offerts, setOfferts] = useState([]);

    useEffect(() => {
      if (user) {
        getAllOfferts().then(setOfferts);
      }
    }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="promos-wrapper">

      <div className="promos-bg">
        <img
          src={carouselImages[carouselIndex]}
          alt="Promos fondo"
          className="promos-bg-img"
        />
        <div className="promos-bg-overlay"></div>
      </div>

      <div className="promos-content container">

        {/* Encabezado fijo */}
        <div className="promos-header has-text-centered">
          <h1 className="promos-title">Promociones</h1>
          <p className="promos-subtitle">
            {!user
              ? "Debes iniciar sesión para ver las promociones."
              : "Ofertas disponibles para ti."}
          </p>

          {!user && (
            <button
              className="button promos-login-btn"
              onClick={() => setShowLoginModal(true)}
            >
               Iniciar Sesión
            </button>
          )}
        </div>

        {/* Modal de login */}
        {showLoginModal && (
          <Suscribirse
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={() => setShowLoginModal(false)}
          />
        )}

          {user && offerts.length > 0 && (
            <div className="columns is-centered is-variable is-7 promos-columns">
              {offerts.map((offert) => (
                <div className="column is-5" key={offert.id}>
                  <Modal
                    id={offert.id}
                    imagen={offert.image_url}
                    titulo={offert.producto_snapshot.name}
                    descripcion={offert.description}
                    inicio={offert.start_date}
                    fin={offert.end_date}
                    descuento={`${offert.discount}%`}
                    precioOriginal={`${offert.producto_snapshot.price}`}
                    precioFinal={`${Math.round(
                      offert.producto_snapshot.price * (1 - offert.discount / 100)
                    )}`}
                  />
                </div>
              ))}
            </div>
          )}

      </div>
    </section>
  );
}
