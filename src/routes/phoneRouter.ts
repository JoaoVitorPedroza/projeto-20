import { Router, Request, Response, NextFunction } from 'express';
import { phoneService } from '../services/phoneService';
import { validateSchema } from '../middlewares/validationMiddleware';
import { phoneSchema } from '../schemas/phoneSchema';

const phoneRouter = Router();

// ----------------------------------------------------------------------
// ROTA: Listar todos os telefones (GET /phones)
// ----------------------------------------------------------------------

// Rota: GET / (Resolve para GET /phones)
phoneRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phones = await phoneService.listAllPhones();
        return res.status(200).send(phones);
    } catch (error) {
        return next(error);
    }
});

// ----------------------------------------------------------------------
// ROTA: Cadastro de telefone (POST /phones)
// ----------------------------------------------------------------------

// Rota: POST / (Resolve para POST /phones)
phoneRouter.post('/', validateSchema(phoneSchema.create), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phoneData = req.body;
        const newPhone = await phoneService.createPhone(phoneData);
        return res.status(201).send(newPhone);
    } catch (error) {
        return next(error);
    }
});

// ----------------------------------------------------------------------
// REQUISITO 3: Excluir Telefone (DELETE /phones/:phoneNumber)
// ----------------------------------------------------------------------

// Rota: DELETE /:phoneNumber (Resolve para DELETE /phones/:phoneNumber)
phoneRouter.delete('/:phoneNumber', async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.params;

    try {
        await phoneService.removePhoneByNumber(phoneNumber);
        // Sucesso na exclusão
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

// ----------------------------------------------------------------------
// REQUISITO 4: Listar por Documento (GET /phones/client/:document)
// ----------------------------------------------------------------------

// Rota: GET /client/:document (Resolve para GET /phones/client/:document)
phoneRouter.get('/client/:document', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { document } = req.params;

        const phones = await phoneService.listPhonesByClientDocument(document);

        // Retorna 200 com array vazio se nada for encontrado
        return res.status(200).send(phones);

    } catch (error) {
        return next(error);
    }
});


export default phoneRouter;