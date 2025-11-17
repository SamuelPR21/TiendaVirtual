import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./Promociones.css";
import carneMolida from "./Img/CarneMolida.jpg";
import Lomo from "./Img/Lomo.jpg";
import Bondiola from "./Img/Bondolia.jpg";
import Crepinettes from "./Img/Crepinetes.jpg";
import Salmon from "./Img/Salmon.jpg";
import Pernil from "./Img/Pernil.jpg";
import Suscribirse from "../Suscribirse/Suscribirse";
import ImgCarrusel1 from "./Img/ImgCarrusel/carrusel1.jpg";
import ImgCarrusel2 from "./Img/ImgCarrusel/carrusel2.jpg";
import { useUser } from "../../../context/UserContext";

const carouselImages = [
  ImgCarrusel1,
  ImgCarrusel2,
  
];


export default function Promociones() {
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);


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

        {/* Zona de promociones */}
        {user && (
          <div className="columns is-centered is-variable is-7 promos-columns">
            <div className="column is-5">
              <Modal
                imagen={carneMolida}
                titulo="Carne Molida"
                descripcion="Ideal para múltiples preparaciones."
                inicio="2025-01-20"
                fin="2025-01-28"
                descuento="20%"
                precioOriginal="$15.000"
                precioFinal="$12.000"
              />
              <Modal
                imagen={Lomo}
                titulo="Lomo Fino"
                descripcion="Corte premium, jugoso y delicioso."
                inicio="2025-01-20"
                fin="2025-01-28"
                descuento="10%"
                precioOriginal="$30.000"
                precioFinal="$27.000"
              />
              <Modal
                imagen={Bondiola}
                titulo="Bondiola de Cerdo"
                descripcion="Perfecta para asados."
                inicio="2025-01-20"
                fin="2025-01-28"
                descuento="12%"
                precioOriginal="$22.000"
                precioFinal="$19.360"
              />
            </div>

            <div className="column is-5">
              <Modal
                imagen={Crepinettes}
                titulo="Crépinettes"
                descripcion="Rellenas gourmet."
                inicio="2025-01-20"
                fin="2025-01-28"
                descuento="15%"
                precioOriginal="$18.000"
                precioFinal="$15.300"
              />
              <Modal
                imagen={Salmon}
                titulo="Salmón"
                descripcion="Fresco y rico en Omega-3."
                inicio="2025-01-20"
                fin="2025-01-28"
                descuento="8%"
                precioOriginal="$40.000"
                precioFinal="$36.800"
              />
              <Modal
                imagen={Pernil}
                titulo="Pernil de Pollo"
                descripcion="Económico y jugoso."
                inicio="2025-01-20"
                fin="2025-01-28"
                descuento="10%"
                precioOriginal="$14.000"
                precioFinal="$12.600"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
