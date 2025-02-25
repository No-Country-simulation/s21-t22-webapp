import Joi from 'joi';

const seatValidator = Joi.object({
  trip: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El trip debe ser un identificador de tipo cadena.',
      'string.empty': 'El trip no puede estar vacío.',
      'string.hex': 'El trip debe ser un identificador hexadecimal.',
      'string.length': 'El trip debe tener 24 caracteres.',
      'any.required': 'El trip es obligatorio.',
    }),

  ticket: Joi.string().hex().length(24)
    .messages({
      'string.base': 'El ticket debe ser un identificador de tipo cadena.',
      'string.hex': 'El ticket debe ser un identificador hexadecimal.',
      'string.length': 'El ticket debe tener 24 caracteres.',
    }),

  number: Joi.number().positive().required()
    .messages({
      'number.base': 'El número de asiento debe ser un número.',
      'number.positive': 'El número de asiento debe ser un valor positivo.',
      'any.required': 'El número de asiento es obligatorio.',
    }),

  status: Joi.string().valid('AVAILABLE', 'RESERVED', 'OCCUPIED').required()
    .messages({
      'string.base': 'El estado debe ser una cadena de texto.',
      'any.only': 'El estado debe ser uno de: "AVAILABLE", "RESERVED", "OCCUPIED".',
      'any.required': 'El estado es obligatorio.',
    }),
});

export default seatValidator;
