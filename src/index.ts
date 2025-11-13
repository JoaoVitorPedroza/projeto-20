import 'dotenv/config';
import express from 'express';
import 'express-async-errors'; // Adicionado para tratar erros assíncronos
import phoneRouter from './routes/phoneRouter';
import rechargeRouter from './routes/rechargeRouter';
import clientRouter from './routes/clientRouter'; // <-- NOVO: Importa o roteador de clientes
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import connection from './database';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// IMPORTANTE: Montagem dos Routers
// CORREÇÃO: Monta o clientRouter na rota /clients
app.use('/clients', clientRouter);
app.use('/phones', phoneRouter);
app.use('/recharges', rechargeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});