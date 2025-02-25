import Joi from 'joi';

const routeValidator = Joi.object({
  name: Joi.string().min(3).required()
    .messages({
      'string.base': 'El nombre de la ruta debe ser una cadena de texto.',
      'string.empty': 'El nombre de la ruta no puede estar vacío.',
      'string.min': 'El nombre de la ruta debe tener al menos 3 caracteres.',
      'any.required': 'El nombre de la ruta es obligatorio.',
    }),

  stops: Joi.array().items(
    Joi.object({
      name: Joi.string().min(3).required()
        .messages({
          'string.base': 'El nombre de la parada debe ser una cadena de texto.',
          'string.empty': 'El nombre de la parada no puede estar vacío.',
          'string.min': 'El nombre de la parada debe tener al menos 3 caracteres.',
          'any.required': 'El nombre de la parada es obligatorio.',
        }),

      location: Joi.object({
        lat: Joi.number().required()
          .messages({
            'number.base': 'La latitud debe ser un número.',
            'any.required': 'La latitud es obligatoria.',
          }),

        lng: Joi.number().required()
          .messages({
            'number.base': 'La longitud debe ser un número.',
            'any.required': 'La longitud es obligatoria.',
          }),
      }).required()
    })
  ).required()
    .messages({
      'array.base': 'Las paradas deben ser un arreglo.',
      'any.required': 'Las paradas son obligatorias.',
    }),
});

export default routeValidator;
