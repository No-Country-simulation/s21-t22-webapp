import Joi from 'joi';

const discountValidator = Joi.object({
  name: Joi.string().trim().min(3).max(100).required()
    .messages({
      'string.empty': 'El nombre del descuento no puede estar vacío.',
      'string.min': 'El nombre del descuento debe tener al menos 3 caracteres.',
      'string.max': 'El nombre del descuento no puede tener más de 100 caracteres.',
      'any.required': 'El nombre del descuento es obligatorio.',
    }),

  description: Joi.string().trim().max(500).optional()
    .messages({
      'string.max': 'La descripción del descuento no puede tener más de 500 caracteres.',
    }),

  miles_required: Joi.number().integer().min(0).required()
    .messages({
      'number.base': 'Los millas requeridas deben ser un número entero.',
      'number.min': 'Las millas requeridas no pueden ser negativas.',
      'any.required': 'Las millas requeridas son obligatorias.',
    }),

  discount_type: Joi.string().valid('PERCENTAGE', 'FIXED_AMOUNT').required()
    .messages({
      'any.only': 'El tipo de descuento debe ser "PERCENTAGE" o "FIXED_AMOUNT".',
      'any.required': 'El tipo de descuento es obligatorio.',
    }),

  value: Joi.number().precision(2).min(0).required()
    .messages({
      'number.base': 'El valor del descuento debe ser un número.',
      'number.min': 'El valor del descuento no puede ser negativo.',
      'any.required': 'El valor del descuento es obligatorio.',
    }),

  status: Joi.string().valid('ACTIVE', 'EXPIRED', 'DISABLED').required()
    .messages({
      'any.only': 'El estado del descuento debe ser "ACTIVE", "EXPIRED" o "DISABLED".',
      'any.required': 'El estado del descuento es obligatorio.',
    }),
});

export default discountValidator;
