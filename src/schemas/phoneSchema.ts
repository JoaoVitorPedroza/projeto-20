// src/schemas/phoneSchema.ts
import Joi from 'joi';
import { PhoneRequestDTO, OperatorName } from '../protocols/PhoneProtocol'; // OK
const allowedOperators: OperatorName[] = ['Claro', 'Vivo', 'Tim', 'Oi'];
const phoneCreationSchema = Joi.object<PhoneRequestDTO>({
    clientDocument: Joi.string().pattern(/^\d{11,14}$/).required(),
    phoneNumber: Joi.string().pattern(/^\d{10,15}$/).required(),
    carrierName: Joi.string().valid(...allowedOperators).required(),
    name: Joi.string().max(50).required(),
    description: Joi.string().max(255).required(),
});
export const phoneSchema = {
    create: phoneCreationSchema,
};

