import { MercadoPagoConfig } from 'mercadopago';
import { MERCADOPAGO_API_KEY } from '../config.js';

const mercadopago = new MercadoPagoConfig({ accessToken: MERCADOPAGO_API_KEY });

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No hay productos en el carrito.' });
    }

    const result = await mercadopago.preferences.create({
      body: {
        items: items.map(item => ({
          title: item.title,
          unit_price: item.unit_price,
          quantity: item.quantity,
          currency_id: 'COP',
        })),
        back_urls: {
          success: 'http://localhost:3000/success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending',
        },
        auto_return: 'approved',
        notification_url: 'https://<tu-ngrok-o-servidor-publico>/webhook',
      },
    });

    res.json(result);
  } catch (error) {
    console.error('Error al crear la orden:', error);
    return res.status(500).json({ message: 'Error interno al crear la orden.' });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    console.log("Webhook recibido:", req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error en webhook:", error);
    res.sendStatus(500);
  }
};
