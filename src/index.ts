import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import phoneRouter from './routes/phoneRouter';
import rechargeRouter from './routes/rechargeRouter';
import clientRouter from './routes/clientRouter'; // M
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import connection from './database';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// I
app.use('/phones', phoneRouter);
app.use('/recharges', rechargeRouter);
app.use('/clients', clientRouter); // M

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});