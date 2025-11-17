// src/components/Cart/CartPage.js
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { createOrder } from "../../API/orders";

function CartPage() {
  const { items, totalValue, removeFromCart, clearCart } = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateOrder = async () => {
    setError(null);

    if (!user) {
      setError("Debes iniciar sesión para realizar el pedido.");
      return;
    }

    if (!items.length) {
      setError("No tienes productos en el carrito.");
      return;
    }

    // ⚠️ Ajusta estos campos a lo que devuelva tu perfil
    const userInfo = {
      user_id: user.id || user._id,
      email: user.email,
      address: user.address,        // o user.direction / user.direccion si se llama distinto
      phone_Number: user.phone_Number || user.phone_number || user.phone,
    };

    const productsPayload = items.map(({ product, quantity }) => ({
      product_id: product._id,      // o product.id
      quantity,
      value: (product.price_lb || product.price || 0) * quantity,
    }));

    const payload = {
      total_value: totalValue,
      status: "PENDING",            // o el estado inicial que maneje tu back
      products: productsPayload,
      user: userInfo,
    };

    try {
      setLoading(true);
      const order = await createOrder(payload);
      setCreatedOrder(order);
      clearCart();
    } catch (e) {
      setError(e.response?.data?.message || "Error al crear el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <h1>Carrito</h1>

      {items.length === 0 && <p>No hay productos en el carrito.</p>}

      {items.map(({ product, quantity }) => (
        <div key={product._id} className="cart-item">
          <span>{product.name}</span>
          <span>Cant: {quantity}</span>
          <span>
            $
            {(product.price_lb || product.price || 0) * quantity}
          </span>
          <button onClick={() => removeFromCart(product._id)}>Eliminar</button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h3>Total: ${totalValue}</h3>
          <button onClick={handleCreateOrder} disabled={loading}>
            {loading ? "Creando pedido..." : "Confirmar pedido"}
          </button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {createdOrder && (
        <div className="order-success">
          <h2>Pedido creado correctamente</h2>
          <p>ID: {createdOrder.id}</p>
          <p>Estado: {createdOrder.status}</p>
        </div>
      )}
    </div>
  );
}

export default CartPage;
