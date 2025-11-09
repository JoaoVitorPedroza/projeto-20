import 'dotenv/config';
import express from 'express';
import phoneRouter from './routes/phoneRouter';
import rechargeRouter from './routes/rechargeRouter';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import connection from './database';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// IMPORTANTE: Montagem dos Routers
app.use('/phones', phoneRouter);
app.use('/recharges', rechargeRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});