"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneSchema = void 0;
//import Joi from 'joi';
//import { PhoneRequestDTO, OperatorName } from '../protocols/PhoneProtocol'; // OK
var joi_1 = __importDefault(require("joi"));
var VALID_CARRIERS = ["Vivo", "Tim", "Claro", "Oi"];
exports.phoneSchema = joi_1.default.object({
    clientDocument: joi_1.default.string()
        .pattern(/^[0-9]{11}$|^[0-9]{14}$/)
        .required()
        .messages({
        'string.pattern.base': 'O documento do cliente deve ser um CPF ou CNPJ válido.',
        'any.required': 'O documento do cliente é obrigatório.'
    }),
    phoneNumber: joi_1.default.string()
        .pattern(/^[0-9]{11}$/) // N
        .required()
        .messages({
        'string.pattern.base': 'O número de telefone deve ter 11 dígitos.',
        'any.required': 'O número de telefone é obrigatório.'
    }),
    carrierName: (_a = joi_1.default.string())
        .valid.apply(_a, VALID_CARRIERS).required()
        .messages({
        'any.only': "O nome da operadora deve ser uma das seguintes: ".concat(VALID_CARRIERS.join(', '), "."),
        'any.required': 'O nome da operadora é obrigatório.'
    }),
    name: joi_1.default.string().max(50).required(),
    description: joi_1.default.string().max(200).optional(),
});
