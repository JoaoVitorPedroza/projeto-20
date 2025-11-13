import { Request, Response, NextFunction } from "express";
import { clientRepository } from "../repositories/clientRepository";
import { BadRequestError } from "../utils/errors"; // Importa o erro 400

export const clientController = {
    async createClient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const clientData = req.body;
            const newClient = await clientRepository.createClient(clientData);
           
            // Lógica para duplicação (ON CONFLICT DO NOTHING)
            if (newClient) {
                return res.status(201).send(newClient); // Cliente novo
            }
            return res.status(200).send({ message: "Cliente já cadastrado." }); // Cliente existente

        } catch (error: any) {
            // 🚨 TRATAMENTO DO ERRO 500 (Violacão de NOT NULL - Código PG '23502')
            if (error && error.code === '23502') {
                return next(new BadRequestError("Campos obrigatórios do cliente estão faltando."));
            }

            // Reenvia para o errorHandler global (que retornará 500 para outros erros)
            next(error);
        }
    },
};