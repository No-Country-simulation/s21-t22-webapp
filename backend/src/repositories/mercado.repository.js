import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Cargar las variables de entorno
dotenv.config();

// Configurar el cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const createPreference = async (items) => {
  try {
    const preference = new Preference(client);

    const body = {
      items: items,
      back_urls: {
        success: 'http://www.tusitio.com/pago-exitoso',
        failure: 'http://www.tusitio.com/pago-fallido',
        pending: 'http://www.tusitio.com/pago-pendiente',
      },
      auto_return: 'approved',
    };

    const response = await preference.create({ body });
    console.log('Respuesta de MercadoPago:', response); // Depuración
    return response; // Devuelve la respuesta completa
  } catch (error) {
    throw new Error('Error al crear la preferencia de pago: ' + error.message);
  }
};

export { createPreference };