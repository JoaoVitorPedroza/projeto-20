import { Request, Response, NextFunction } from "express";
import { clientRepository } from "../repositories/clientRepository";

export const clientController = {
    async createClient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const clientData = req.body;
            const newClient = await clientRepository.createClient(clientData);
            // Se o cliente já existia, a query retorna null, então garantimos o status 200/201.
            if (newClient) {
                return res.status(201).send(newClient);
            }
            return res.status(200).send({ message: "Cliente já cadastrado." });

        } catch (error) {
            next(error);
        }
    },
};