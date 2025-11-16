import { Router } from 'express';
// Importa o Controller com as duas funções (listagem e exclusão)
import { clientController } from '../controllers/clientController';

const clientRouter = Router();

// 1. Rota de listagem de telefones por documento do cliente (GET)
// Esta rota já estava funcionando, listando os telefones.
clientRouter.get('/:document', clientController.listPhonesByDocument);

// 2. Rota de exclusão do cliente pelo documento (DELETE)
// Esta é a rota que estava faltando e causava o erro 404 Not Found.
clientRouter.delete('/:document', clientController.deleteClient);

export default clientRouter;