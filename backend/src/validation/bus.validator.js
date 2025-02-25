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

const busValidator = Joi.object({
  company_id: objectIdValidator.required()
    .messages({
      'any.required': 'El ID de la compañía es obligatorio.',
    }),

  license_plate: Joi.string().trim().uppercase().required()
    .messages({
      'string.base': 'La placa debe ser una cadena de texto.',
      'any.required': 'La placa del bus es obligatoria.',
    }),

  capacity: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'La capacidad debe ser un número.',
      'number.integer': 'La capacidad debe ser un número entero.',
      'number.positive': 'La capacidad debe ser mayor a 0.',
      'any.required': 'La capacidad del bus es obligatoria.',
    }),
});

export default busValidator;
