import { Router } from 'express';
import { clientController } from '../controllers/clientController';

const clientRouter = Router();

// A rota deve ser simplesmente /
// Já que você monta o clientRouter na raiz (app.use('/', clientRouter))
clientRouter.post('/', clientController.createClient);

export default clientRouter;