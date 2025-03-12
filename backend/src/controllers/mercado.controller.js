// src/controllers/mercado.controller.js
import { createPaymentPreference } from '../services/mercado.service.js';

const createPreferenceController = async (req, res) => {
  try {
    const items = req.body.items || [
      {
        title: 'Producto de prueba',
        quantity: 1,
        unit_price: 100,
      },
    ];

    const preferenceId = await createPaymentPreference(items);
    console.log('ID de preferencia creada:', preferenceId); // Depuración

    // Devuelve la respuesta al cliente
    res.json({ id: preferenceId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error en la creación de la preferencia de pago' });
  }
};

export { createPreferenceController };


