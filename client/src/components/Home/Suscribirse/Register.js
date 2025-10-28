import { useState } from "react";

export default function Register({ toggleForm }) {
    const [mensaje, setMensaje] = useState("");

    const handleRegister = () => {
      setMensaje("✅ Usuario registrado exitosamente");
      setTimeout(() => setMensaje(""), 3000);
    };
  return (
    <>
      <h2 className="title is-4 mb-4">Crear Cuenta</h2>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Nombre completo" />
        </div>
      </div>

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

      <div className="field">
        <div className="control">
          <input className="input" type="number" placeholder="Número de teléfono" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Dirección" />
        </div>
      </div>
      
      <div className="field mt-4">
        <div className="control">
          <div className="select is-fullwidth">
            <select>
              <option>Res</option>
              <option>Cerdo</option>
              <option>Pollo</option>
              <option>Pescado</option>
            </select> 
          </div>
        </div>
      </div>

      <button className="button is-success is-fullwidth mb-3" onClick={handleRegister}>Registrarse</button>
      {mensaje && (
        <div className="notification is-success is-light p-3 mt-2">
          {mensaje}
        </div>
      )}

      <p>
        ¿Ya tienes cuenta?{" "}
        <button onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>
          Inicia sesión
        </button>
      </p>
    </>
  );
}
