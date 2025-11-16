import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

// ✅ evita que los títulos queden debajo de la navbar fija
document.documentElement.classList.add("has-navbar-fixed-top");
document.body.classList.add("has-navbar-fixed-top");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
