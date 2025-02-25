import Joi from 'joi';

const reservationValidator = Joi.object({
  trip: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': 'El ID del viaje debe ser una cadena de texto.',
      'string.empty': 'El ID del viaje no puede estar vacío.',
      'string.pattern.base': 'El ID del viaje debe ser un ObjectId válido.',
      'any.required': 'El ID del viaje es obligatorio.',
    }),

  user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': 'El ID del usuario debe ser una cadena de texto.',
      'string.empty': 'El ID del usuario no puede estar vacío.',
      'string.pattern.base': 'El ID del usuario debe ser un ObjectId válido.',
      'any.required': 'El ID del usuario es obligatorio.',
    }),

  from: Joi.string().min(3).required()
    .messages({
      'string.base': 'El origen debe ser una cadena de texto.',
      'string.empty': 'El origen no puede estar vacío.',
      'string.min': 'El origen debe tener al menos 3 caracteres.',
      'any.required': 'El origen es obligatorio.',
    }),

  to: Joi.string().min(3).required()
    .messages({
      'string.base': 'El destino debe ser una cadena de texto.',
      'string.empty': 'El destino no puede estar vacío.',
      'string.min': 'El destino debe tener al menos 3 caracteres.',
      'any.required': 'El destino es obligatorio.',
    }),

  seatNumber: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'El número de asiento debe ser un número.',
      'number.integer': 'El número de asiento debe ser un número entero.',
      'number.min': 'El número de asiento debe ser al menos 1.',
      'any.required': 'El número de asiento es obligatorio.',
    }),
});

export default reservationValidator;
