import 'dotenv/config';
import express from 'express';
import phoneRouter from './routes/phoneRouter';
import rechargeRouter from './routes/rechargeRouter';
// CORREÇÃO: Importação Nomeada
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
// CORREÇÃO: Importa o objeto de conexão do banco de dados (Pool)
import connection from './database';

// Inicializa o app Express
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ------------------------------------------------------------------
// 1. MONTAGEM DOS ROUTERS (Obrigatório antes do listen)
// ------------------------------------------------------------------
app.use('/phones', phoneRouter);
app.use('/recharges', rechargeRouter);

// ------------------------------------------------------------------
// 2. MIDDLEWARE DE ERRO (Obrigatório por último)
// ------------------------------------------------------------------
app.use(errorHandlerMiddleware);

// ------------------------------------------------------------------
// 3. INICIA O SERVIDOR
// ------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});