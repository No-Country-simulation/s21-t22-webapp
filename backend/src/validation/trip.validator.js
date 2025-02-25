import Joi from 'joi';

const tripValidator = Joi.object({
  origin_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El origin_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El origin_id no puede estar vacío.',
      'string.hex': 'El origin_id debe ser un identificador hexadecimal.',
      'string.length': 'El origin_id debe tener 24 caracteres.',
      'any.required': 'El origin_id es obligatorio.',
    }),

  destination_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El destination_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El destination_id no puede estar vacío.',
      'string.hex': 'El destination_id debe ser un identificador hexadecimal.',
      'string.length': 'El destination_id debe tener 24 caracteres.',
      'any.required': 'El destination_id es obligatorio.',
    }),

  bus_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El bus_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El bus_id no puede estar vacío.',
      'string.hex': 'El bus_id debe ser un identificador hexadecimal.',
      'string.length': 'El bus_id debe tener 24 caracteres.',
      'any.required': 'El bus_id es obligatorio.',
    }),

  departureDate: Joi.date().required()
    .messages({
      'date.base': 'La fecha de salida debe ser una fecha válida.',
      'any.required': 'La fecha de salida es obligatoria.',
    }),

  arrivalDate: Joi.date().required()
    .messages({
      'date.base': 'La fecha de llegada debe ser una fecha válida.',
      'any.required': 'La fecha de llegada es obligatoria.',
    }),

  price: Joi.number().precision(2).required()
    .messages({
      'number.base': 'El precio debe ser un número.',
      'number.precision': 'El precio debe tener hasta 2 decimales.',
      'any.required': 'El precio es obligatorio.',
    }),

  miles_reward: Joi.number().min(0).required()
    .messages({
      'number.base': 'Las millas de recompensa deben ser un número.',
      'number.min': 'Las millas de recompensa deben ser mayores o iguales a 0.',
      'any.required': 'Las millas de recompensa son obligatorias.',
    }),

  featured: Joi.boolean().required()
    .messages({
      'boolean.base': 'El campo featured debe ser un valor booleano.',
      'any.required': 'El campo featured es obligatorio.',
    }),
});

export default tripValidator;
