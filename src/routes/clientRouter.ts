import { Router } from 'express';
import { clientController } from '../controllers/clientController';
// Não vamos adicionar validação por Joi agora para manter a simplicidade

const clientRouter = Router();

// Rota para inserir o cliente
clientRouter.post('/clients', clientController.createClient);

export default clientRouter;