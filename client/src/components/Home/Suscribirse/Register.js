import { useState } from "react";
import {register} from "../../../API/user"

export default function Register({ toggleForm }) {

    const [nameComplete, setNameComplete] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [preference, setPreference] = useState([]);

    const [mensaje, setMensaje] = useState("");

    const handleRegister = async() => {

      try {
        const response = await register({
          name: nameComplete, 
          email: email, 
          password: password, 
          phone_Number: phoneNumber, 
          address: address, 
          product_preference: preference
        });
        console.log("Registro exitoso:", response);
        setMensaje("✅ Usuario registrado exitosamente");
        setTimeout(() => setMensaje(""), 3000);

      } catch (error) {
        console.error("Error en el registro:", error);
        setMensaje("❌ Error en el registro o en el servidor");
        setTimeout(() => setMensaje(""), 5000);

      }

 
    };
  return (
    <>
      <h2 className="title is-4 mb-4">Crear Cuenta</h2>

      <div className="field">
        <div className="control">
          <input 
            className="input" 
            type="text" 
            placeholder="Nombre completo" 
            value={nameComplete}
            onChange={(e) => setNameComplete(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input 
            className="input" 
            type="email" 
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
         />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input 
            className="input" 
            type="number" 
            placeholder="Número de teléfono" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input 
            className="input" 
            type="text" 
            placeholder="Dirección" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      
      <div className="field mt-4">
        <label className="label">Preferencias de producto</label>
        <div className="control">
          {["res", "cerdo", "pollo", "pescado"].map((tipo) => (
            <label key={tipo} className="checkbox mr-3">
              <input
                type="checkbox"
                value={tipo}
                checked={preference.includes(tipo)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPreference([...preference, tipo]);
                  } else {
                    setPreference(preference.filter((item) => item !== tipo));
                  }
                }}
              />{" "}
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </label>
          ))}
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
