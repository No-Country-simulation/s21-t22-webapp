import Joi from 'joi';

const mileValidator = Joi.object({
  user_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': 'El ID del usuario debe ser una cadena de texto.',
      'string.empty': 'El ID del usuario no puede estar vacío.',
      'string.pattern.base': 'El ID del usuario debe ser un ObjectId válido.',
      'any.required': 'El ID del usuario es obligatorio.',
    }),

  trip_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': 'El ID del viaje debe ser una cadena de texto.',
      'string.empty': 'El ID del viaje no puede estar vacío.',
      'string.pattern.base': 'El ID del viaje debe ser un ObjectId válido.',
      'any.required': 'El ID del viaje es obligatorio.',
    }),

  miles_earned: Joi.number().min(1).required()
    .messages({
      'number.base': 'Las millas ganadas deben ser un número.',
      'number.min': 'Las millas ganadas deben ser al menos {#limit}.',
      'any.required': 'Las millas ganadas son obligatorias.',
    }),

  earned_at: Joi.date().default(Date.now)
    .messages({
      'date.base': 'La fecha de ganancia debe ser una fecha válida.',
    }),
});

export default mileValidator;
