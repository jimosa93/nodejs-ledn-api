
import express, { Request, Response } from "express";
import accountRoutes from './routes/account.routes';
import transactiontRoutes from './routes/transaction.routes';

const app = express();
app.use(express.json());

app.use('/account', accountRoutes)
app.use('/transaction', transactiontRoutes)
app.use("/", (req: Request, res: Response) => res.json({message: 'something'}));

export default app;