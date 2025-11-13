import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import phoneRouter from '../routes/phoneRouter';
import rechargeRouter from '../routes/rechargeRouter';
import clientRouter from '../routes/clientRouter'; // <-- NOVO
import { errorHandler } from '../middlewares/errorHandlerMiddleware';

const app = express();
app.use(express.json());

app.use('/', clientRouter); // <-- NOVO: Rota para POST /clients
app.use('/', phoneRouter);
app.use('/', rechargeRouter);

app.use(errorHandler);

export default app;