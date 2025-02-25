import Joi from 'joi';

const tripStopValidator = Joi.object({
  trip_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El trip_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El trip_id no puede estar vacío.',
      'string.hex': 'El trip_id debe ser un identificador hexadecimal.',
      'string.length': 'El trip_id debe tener 24 caracteres.',
      'any.required': 'El trip_id es obligatorio.',
    }),

  destination_id: Joi.string().hex().length(24).required()
    .messages({
      'string.base': 'El destination_id debe ser un identificador de tipo cadena.',
      'string.empty': 'El destination_id no puede estar vacío.',
      'string.hex': 'El destination_id debe ser un identificador hexadecimal.',
      'string.length': 'El destination_id debe tener 24 caracteres.',
      'any.required': 'El destination_id es obligatorio.',
    }),

  stop_order: Joi.number().required()
    .messages({
      'number.base': 'El stop_order debe ser un número.',
      'any.required': 'El stop_order es obligatorio.',
    }),

  arrival_time: Joi.date()
    .messages({
      'date.base': 'La hora de llegada debe ser una fecha válida.',
    }),

  departure_time: Joi.date()
    .messages({
      'date.base': 'La hora de salida debe ser una fecha válida.',
    }),
});

export default tripStopValidator;
