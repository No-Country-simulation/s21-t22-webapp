import Joi from 'joi';

const userDiscountValidator = Joi.object({
  user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': 'El ID del usuario debe ser una cadena de texto.',
      'string.empty': 'El ID del usuario no puede estar vacío.',
      'string.pattern.base': 'El ID del usuario debe ser un ObjectId válido.',
      'any.required': 'El ID del usuario es obligatorio.',
    }),

  discount: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': 'El ID del descuento debe ser una cadena de texto.',
      'string.empty': 'El ID del descuento no puede estar vacío.',
      'string.pattern.base': 'El ID del descuento debe ser un ObjectId válido.',
      'any.required': 'El ID del descuento es obligatorio.',
    }),

  redeemed_at: Joi.date().required()
    .messages({
      'date.base': 'La fecha de canje debe ser una fecha válida.',
      'any.required': 'La fecha de canje es obligatoria.',
    }),

  used_at: Joi.date().optional()
    .messages({
      'date.base': 'La fecha de uso debe ser una fecha válida.',
    }),
});

export default userDiscountValidator;
