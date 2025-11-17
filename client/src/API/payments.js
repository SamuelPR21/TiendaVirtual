import axios from "axios";
import { API_PAYMENTS } from "../utils/constans";

export const checkoutPayment = async (payload) => {
  // payload: { order_id, amount, card_holder, card_number, exp_month, exp_year, cvv }
  const { data } = await axios.post(`${API_PAYMENTS}/checkout`, payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return data; // { payment, order }
};
