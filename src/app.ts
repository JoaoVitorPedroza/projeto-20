// src/app.ts

import express from 'express'; // <--- ESTA LINHA É ESSENCIAL
import 'dotenv/config';

// Importar Middlewares e Rotas
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import phoneRouter from './routes/phoneRouter';

const app = express();

app.use(express.json());


app.use(phoneRouter);

app.use(errorHandlerMiddleware);

export default app;