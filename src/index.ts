 // Se estiver usando
import express, { json } from 'express';
import dotenv from 'dotenv';

// Importe todos os seus routers

import phoneRouter from './routes/phoneRouter';
import rechargeRouter from './routes/rechargeRouter'; // <-- NOVO

dotenv.config();

const app = express();
app.use(json());

// Utilize todos os seus routers
app.use(phoneRouter);
app.use(rechargeRouter); // <-- NOVO

// ... (configurações de middleware de erro e listen) ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));