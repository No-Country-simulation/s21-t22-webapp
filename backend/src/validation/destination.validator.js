import Joi from 'joi';

const destinationValidator = Joi.object({
  name: Joi.string().trim().min(3).max(100).required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.',
      'string.empty': 'El nombre no puede estar vacío.',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
      'string.max': 'El nombre no puede superar los {#limit} caracteres.',
      'any.required': 'El nombre del destino es obligatorio.',
    }),

  city: Joi.string().trim().min(2).max(100).required()
    .messages({
      'string.base': 'La ciudad debe ser una cadena de texto.',
      'string.empty': 'La ciudad no puede estar vacía.',
      'string.min': 'La ciudad debe tener al menos {#limit} caracteres.',
      'string.max': 'La ciudad no puede superar los {#limit} caracteres.',
      'any.required': 'La ciudad es obligatoria.',
    }),

  code: Joi.string().trim().min(3).max(10).required()
    .messages({
      'string.base': 'El código debe ser una cadena de texto.',
      'string.empty': 'El código no puede estar vacío.',
      'string.min': 'El código debe tener al menos {#limit} caracteres.',
      'string.max': 'El código no puede superar los {#limit} caracteres.',
      'any.required': 'El código del destino es obligatorio.',
    }),
});

export default destinationValidator;
