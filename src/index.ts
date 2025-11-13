import 'dotenv/config';
import express from 'express';
import phoneRouter from './routes/phoneRouter';
import rechargeRouter from './routes/rechargeRouter';
import { errorHandler } from './middlewares/errorHandlerMiddleware'; // <-- CORREÇÃO AQUI
import connection from './database';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// IMPORTANTE: Montagem dos Routers
app.use('/phones', phoneRouter);
app.use('/recharges', rechargeRouter);

app.use(errorHandler); // <-- E AQUI

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});