import Joi from 'joi';

const userValidator = Joi.object({
  name: Joi.string().min(1).required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.',
      'string.empty': 'El nombre no puede estar vacío.',
      'any.required': 'El nombre es obligatorio.',
    }),

  lastname: Joi.string().min(1).required()
    .messages({
      'string.base': 'El apellido debe ser una cadena de texto.',
      'string.empty': 'El apellido no puede estar vacío.',
      'any.required': 'El apellido es obligatorio.',
    }),

  phone: Joi.string().pattern(/^[0-9]{10}$/).required()
    .messages({
      'string.base': 'El teléfono debe ser una cadena de texto.',
      'string.empty': 'El teléfono no puede estar vacío.',
      'string.pattern.base': 'El teléfono debe tener exactamente 10 dígitos.',
      'any.required': 'El teléfono es obligatorio.',
    }),

  dni: Joi.string().pattern(/^[0-9]{8}$/).required()
    .messages({
      'string.base': 'El DNI debe ser una cadena de texto.',
      'string.empty': 'El DNI no puede estar vacío.',
      'string.pattern.base': 'El DNI debe tener exactamente 8 dígitos.',
      'any.required': 'El DNI es obligatorio.',
    }),

  email: Joi.string().email().required()
    .messages({
      'string.base': 'El correo electrónico debe ser una cadena de texto.',
      'string.empty': 'El correo electrónico no puede estar vacío.',
      'string.email': 'El correo electrónico no es válido.',
      'any.required': 'El correo electrónico es obligatorio.',
    }),

  password: Joi.string().min(6).required()
    .messages({
      'string.base': 'La contraseña debe ser una cadena de texto.',
      'string.empty': 'La contraseña no puede estar vacía.',
      'string.min': 'La contraseña debe tener al menos 6 caracteres.',
      'any.required': 'La contraseña es obligatoria.',
    }),

  role: Joi.string().valid('USER', 'ADMIN').default('USER')
    .messages({
      'string.base': 'El rol debe ser una cadena de texto.',
      'any.only': 'El rol debe ser "USER" o "ADMIN".',
    }),

  miles_balance: Joi.number().min(0).default(0)
    .messages({
      'number.base': 'El saldo de millas debe ser un número.',
      'number.min': 'El saldo de millas no puede ser negativo.',
    }),
});

export default userValidator;
