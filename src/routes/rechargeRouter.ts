import { Router, Request, Response, NextFunction } from 'express';
import { rechargeService } from '../services/rechargeService';
import { findAllRecharges, getRechargesSummary } from '../repositories/rechargeRepository';
import { validateSchema } from '../middlewares/validationMiddleware';
import { rechargeSchema } from '../schemas/rechargeSchema';


const rechargeRouter = Router();

// ROTA CORRIGIDA: Usa '/' para que a rota final seja POST /recharges
rechargeRouter.post('/', validateSchema(rechargeSchema.create), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rechargeData = req.body;
        const newRecharge = await rechargeService.createRecharge(rechargeData);
        return res.status(201).send(newRecharge);
    } catch (error) {
        return next(error);
    }
});

// ROTA CORRIGIDA: Usa '/' para que a rota final seja GET /recharges
rechargeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recharges = await findAllRecharges();
        return res.status(200).send(recharges);
    } catch (error) {
        return next(error);
    }
});

// ROTA CORRIGIDA: A rota /summary está correta, resultando em GET /recharges/summary
rechargeRouter.get('/summary', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const summary = await getRechargesSummary();
        return res.status(200).send(summary);
    } catch (error) {
        return next(error);
    }
});

// ROTA CORRIGIDA: A rota /:phoneNumber está correta, resultando em GET /recharges/:phoneNumber
rechargeRouter.get('/:phoneNumber', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phoneNumber } = req.params;
        const recharges = await rechargeService.listRechargesByPhone(phoneNumber);
        return res.status(200).send(recharges);

    } catch (error) {
        return next(error);
    }
});
export default rechargeRouter;