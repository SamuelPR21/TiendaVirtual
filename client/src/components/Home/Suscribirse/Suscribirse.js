import React, { useState } from "react";
import "./Suscribirse.css";
import loginImg from "./Imgs/login.jpg";
import registerImg from "./Imgs/register.jpg";
import Login from "./Login";
import Register from "./Register";

export default function Suscribirse({onClose, onLoginSuccess}) {
  const [isRegister, setIsRegister] = useState(false);
  const toggleForm = () => setIsRegister(!isRegister);




  const handleClose = (e) => {
    if (e.target.classList.contains('modal-background')) {
      onClose();
    }
  }

  return (
    <div className="modal is-active is-clipped" onClick={handleClose}>
      <div className="modal-background"></div>

      <div
        className="modal-card"
        style={{
          maxWidth: "850px",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <section className="modal-card-body p-0 slide-container">
          <div className={`slide-inner ${isRegister ? "show-register" : ""}`}>
            {/* LOGIN */}
            <div className="slide-section has-text-centered p-6 login-section">
              <Login toggleForm={toggleForm} onLoginSucces={() => {
                onLoginSuccess?.()
                onClose()
              }} />
            </div>

            {/* Imagen derecha (login) */}
            <div className="slide-section image-section">
              <figure className="image is-4by3">
                <img src={loginImg} alt="Login visual" />
              </figure>
            </div>

            {/* Imagen izquierda (registro) */}
            <div className="slide-section image-section">
              <figure className="image is-4by3">
                <img src={registerImg} alt="Register visual" />
              </figure>
            </div>

            {/* REGISTER */}
            <div className="slide-section has-text-centered p-6 register-section">
              <Register toggleForm={toggleForm} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
