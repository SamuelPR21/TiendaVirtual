import React, { useState } from "react";
import "./Register.css";
import { register } from "../../../API/user";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_Number: "",
    address: "",
    product_preference: [],
  });

  const [success, setSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const products = ["Cerdo", "Pollo", "Res", "Pescado"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePreference = (product) => {
    setFormData((prev) => {
      const exists = prev.product_preference.includes(product);
      return {
        ...prev,
        product_preference: exists
          ? prev.product_preference.filter((p) => p !== product)
          : [...prev.product_preference, product],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log(response);

      // Registro exitoso
      setSuccess(true);
      setShowConfirm(true);

      // Limpiar todos los campos
      setFormData({
        name: "",
        email: "",
        password: "",
        phone_Number: "",
        address: "",
        product_preference: [],
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      setMensaje("❌ Error en el registro o en el servidor");
      setTimeout(() => setMensaje(""), 5000);
    }
  };

  return (
    <>
      <section className="register-section">
        <h2 className="register-title">Regístrate</h2>
        <p className="register-subtitle">Únete y recibe promociones exclusivas</p>

        {mensaje && <p className="error-message">{mensaje}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="field">
            <label>Nombre completo</label>
            <input
              type="text"
              name="name"
              placeholder="Juan Pérez"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="field">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="correo@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="field">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="field">
            <label>Teléfono</label>
            <input
              type="text"
              name="phone_Number"
              placeholder="Opcional"
              value={formData.phone_Number}
              onChange={handleChange}
            />
          </div>

          {/* Dirección */}
          <div className="field">
            <label>Dirección</label>
            <input
              type="text"
              name="address"
              placeholder="Opcional"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Preferencias */}
          <div className="field">
            <label>Preferencias de productos</label>
            <div className="pref-buttons">
              {products.map((prod) => {
                const active = formData.product_preference.includes(prod);
                return (
                  <button
                    key={prod}
                    type="button"
                    className={`pref-btn ${active ? "active" : ""}`}
                    onClick={() => togglePreference(prod)}
                  >
                    {prod}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" className="btn-register">
            Registrar
          </button>
        </form>
      </section>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div
          className="confirm-modal-overlay"
          onClick={() => setShowConfirm(false)}
        >
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">✓</div>
            <h2 className="confirm-title">Registro exitoso</h2>
            <p className="confirm-text">
              ¡Tu cuenta ha sido creada correctamente! Ahora puedes iniciar sesión y disfrutar de nuestras promociones.
            </p>
            <button
              className="confirm-btn"
              onClick={() => setShowConfirm(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
