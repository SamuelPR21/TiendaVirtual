import axios from "axios";
import { API_PRODUCTS } from "../utils/constans";

// Listar todos (o con query ?animal= si lo envías)
export const fetchProducts = async (animal) => {
  const url = animal
    ? `${API_PRODUCTS}?animal=${encodeURIComponent(animal)}`
    : API_PRODUCTS;

  const { data } = await axios.get(url); 
  return data; 
};

// Filtrar por animal usando /animal/:animal
export const fetchProductsByAnimal = async (animal) => {
  const { data } = await axios.get(
    `${API_PRODUCTS}/animal/${encodeURIComponent(animal)}`
  );
  return data;
};

// Obtener por id
export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${API_PRODUCTS}/${id}`);
  return data; 
};

// Crear producto (requiere admin autenticado)
export const createProduct = async (payload) => {
  // payload: { name, price_lb, description, stock, animal, image_url? }
  const { data } = await axios.post(API_PRODUCTS, payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return data;
};
