import { Request, Response, NextFunction } from 'express';
// O service que lista telefones por cliente está no phoneService
import * as phoneService from '../services/phoneService';
// OBS: Você pode precisar importar o phoneService ou phoneController dependendo de como você exportou.
// Assumindo que você exportou funções em phoneService:

export const clientController = {
    async listPhonesByDocument(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { document } = req.params; // Captura o documento do cliente

        try {
            // Chama a função existente no phoneService
            const phones = await phoneService.listPhonesByClientDocument(document);

            // Retorna a lista de telefones (ou array vazio se não encontrar)
            return res.status(200).send(phones);
        } catch (error) {
            next(error);
        }
    },
};