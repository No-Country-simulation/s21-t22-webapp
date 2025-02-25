import Joi from 'joi';

const companyValidator = Joi.object({
  name: Joi.string().trim().min(3).max(100).required()
    .messages({
      'string.empty': 'El nombre de la empresa no puede estar vacío.',
      'string.min': 'El nombre de la empresa debe tener al menos 3 caracteres.',
      'string.max': 'El nombre de la empresa no puede tener más de 100 caracteres.',
      'any.required': 'El nombre de la empresa es obligatorio.',
    }),

  logo_url: Joi.string().uri().optional()
    .messages({
      'string.uri': 'El logo debe ser una URL válida.',
    }),
});

export default companyValidator;
