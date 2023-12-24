import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import faturaRoutes from './routes/faturaRoutes';

const app = express();
const port = 8080;

app.use(cors());

app.use('/faturas', faturaRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});