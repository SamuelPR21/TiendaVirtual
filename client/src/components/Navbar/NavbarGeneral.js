import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import LogoutButton from "./LogoutButton";
import "./NavbarGeneral.css";

export default function NavbarGeneral({ onOpenLogin }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const { user, loading } = useUser();

  if (loading) return null;

  return (
    <nav className="navbar is-fixed-top is-transparent" role="navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <span className="logo-text">Carnicería</span>
          </a>

          <button
            className={`navbar-burger ${isActive ? "is-active" : ""}`}
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <button className="navbar-link">Productos</button>
              <div className="navbar-dropdown">
                {["res", "cerdo", "pollo", "pescado"].map((tipo) => (
                  <button
                    key={tipo}
                    className="navbar-item"
                    onClick={() => navigate(`/productos/${tipo}`)}
                  >
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button className="navbar-item" onClick={() => navigate("/AboutUs")}>
              Sobre Nosotros
            </button>
            <button className="navbar-item" onClick={() => navigate("/recetas")}>
              Recetas
            </button>
            <button className="navbar-item" onClick={() => navigate("/PuntosVenta")}>
              Puntos de Venta
            </button>

            {/* Enlaces solo para ADMIN */}
            {user?.role === "admin" && (
              <div className="navbar-item has-dropdown is-hoverable">
                <button className="navbar-link">Administración</button>
                <div className="navbar-dropdown">
                  <button
                    className="navbar-item"
                    onClick={() => navigate("/admin/agregar-producto")}
                  >
                    Agregar Producto
                  </button>
                  <button
                    className="navbar-item"
                    onClick={() => navigate("/admin/agregar-receta")}
                  >
                    Agregar Receta
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="navbar-end">
            {!user ? (
              <div className="navbar-item">
                <div className="buttons">
                  <button
                    className="button is-primary is-outlined"
                    onClick={onOpenLogin}
                  >
                    <span className="icon">
                      <i className="fas fa-user"></i>
                    </span>
                    <span>Regístrate</span>
                  </button>
                </div>
              </div>
            ) : (
              <LogoutButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

