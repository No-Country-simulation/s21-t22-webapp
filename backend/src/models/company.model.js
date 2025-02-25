import Joi from 'joi';

const companyValidator = Joi.object({
  name: Joi.string().trim().min(2).max(100).required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.',
      'string.empty': 'El nombre no puede estar vacío.',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
      'string.max': 'El nombre no puede superar los {#limit} caracteres.',
      'any.required': 'El nombre de la empresa es obligatorio.',
    }),

  logo_url: Joi.string().uri().optional()
    .messages({
      'string.uri': 'El logo debe ser una URL válida.',
    }),
});

export default companyValidator;
