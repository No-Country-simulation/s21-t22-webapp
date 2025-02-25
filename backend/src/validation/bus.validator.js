import Joi from 'joi';

const busValidator = Joi.object({
  plate: Joi.string().trim().min(6).max(10).required()
    .messages({
      'string.empty': 'La placa del bus no puede estar vacía.',
      'string.min': 'La placa del bus debe tener al menos 6 caracteres.',
      'string.max': 'La placa del bus no puede tener más de 10 caracteres.',
      'any.required': 'La placa del bus es obligatoria.',
    }),

  capacity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'La capacidad del bus debe ser un número entero.',
      'number.min': 'La capacidad del bus debe ser al menos 1.',
      'any.required': 'La capacidad del bus es obligatoria.',
    }),
});

export default busValidator;
