import { Request, Response, NextFunction } from 'express';
// Importa o phoneService, que contém a lógica para manipulação de telefones E clientes
import * as phoneService from '../services/phoneService';

export const clientController = {
    /**
     * @description Lista todos os telefones de um cliente pelo documento.
     * Requisito: Listagem dos telefones de um cliente /:document
     */
    async listPhonesByDocument(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { document } = req.params;

        try {
            // Utiliza a função existente para listar telefones por documento
            const phones = await phoneService.listPhonesByClientDocument(document);

            return res.status(200).send(phones);
        } catch (error) {
            next(error);
        }
    },

    /**
     * @description Deleta um cliente pelo documento.
     * Chamaremos a função deleteClient, que você precisará implementar no phoneService.
     */
    async deleteClient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { document } = req.params;

        try {
            // **Atenção**: Você precisará adicionar e implementar a função
            // deleteClient no seu phoneService.ts
            await phoneService.deleteClient(document);

            // Retorna 204 No Content para indicar sucesso na exclusão
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};