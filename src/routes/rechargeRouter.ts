// src/routes/rechargeRouter.ts (Versão Corrigida)

import { Router, Request, Response, NextFunction } from 'express'; // Importe NextFunction
import { rechargeService } from '../services/rechargeService';
import { findAllRecharges, getRechargesSummary } from '../repositories/rechargeRepository';
import { validateSchema } from '../middlewares/validationMiddleware';
import { rechargeSchema } from '../schemas/rechargeSchema';

const rechargeRouter = Router();

// Rota POST /recharges
// USAR NextFunction AQUI É ESSENCIAL PARA ERROS ASSÍNCRONOS
rechargeRouter.post('/recharges', validateSchema(rechargeSchema.create), async (req: Request, res: Response, next: NextFunction) => {

    // REMOVEMOS O try/catch LOCAL!
    try {
        const rechargeData = req.body;
        const newRecharge = await rechargeService.createRecharge(rechargeData); // Se o service lançar 404, o catch abaixo pega.
        return res.status(201).send(newRecharge);
    } catch (error) {
        // ESSENCIAL: Envia o erro (lançado pelo Service) para o errorHandlerMiddleware global.
        return next(error);
    }
});

// Rota GET /recharges
rechargeRouter.get('/recharges', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recharges = await findAllRecharges();
        return res.status(200).send(recharges);
    } catch (error) {
        return next(error); // CORREÇÃO: Enviar para o middleware global
    }
});

// Rota GET /summary
rechargeRouter.get('/summary', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const summary = await getRechargesSummary();
        return res.status(200).send(summary);
    } catch (error) {
        return next(error); // CORREÇÃO: Enviar para o middleware global
    }
});

rechargeRouter.get('/recharges/:phoneNumber', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phoneNumber } = req.params;

        // Chamada da nova função do Service.
        // Se o telefone não existir, o Service lançará 404, que será pego pelo catch/next.
        const recharges = await rechargeService.listRechargesByPhone(phoneNumber);

        // Retorna 200 OK. Se o array for vazio, é porque não há recargas.
        return res.status(200).send(recharges);

    } catch (error) {
        // Envia o erro (404 Not Found, por exemplo) para o middleware global
        return next(error);
    }
});
export default rechargeRouter;