import Joi from "joi";

const busValidator = Joi.object({
  plate: Joi.string()
    .trim()
    .min(3)
    .max(15)
    .required()
    .messages({
      'string.empty': 'La placa no puede estar vacía.',
      'string.min': 'La placa debe tener al menos 3 caracteres.',
      'string.max': 'La placa debe tener como máximo 15 caracteres.',
      'any.required': 'La placa es requerida.',
    }),

  capacity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'La capacidad debe ser un número.',
      'number.integer': 'La capacidad debe ser un número entero.',
      'number.min': 'La capacidad debe ser al menos 1.',
      'any.required': 'La capacidad es requerida.',
    }),
});

exports = busValidator;