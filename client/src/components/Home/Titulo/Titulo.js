import React, { useState, useEffect } from "react";
import portada from "../Titulo/Portada.jpeg";
import "../Titulo/Titulo.css";
import { useNavigate } from "react-router-dom";
import Suscribirse from "../Suscribirse/Suscribirse";

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

      {/* Importante: usamos is-fullheight-with-navbar para respetar la navbar fija global */}
      <section className="hero is-fullheight-with-navbar">
        {/* Fondo con overlay */}
        <div className="hero-background is-overlay">
          <img
            src={portada}
            alt="Portada"
            className="image is-fullwidth is-fullheight"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="is-overlay has-background-black has-opacity-40"></div>
        </div>

        {/* 🚫 Eliminamos hero-head con su navbar duplicada */}

        {/* Título central */}
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title has-text-white is-size-1 has-text-weight-bold has-text-shadow">
              Carnicería
            </h1>
            <h2 className="subtitle has-text-white is-size-3 has-text-shadow">
              Calidad y Buen Precio
            </h2>
            {/* Si quieres un CTA para abrir el modal de login, puedes dejar este botón */}
            <button className="button is-primary mt-4" onClick={() => setIsModalOpen(true)}>
              Regístrate
            </button>
          </div>
        </div>

        {/* Tabs inferiores (categorías) */}
        <div className="hero-foot">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul className="is-flex is-justify-content-center">
                <li>
                  <button onClick={() => navigate("/productos/res")}>Res</button>
                </li>
                <li>
                  <button onClick={() => navigate("/productos/cerdo")}>Cerdo</button>
                </li>
                <li>
                  <button onClick={() => navigate("/productos/pollo")}>Pollo</button>
                </li>
                <li>
                  <button onClick={() => navigate("/productos/pescado")}>Pescado</button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
