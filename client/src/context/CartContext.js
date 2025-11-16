// src/context/CartContext.js
import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Helper para obtener el ID consistente
const getProductId = (product) => product?._id || product?.id;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ product, quantity }]

  const addToCart = (product, quantity = 1) => {
    const newId = getProductId(product);

    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => getProductId(i.product) === newId
      );

      if (idx >= 0) {
        // Ya existe → sumar cantidad
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          quantity: copy[idx].quantity + quantity,
        };
        return copy;
      }

      // No existe → agregar nuevo
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId, newQty) => {
    setItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((i) => getProductId(i.product) !== productId);
      }
      return prev.map((i) =>
        getProductId(i.product) === productId
          ? { ...i, quantity: newQty }
          : i
      );
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) =>
      prev.filter((i) => getProductId(i.product) !== productId)
    );
  };

  const clearCart = () => setItems([]);

  const totalValue = useMemo(
    () =>
      items.reduce(
        (acc, item) =>
          acc +
          (item.product.price_lb || item.product.price || 0) *
            item.quantity,
        0
      ),
    [items]
  );

  const totalUnits = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalValue,
    totalUnits,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
