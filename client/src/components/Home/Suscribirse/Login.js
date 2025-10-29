import React from "react";
import { useState } from "react";
import {login} from "../../../API/user"
import { useUser } from "../../../context/UserContext";

export default function Login({ toggleForm, onLoginSucces }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(email, password);
      console.log("Login exitoso:", response);

      const data =(response.data || response)
      setUser(data);

      setMensaje("✅ Inicio de sesión exitoso. ¡Bienvenido!");
      setTimeout(() => {
        onLoginSucces();
      });
    } catch (error) {
      console.error("Error en el login:", error);
      setMensaje("❌ Error en las credenciales o en el servidor");
      setTimeout(() => setMensaje(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="title is-4 mb-4">Iniciar Sesión</h2>

      <div className="field">
        <div className="control">
          <input 
            className="input" 
            type="email" 
            placeholder="Correo electrónico"
            value={email}
            onChange={
              (e) => setEmail(e.target.value)
            }
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input 
            className="input" 
            type="password"
            placeholder="Contraseña" 
            value={password} 
            onChange={
              (e) => setPassword(e.target.value)
              }
          />
        </div>
      </div>

      <button
        className={`button is-link is-fullwidth mb-3 ${loading ? "is-loading" : ""}`}
        onClick={handleLogin}
      >
        Entrar
      </button>

      {mensaje && (
        <div className={`notification ${mensaje.includes("✅") ? "is-success" : "is-danger"} is-light p-3 mt-2`}>
          {mensaje}
        </div>
      )}

      <p>
        ¿No tienes cuenta?{" "}
        <button
          onClick={toggleForm}
          style={{ cursor: "pointer", color: "blue", background: "none", border: "none" }}
        >
          Regístrate
        </button>
      </p>
    </>
  );
}
