import React from "react";
import { useState } from "react";

export default function Login({ toggleForm, onLoginSucces }) {
 
  const [mensaje, setMensaje] = useState("");
  const handleLoginMessage = () => {
    setMensaje("✅ Inicio Sesion Exitoso");
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleLogin = () => {
    onLoginSucces();
  }

  return (
    <>
      <h2 className="title is-4 mb-4">Iniciar Sesión</h2>

      <div className="field">
        <div className="control">
          <input className="input" type="email" placeholder="Correo electrónico" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="password" placeholder="Contraseña" />
        </div>
      </div>

      <button className="button is-link is-fullwidth mb-3" onClick={() => { handleLogin(); handleLoginMessage(); }}>Entrar</button>
      {mensaje && (
        <div className="notification is-success is-light p-3 mt-2">
          {mensaje}
        </div>
      )}
      
      <p>
        ¿No tienes cuenta?{" "}
        <button onClick={toggleForm} style={{ cursor: "pointer", color: "blue"  }}>
          Regístrate
        </button>
      </p>
    </>
  );
}
