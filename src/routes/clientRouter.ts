import { Router } from 'express';
import { clientController } from '../controllers/clientController';

const clientRouter = Router();

// Rota de listagem de telefones por documento do cliente
clientRouter.get('/:document', clientController.listPhonesByDocument);

export default clientRouter;