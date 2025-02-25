import Joi from 'joi';

const paymentValidator = Joi.object({
  ticket_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': 'El ID del ticket debe ser una cadena de texto.',
      'string.empty': 'El ID del ticket no puede estar vacío.',
      'string.pattern.base': 'El ID del ticket debe ser un ObjectId válido.',
      'any.required': 'El ID del ticket es obligatorio.',
    }),

  amount: Joi.number().positive().required()
    .messages({
      'number.base': 'El monto debe ser un número.',
      'number.positive': 'El monto debe ser un número positivo.',
      'any.required': 'El monto es obligatorio.',
    }),

  payment_method: Joi.string().valid('MERCADO_PAGO').required()
    .messages({
      'string.base': 'El método de pago debe ser una cadena de texto.',
      'string.empty': 'El método de pago no puede estar vacío.',
      'any.only': 'El método de pago debe ser MERCADO_PAGO.',
      'any.required': 'El método de pago es obligatorio.',
    }),

  payment_date: Joi.date().default(Date.now)
    .messages({
      'date.base': 'La fecha de pago debe ser una fecha válida.',
    }),
});

export default paymentValidator;
