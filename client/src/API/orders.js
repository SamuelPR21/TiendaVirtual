// src/API/orders.js
import axios from "axios";
import { API_ORDERS } from "../utils/constans";

/**
 * Crear un pedido
 * body que espera el back (OrderRequestDTO):
 * {
 *   total_value: number,
 *   status: string,
 *   products: [{ product_id, quantity, value }],
 *   user: { user_id, email, address, phone_Number }
 * }
 */
export const createOrder = async (payload) => {
  const { data } = await axios.post(API_ORDERS, payload, {
    withCredentials: true, // para que viaje la cookie del token
    headers: { "Content-Type": "application/json" },
  });
  return data; // OrderResponseDTO
};

// Obtener pedido por ID
export const fetchOrderById = async (id) => {
  const { data } = await axios.get(`${API_ORDERS}/${id}`, {
    withCredentials: true,
  });
  return data;
};

// Listar pedidos de un usuario
export const fetchOrdersByUser = async (userId) => {
  const { data } = await axios.get(`${API_ORDERS}/usuario/${userId}`, {
    withCredentials: true,
  });
  return data; // array de OrderResponseDTO
};

// Listar pedidos por rango de fechas (para admin/reportes)
export const fetchOrdersByDateRange = async (startDate, endDate) => {
  const { data } = await axios.get(
    `${API_ORDERS}?startDate=${startDate}&endDate=${endDate}`,
    { withCredentials: true }
  );
  return data;
};

// Actualizar estado de pedido (admin)
export const updateOrderStatus = async (id, status) => {
  const { data } = await axios.patch(
    `${API_ORDERS}/${id}`,
    { status },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return data;
};
