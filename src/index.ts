
import express, { json } from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { findAllRecharges } from './repositories/rechargeRepository';
import phoneRouter from './routes/phoneRouter';
import rechargeRouter from './routes/rechargeRouter';
dotenv.config();
const app = express();
app.use(json());
app.get('/recharges', async (req: Request, res: Response) => {
    try {
        const recharges = await findAllRecharges();
        return res.status(200).send(recharges);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Erro ao buscar recargas." });
    }
});
app.use(phoneRouter);
app.use(rechargeRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));