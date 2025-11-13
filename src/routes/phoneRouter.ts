import { Router, Request, Response, NextFunction } from 'express';
import { phoneService } from '../services/phoneService';
import { validateSchema } from '../middlewares/validationMiddleware';
import { phoneSchema } from '../schemas/phoneSchema';

const phoneRouter = Router();
phoneRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phones = await phoneService.listAllPhones();
        return res.status(200).send(phones);
    } catch (error) {
        return next(error);
    }
});

phoneRouter.post('/', validateSchema(phoneSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phoneData = req.body;
        const newPhone = await phoneService.createPhone(phoneData);
        return res.status(201).send(newPhone);
    } catch (error) {
        return next(error);
    }
})
phoneRouter.delete('/:phoneNumber', async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.params;

    try {
        await phoneService.removePhoneByNumber(phoneNumber);
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

phoneRouter.get('/client/:document', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { document } = req.params;

        const phones = await phoneService.listPhonesByClientDocument(document);
        return res.status(200).send(phones);

    } catch (error) {
        return next(error);
    }
});


export default phoneRouter;