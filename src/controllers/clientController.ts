import { Request, Response, NextFunction } from 'express';

import * as phoneService from '../services/phoneService';

export const clientController = {
    /**
     * @description
     *  Listagem dos telefones de um cliente /:document
     */
    async listPhonesByDocument(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { document } = req.params;

        try {

            const phones = await phoneService.listPhonesByClientDocument(document);

            return res.status(200).send(phones);
        } catch (error) {
            next(error);
        }
    },

    /**
     * @description
     *
     */
    async deleteClient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { document } = req.params;

        try {

            await phoneService.deleteClient(document);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};