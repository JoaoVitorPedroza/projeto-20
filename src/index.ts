import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import phoneRouter from './routes/phoneRouter';
import rechargeRouter from './routes/rechargeRouter'; // Mantido: Importa o roteador de recargas
// Linha clientRouter removida
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import connection from './database';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// IMPORTANTE: Montagem dos Routers
app.use('/phones', phoneRouter);
app.use('/recharges', rechargeRouter); // Rota /recharges

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});