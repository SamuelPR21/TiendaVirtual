import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import LogoutButton from "./LogoutButton";
import CartDrawer from "../Cart/CartDrawer";
import "./NavbarGeneral.css";

export default function NavbarGeneral({ onOpenLogin }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { user, loading } = useUser();
  const { totalUnits } = useCart();

  if (loading) return null;

  const isAdmin = user?.role === "admin";

  return (
    <>
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
              {/* Productos */}
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

              <button
                className="navbar-item"
                onClick={() => navigate("/AboutUs")}
              >
                Sobre Nosotros
              </button>

              <button
                className="navbar-item"
                onClick={() => navigate("/recetas")}
              >
                Recetas
              </button>

              <button
                className="navbar-item"
                onClick={() => navigate("/PuntosVenta")}
              >
                Puntos de Venta
              </button>

              {/* Customer: enlace directo a Perfil */}
              {user && !isAdmin && (
                <button
                  className="navbar-item"
                  onClick={() => navigate("/perfil")}
                >
                  Perfil
                </button>
              )}

              {/* Regístrate / Logout (mismos para ambos roles) */}
              {!user ? (
                <button
                  className="navbar-item"
                  onClick={() => onOpenLogin && onOpenLogin()}
                >
                  Regístrate
                </button>
              ) : (
                <div className="navbar-item">
                  <LogoutButton />
                </div>
              )}

              {/* Administración solo admin (con Perfil dentro) */}
              {isAdmin && (
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
                    <hr className="navbar-divider" />
                    <button
                      className="navbar-item"
                      onClick={() => navigate("/perfil")}
                    >
                      Perfil
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Esquina derecha: carrito */}
            <div className="navbar-end">
              <div className="navbar-item">
                <button
                  className="button is-light cart-icon-button"
                  onClick={() => setIsCartOpen(true)}
                >
                  <span className="icon">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  {totalUnits > 0 && (
                    <span className="tag is-danger is-rounded cart-icon-badge">
                      {totalUnits}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer del carrito */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
