import Joi from 'joi';

const ticketValidator = Joi.object({
  user_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El user_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El user_id no puede estar vacío.',
      'string.hex': 'El user_id debe ser un identificador hexadecimal.',
      'string.length': 'El user_id debe tener 24 caracteres.',
      'any.required': 'El user_id es obligatorio.',
    }),

  trip_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El trip_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El trip_id no puede estar vacío.',
      'string.hex': 'El trip_id debe ser un identificador hexadecimal.',
      'string.length': 'El trip_id debe tener 24 caracteres.',
      'any.required': 'El trip_id es obligatorio.',
    }),

  boarding_stop_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El boarding_stop_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El boarding_stop_id no puede estar vacío.',
      'string.hex': 'El boarding_stop_id debe ser un identificador hexadecimal.',
      'string.length': 'El boarding_stop_id debe tener 24 caracteres.',
      'any.required': 'El boarding_stop_id es obligatorio.',
    }),

  alighting_stop_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El alighting_stop_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El alighting_stop_id no puede estar vacío.',
      'string.hex': 'El alighting_stop_id debe ser un identificador hexadecimal.',
      'string.length': 'El alighting_stop_id debe tener 24 caracteres.',
      'any.required': 'El alighting_stop_id es obligatorio.',
    }),

  seat_number: Joi.number().positive().required()
    .messages({
      'number.base': 'El número de asiento debe ser un número.',
      'number.positive': 'El número de asiento debe ser un valor positivo.',
      'any.required': 'El número de asiento es obligatorio.',
    }),

  purchase_date: Joi.date().default(Date.now)
    .messages({
      'date.base': 'La fecha de compra debe ser una fecha válida.',
    }),

  status: Joi.string().valid('ACTIVE', 'CANCELLED')
    .messages({
      'string.base': 'El estado debe ser una cadena de texto.',
      'any.only': 'El estado debe ser uno de: "ACTIVE", "CANCELLED".',
    }),
});

export default ticketValidator;
