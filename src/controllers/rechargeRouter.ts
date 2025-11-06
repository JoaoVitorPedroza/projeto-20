import { Router } from 'express';
import { rechargeController } from '../controllers/rechargeController';

const rechargeRouter = Router();

// Rota POST para criar uma nova recarga
rechargeRouter.post('/recharges', rechargeController.createRecharge);

// Rota GET para listar o histórico de recargas de um telefone (via query parameter)
rechargeRouter.get('/recharges', rechargeController.getRecharges);

// Rota GET para o resumo geral
rechargeRouter.get('/summary', rechargeController.getSummary);

export default rechargeRouter;