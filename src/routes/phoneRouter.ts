// src/routes/phoneRouter.ts

import { Router } from 'express';
import { phoneController } from '../controllers/phoneController';
import { validateSchema } from '../middlewares/validationMiddleware';
import { phoneSchema } from '../schemas/phoneSchema';
// Importe o novo wrapper
import { asyncWrapper } from '../utils/asyncWrapper';

const phoneRouter = Router();

phoneRouter.post(
  '/phones',
  validateSchema(phoneSchema),
  // 🎯 Use o wrapper aqui!
  asyncWrapper(phoneController.createPhone)
);

phoneRouter.get(
  '/phones',
  // 🎯 Use o wrapper aqui!
  asyncWrapper(phoneController.getPhones)
);

export default phoneRouter;