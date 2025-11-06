import { Router } from 'express';
import { rechargeController } from '../controllers/rechargeController';
const rechargeRouter = Router();
rechargeRouter.post('/recharges', rechargeController.createRecharge);
rechargeRouter.get('/recharges', rechargeController.getRecharges);
rechargeRouter.get('/summary', rechargeController.getSummary);
export default rechargeRouter;