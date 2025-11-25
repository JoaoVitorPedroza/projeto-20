
//import Joi from 'joi';
//import { PhoneRequestDTO, OperatorName } from '../protocols/PhoneProtocol'; // O
import Joi from 'joi';
import { PhoneRequestDTO } from '../protocols/PhoneProtocol';
const VALID_CARRIERS = ["Vivo", "Tim", "Claro", "Oi"];

export const phoneSchema = Joi.object<PhoneRequestDTO>({
    clientDocument: Joi.string()
        .pattern(/^[0-9]{11}$|^[0-9]{14}$/)
        .required()
        .messages({
            'string.pattern.base': 'O documento do cliente deve ser um CPF ou CNPJ válido.',
            'any.required': 'O documento do cliente é obrigatório.'
        }),

    phoneNumber: Joi.string()
        .pattern(/^[0-9]{11}$/) // N
        .required()
        .messages({
            'string.pattern.base': 'O número de telefone deve ter 11 dígitos.',
            'any.required': 'O número de telefone é obrigatório.'
        }),

    carrierName: Joi.string()
        .valid(...VALID_CARRIERS) //U
        .required()
        .messages({
            'any.only': `O nome da operadora deve ser uma das seguintes: ${VALID_CARRIERS.join(', ')}.`,
            'any.required': 'O nome da operadora é obrigatório.'
        }),

    name: Joi.string().max(50).required(),

    description: Joi.string().max(200).optional(),
});