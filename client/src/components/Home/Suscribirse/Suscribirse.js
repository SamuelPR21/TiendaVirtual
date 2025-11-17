import React from "react";
import "./Suscribirse.css";
import loginImg from "./Imgs/login.jpg";
import Login from "./Login";

export default function Suscribirse({ onClose, onLoginSuccess }) {

  const goToRegister = () => {
    onClose();
  
    setTimeout(() => {
      const section = document.getElementById("register-section");
      if (section) {
        
        window.requestAnimationFrame(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }, 400); 
  };
  
  const handleClose = (e) => {
    if (e.target.classList.contains("modal-background")) {
      onClose();
    }
  };

  return (
    <div className="modal is-active is-clipped" onClick={handleClose}>
      <div className="modal-background"></div>

      <div
        className="modal-card"
        style={{
          width: "1000px",
          maxWidth: "1000px",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        <section className="modal-card-body p-0 slide-container">

          <div className="slide-inner">

            {/* FORMULARIO */}
            <div className="slide-section login-section">
              <Login
                toggleForm={goToRegister}
                onLoginSucces={() => {
                  onLoginSuccess?.();
                  onClose();
                }}
              />
            </div>

            {/* IMAGEN */}
            <div className="slide-section image-section">
              <figure className="image">
                <img src={loginImg} alt="Login visual" />
              </figure>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
