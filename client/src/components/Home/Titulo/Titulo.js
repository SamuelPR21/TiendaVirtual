import React, { useState, useEffect } from "react";
import "../Titulo/Titulo.css";
import { useNavigate } from "react-router-dom";
import Suscribirse from "../Suscribirse/Suscribirse";
import Carrusel from "../Carrusel/Carrusel";

export default function Titulo() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("modalShown");
    if (!hasSeenModal) {
      setIsModalOpen(true);
      sessionStorage.setItem("modalShown", "true");
    }
  }, []);

  return (
    <>
      {isModalOpen && (
        <Suscribirse
          onClose={() => setIsModalOpen(false)}
          onLoginSucces={() => {
            setLoginMessage("✅ Bienvenido a Carnicería");
            setIsModalOpen(false);
            setTimeout(() => setLoginMessage(""), 3000);
          }}
        />
      )}

      {loginMessage && (
        <div
          className="notification is-success is-light p-3 mt-2"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          {loginMessage}
        </div>
      )}

  <section className="hero titulo-hero titulo-altura">
        <div className="titulo-fondo"></div>

        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              
              <div className="column is-6 has-text-white">
                <h1 className="title is-size-1 has-text-weight-bold has-text-shadow">
                  Carnicería
                </h1>

                <h2 className="subtitle is-size-3 has-text-shadow">
                  Calidad y Buen Precio
                </h2>

                <button
              className="button promos-login-btn"
              onClick={() => setIsModalOpen(true)}
                >
                  Inicio de Sesión
                </button>
              </div>

              <div className="column is-6 carrusel-col">
              <div className="carrusel-cuadrado">
                  <Carrusel />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="hero-foot">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul className="is-flex is-justify-content-center">
                <li><button onClick={() => navigate("/productos/res")}>Res</button></li>
                <li><button onClick={() => navigate("/productos/cerdo")}>Cerdo</button></li>
                <li><button onClick={() => navigate("/productos/pollo")}>Pollo</button></li>
                <li><button onClick={() => navigate("/productos/pescado")}>Pescado</button></li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
