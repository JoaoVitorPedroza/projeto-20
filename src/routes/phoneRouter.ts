// src/routes/phoneRouter.ts

import { Router } from 'express';
import { phoneController } from '../controllers/phoneController';
import { validateSchema } from '../middlewares/validationMiddleware';
import { phoneSchema } from '../schemas/phoneSchema';
import { asyncWrapper } from '../utils/asyncWrapper';
const phoneRouter = Router();
phoneRouter.post(
  '/phones',
  validateSchema(phoneSchema),
  asyncWrapper(phoneController.createPhone)
);

phoneRouter.get(
  '/phones',
  asyncWrapper(phoneController.getPhones)
);

export default phoneRouter;