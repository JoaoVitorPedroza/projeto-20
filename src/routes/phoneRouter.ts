// src/routes/phoneRouter.ts

import { Router } from 'express';
import { phoneController } from '../controllers/phoneController';
import { validateSchema } from '../middlewares/validationMiddleware';
import { phoneSchema } from '../schemas/phoneSchema';
const phoneRouter = Router();

phoneRouter.post(
  '/phones',
  validateSchema(phoneSchema),
  phoneController.createPhone
);

export default phoneRouter;