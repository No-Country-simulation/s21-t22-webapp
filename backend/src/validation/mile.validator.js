import Joi from 'joi';
import mongoose from 'mongoose';

const objectIdValidator = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation').messages({
  'any.invalid': 'El ID proporcionado no es válido.',
});

const mileValidator = Joi.object({
  user: objectIdValidator.required()
    .messages({
      'any.required': 'El ID del usuario es obligatorio.',
    }),

  trip: objectIdValidator.required()
    .messages({
      'any.required': 'El ID del viaje es obligatorio.',
    }),

  miles_earned: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Las millas ganadas deben ser un número.',
      'number.integer': 'Las millas ganadas deben ser un número entero.',
      'number.positive': 'Las millas ganadas deben ser un número positivo.',
      'any.required': 'Las millas ganadas son obligatorias.',
    }),

  earned_at: Joi.date().default(() => new Date(), 'Fecha de obtención')
    .messages({
      'date.base': 'La fecha de obtención debe ser una fecha válida.',
    }),
});

export default mileValidator;
