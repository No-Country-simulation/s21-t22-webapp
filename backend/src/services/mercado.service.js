// src/services/mercado.service.js
import { createPreference } from '../repositories/mercado.repository.js';

const createPaymentPreference = async (items) => {
  try {
    const response = await createPreference(items);
    console.log('Respuesta recibida en el servicio:', response); // Depuración
    return response.id; // Asegúrate de devolver response.id
  } catch (error) {
    throw new Error('Error al crear la preferencia de pago: ' + error.message);
  }
};

export { createPaymentPreference };
