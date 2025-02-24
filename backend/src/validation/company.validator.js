import Joi from "joi";

const companyValidator = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'El nombre no puede estar vacíoo.',
            'string.min': 'El nombre debe tener al menos 3 caracteres.',
            'string.max': 'El nombre debe tener como.maxcdn 50 caracteres.',
            'any.required': 'El nombre es requerido.',
        }),
    logo_url: Joi.string()
        .uri()
        .allow('')
        .messages({
            'string.uri': 'La URL del logo debe ser un URL valido.',
            
        }),
});

export default companyValidator;