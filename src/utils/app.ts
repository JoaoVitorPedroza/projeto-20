// src/utils/app.ts (Versão Corrigida)

import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import phoneRouter from '../routes/phoneRouter';
import rechargeRouter from '../routes/rechargeRouter';
import { errorHandlerMiddleware } from '../middlewares/errorHandlerMiddleware';
const app = express();
app.use(express.json());

app.use('/', phoneRouter);
app.use('/', rechargeRouter);

app.use(errorHandlerMiddleware); 

export default app;