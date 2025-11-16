import { Request, Response, NextFunction } from "express";
import * as phoneService from "../services/phoneService";
import { PhoneRequestDTO } from "../protocols/PhoneProtocol"; // Garante que a tipagem está correta

export const phoneController = {

    async createPhone(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        // O Controller apenas recebe os dados e os repassa
        const phoneData = req.body as PhoneRequestDTO;
        try {
            // O Service é responsável por:
            // 1. Criar o Cliente (regra de negócio)
            // 2. Criar o Telefone
            const newPhone = await phoneService.createPhone(phoneData);
            return res.status(201).send(newPhone);
        } catch (error) {
            next(error);
        }
    },

    async listPhones(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const phones = await phoneService.listAllPhones();
            return res.status(200).send(phones);
        } catch (error) {
            next(error);
        }
    },

    async deletePhone(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { phoneNumber } = req.params;
            await phoneService.removePhoneByNumber(phoneNumber);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};