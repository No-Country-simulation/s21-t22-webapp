import Joi from 'joi';

const destinationValidator = Joi.object({
  name: Joi.string().trim().min(3).max(100).required()
    .messages({
      'string.empty': 'El nombre del destino no puede estar vacío.',
      'string.min': 'El nombre del destino debe tener al menos 3 caracteres.',
      'string.max': 'El nombre del destino no puede tener más de 100 caracteres.',
      'any.required': 'El nombre del destino es obligatorio.',
    }),

  city: Joi.string().trim().min(2).max(100).required()
    .messages({
      'string.empty': 'El nombre de la ciudad no puede estar vacío.',
      'string.min': 'El nombre de la ciudad debe tener al menos 2 caracteres.',
      'string.max': 'El nombre de la ciudad no puede tener más de 100 caracteres.',
      'any.required': 'El nombre de la ciudad es obligatorio.',
    }),

  code: Joi.string().trim().alphanum().min(2).max(10).required()
    .messages({
      'string.empty': 'El código del destino no puede estar vacío.',
      'string.alphanum': 'El código del destino solo puede contener letras y números.',
      'string.min': 'El código del destino debe tener al menos 2 caracteres.',
      'string.max': 'El código del destino no puede tener más de 10 caracteres.',
      'any.required': 'El código del destino es obligatorio.',
    }),
});

export default destinationValidator;
