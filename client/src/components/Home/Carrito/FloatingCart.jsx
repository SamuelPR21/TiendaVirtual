import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartSidebar from "./CartSidebar";
import { useCart } from "../../../context/CartContext";

export default function FloatingCart() {
  const { carrito, removeFromCart, updateQuantity } = useCart();
  const [cartVisible, setCartVisible] = useState(false);

  const checkout = async () => {
    const items = carrito.map(item => ({
      title: item.producto.nombre,
      unit_price: parseInt(item.producto.precio), // Asegúrate que es número
      quantity: item.cantidad
    }));
  
    try {
      const response = await fetch("http://localhost:3001/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items })
      });
  
      const data = await response.json();
      window.location.href = data.init_point; // redirige al pago
    } catch (error) {
      console.error("Error durante el checkout:", error);
      alert("No se pudo iniciar el proceso de pago.");
    }
  };
  
  

  const total = carrito.reduce((acc, item) => {
    return acc + item.producto.precio * item.cantidad;
  }, 0);
  

  return (
    <>
      <button 
        className="button is-primary is-rounded"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 2000
        }}
        onClick={() => setCartVisible(true)}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>

      <CartSidebar
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        cartItems={carrito}
        updateQuantity={updateQuantity}
        removeItem={removeFromCart}
        checkout={checkout}
        total={total}
      />
    </>
  );
}
