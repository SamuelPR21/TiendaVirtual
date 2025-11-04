import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./logout.css"; 

export default function LogoutButton() {
  const { handleLogout } = useUser();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await handleLogout();
      navigate("/"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button
      className="button is-danger is-light logout-button"
      onClick={handleClick}
      title="Cerrar sesión"
    >
      <span className="icon is-small">
        <i className="fas fa-sign-out-alt"></i>
      </span>
      <span>Salir</span>
    </button>
  );
}
