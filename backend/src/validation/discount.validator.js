import Joi from 'joi';

const discountValidator = Joi.object({
  name: Joi.string().trim().min(3).max(100).required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.',
      'string.empty': 'El nombre no puede estar vacío.',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
      'string.max': 'El nombre no puede superar los {#limit} caracteres.',
      'any.required': 'El nombre del descuento es obligatorio.',
    }),

  description: Joi.string().trim().max(255).optional()
    .messages({
      'string.max': 'La descripción no puede superar los {#limit} caracteres.',
    }),

  miles_required: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'Los millas requeridas deben ser un número.',
      'number.integer': 'Las millas requeridas deben ser un número entero.',
      'number.min': 'Las millas requeridas deben ser al menos {#limit}.',
      'any.required': 'Las millas requeridas son obligatorias.',
    }),

  discount_type: Joi.string().valid('PERCENTAGE', 'FIXED_AMOUNT').required()
    .messages({
      'any.only': 'El tipo de descuento debe ser "PERCENTAGE" o "FIXED_AMOUNT".',
      'any.required': 'El tipo de descuento es obligatorio.',
    }),

  value: Joi.number().precision(2).positive().required()
    .messages({
      'number.base': 'El valor del descuento debe ser un número.',
      'number.positive': 'El valor del descuento debe ser mayor que 0.',
      'number.precision': 'El valor del descuento debe tener hasta 2 decimales.',
      'any.required': 'El valor del descuento es obligatorio.',
    }),

  status: Joi.string().valid('ACTIVE', 'EXPIRED', 'DISABLED').required()
    .messages({
      'any.only': 'El estado debe ser "ACTIVE", "EXPIRED" o "DISABLED".',
      'any.required': 'El estado del descuento es obligatorio.',
    }),
});

export default discountValidator;
