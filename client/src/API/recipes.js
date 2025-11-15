import axios from "axios";
import { API_RECIPES } from "../utils/constans";

// Lista todas las recetas (tu backend las tiene protegidas con token)
export const fetchRecipes = async () => {
  const { data } = await axios.get(API_RECIPES, {
    withCredentials: true, // usa cookie auth_token
  });
  return data; // array de recetas [{ id, name, instructions, ingredients, image_url }]
};

// Obtener por id (si lo necesitas)
export const fetchRecipeById = async (id) => {
  const { data } = await axios.get(`${API_RECIPES}/${id}`, {
    withCredentials: true,
  });
  return data;
};

// Filtrar por producto (si lo usas)
export const fetchRecipesByProduct = async (productId) => {
  const { data } = await axios.get(`${API_RECIPES}/filters/product/${productId}`, {
    withCredentials: true,
  });
  return data;
};

// Filtrar por ingredientes (comma-separated IDs)
export const fetchRecipesByIngredients = async (productIdsCsv) => {
  const { data } = await axios.get(`${API_RECIPES}/filters/ingredients?productIds=${productIdsCsv}`, {
    withCredentials: true,
  });
  return data;
};

// Crear receta (requiere admin)
export const createRecipe = async (payload) => {
  // payload: { name, instructions, ingredients: [{producto_id, quantity}], image_url? }
  const { data } = await axios.post(API_RECIPES, payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

