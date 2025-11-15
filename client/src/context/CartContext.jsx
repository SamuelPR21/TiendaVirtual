// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [carrito, setCarrito] = useState([]);

//   const addToCart = (producto) => {
//     setCarrito((prev) => {
//       const existente = prev.find(item => item.producto.id === producto.id);
//       if (existente) {
//         return prev.map(item =>
//           item.producto.id === producto.id
//             ? { ...item, cantidad: item.cantidad + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { producto, cantidad: 1 }];
//       }
//     });
//   };

//   const updateQuantity = (id, cantidad) => {
//     setCarrito(prev =>
//       prev.map(item =>
//         item.producto.id === id ? { ...item, cantidad } : item
//       )
//     );
//   };
  
  
  
//   const removeFromCart = (id) => {
//     setCarrito(prev => prev.filter(item => item.producto.id !== id));
//   };
  

//   return (
//     <CartContext.Provider value={{ carrito, addToCart, removeFromCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }
