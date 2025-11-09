// src/utils/app.ts (Versão Corrigida)

import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import phoneRouter from '../routes/phoneRouter';
import rechargeRouter from '../routes/rechargeRouter';
// Importa seu middleware de erro principal
import { errorHandlerMiddleware } from '../middlewares/errorHandlerMiddleware';
// Não é mais necessário aqui, pois a lógica irá para o middleware importado:
// import { HttpError } from './errors';


const app = express();
app.use(express.json());

// Roteadores
app.use('/', phoneRouter);
app.use('/', rechargeRouter);

// Remova o middleware de erro duplicado!
/*
app.use((err: HttpError | any, req: Request, res: Response, next: NextFunction) => {
    // ... CÓDIGO REMOVIDO DAQUI ...
});
*/

// Middleware ÚNICO de Tratamento de Erros (DEVE SER O ÚLTIMO middleware)
app.use(errorHandlerMiddleware); // Seu middleware importado agora trata HttpError e 500

export default app;