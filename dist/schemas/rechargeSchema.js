"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rechargeSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.rechargeSchema = {
    create: joi_1.default.object({
        // C
        phoneNumber: joi_1.default.string()
            .required()
            .length(11) //D
            .pattern(/^[0-9]+$/)
            .messages({
            'string.empty': 'O número de telefone é obrigatório.',
            'string.length': 'O número de telefone deve ter 11 dígitos (DDD + 9 dígitos).',
            'string.pattern.base': 'O número de telefone deve conter apenas números.',
            'any.required': 'O número de telefone é obrigatório.',
        }),
        amount: joi_1.default.number()
            .required()
            .min(10.00)
            .max(1000.00)
            .precision(2)
            .messages({
            'number.base': 'O valor da recarga deve ser um número.',
            'number.min': 'O valor mínimo para recarga é R$ 10,00.',
            'number.max': 'O valor máximo para recarga é R$ 1.000,00.',
            'number.precision': 'O valor deve ter no máximo duas casas decimais.',
            'any.required': 'O valor da recarga é obrigatório.',
        }),
    })
        // P
        // P
        .unknown(true),
};
