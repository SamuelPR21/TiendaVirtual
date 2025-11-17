import React, { useState } from "react";
import { login } from "../../../API/user";
import { useUser } from "../../../context/UserContext";

export default function Login({ toggleForm, onLoginSucces }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshProfile } = useUser();

  const validar = () => {
    if (!email.trim()) return "El correo es obligatorio";
    if (!/\S+@\S+\.\S+/.test(email)) return "Correo electrónico no válido";
    if (!password.trim()) return "La contraseña es obligatoria";
    return null;
  };

  const handleLogin = async () => {
    const error = validar();
    if (error) {
      setMensaje(`⚠ ${error}`);
      return setTimeout(() => setMensaje(""), 2500);
    }

    try {
      setLoading(true);
      const response = await login(email, password);
      await refreshProfile();

      setMensaje("✅ Inicio de sesión exitoso");
      setTimeout(() => onLoginSucces?.(), 900);
    } catch (error) {
      setMensaje("❌ Credenciales incorrectas");
      setTimeout(() => setMensaje(""), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">

      <h2 className="login-title">Iniciar Sesión</h2>

      <div className="field">
        <label>Email</label>
        <input
          className="input login-input"
          type="email"
          placeholder="correo@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Contraseña</label>
        <input
          className="input login-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className={`button login-btn ${loading ? "is-loading" : ""}`}
        onClick={handleLogin}
      >
        Entrar
      </button>

      {mensaje && (
        <div
          className={`login-message ${
            mensaje.includes("❌")
              ? "login-error"
              : mensaje.includes("⚠")
              ? "login-warning"
              : "login-success"
          }`}
        >
          {mensaje}
        </div>
      )}

      <p className="register-link">
        ¿No tienes cuenta?  
        <button className="btn-link" onClick={toggleForm}>
           Regístrate
        </button>
      </p>
    </div>
  );
}
