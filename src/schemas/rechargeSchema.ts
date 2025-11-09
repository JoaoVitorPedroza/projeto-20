// src/schemas/rechargeSchema.ts

import Joi from 'joi';

// Define o schema de validação para a criação de uma nova recarga (POST /recharges)
export const rechargeSchema = {
    create: Joi.object({
        // O número de telefone deve ser uma string e é obrigatório
        phoneNumber: Joi.string()
            .required()
            .length(11) // Assumindo DDD + 9 dígitos
            .pattern(/^[0-9]+$/) // Apenas números
            .messages({
                'string.empty': 'O número de telefone é obrigatório.',
                'string.length': 'O número de telefone deve ter 11 dígitos (DDD + 9 dígitos).',
                'string.pattern.base': 'O número de telefone deve conter apenas números.',
                'any.required': 'O número de telefone é obrigatório.',
            }),

        // O valor da recarga deve ser um número, obrigatório e seguir as regras do requisito 5:
        // Mínimo: R$ 10,00
        // Máximo: R$ 1.000,00
        amount: Joi.number()
            .required()
            .min(10.00) // Requisito: Mínimo R$ 10,00
            .max(1000.00) // Requisito: Máximo R$ 1.000,00
            .precision(2) // Garante que aceita apenas duas casas decimais
            .messages({
                'number.base': 'O valor da recarga deve ser um número.',
                'number.min': 'O valor mínimo para recarga é R$ 10,00.',
                'number.max': 'O valor máximo para recarga é R$ 1.000,00.',
                'number.precision': 'O valor deve ter no máximo duas casas decimais.',
                'any.required': 'O valor da recarga é obrigatório.',
            }),
    }),
};