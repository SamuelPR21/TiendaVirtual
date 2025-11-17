// src/API/orders.js
import axios from "axios";
import { API_ORDERS } from "../utils/constans";

// Crear pedido (pago)
export const createOrder = async (payload) => {
  const { data } = await axios.post(API_ORDERS, payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return data; // OrderResponseDTO
};

// Listar pedidos del usuario (customer)
export const fetchOrdersByUser = async (userId) => {
  const { data } = await axios.get(`${API_ORDERS}/usuario/${userId}`, {
    withCredentials: true,
  });
  return data;
};

// Listar pedido individual (si lo necesitas)
export const fetchOrderById = async (id) => {
  const { data } = await axios.get(`${API_ORDERS}/${id}`, {
    withCredentials: true,
  });
  return data;
};

// Listar pedidos por rango de fecha (si lo usas)
export const fetchOrdersByDateRange = async (start, end) => {
  const { data } = await axios.get(
    `${API_ORDERS}?startDate=${start}&endDate=${end}`,
    { withCredentials: true }
  );
  return data;
};

// Actualizar estado del pedido (admin)
export const updateOrderStatus = async (id, status) => {
  const { data } = await axios.patch(
    `${API_ORDERS}/${id}`,
    { status },
    { withCredentials: true }
  );
  return data;
};

// ✅ Listar todos los pedidos (ADMIN)
export const fetchAllOrders = async () => {
  const { data } = await axios.get(`${API_ORDERS}/all`, {
    withCredentials: true,
  });
  return data; // array de OrderResponseDTO
};
