import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 8080;
const prisma = new PrismaClient();

// Route for getting all faturas
app.get('/', async (req: Request, res: Response) => {
    try {
        const faturas = await prisma.faturas.findMany();
        res.json(faturas);
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

// Route for getting a single fatura by id
app.get('/fatura/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }

    try {
        const fatura = await prisma.faturas.findUnique({
            where: { id: id }
        });

        if (fatura) {
            res.json(fatura);
        } else {
            res.status(404).send('Fatura not found');
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

// Route for getting a fatura by numero_cliente
app.get('/fatura/cliente/:numero_cliente', async (req: Request, res: Response) => {
    const numero_cliente = req.params.numero_cliente;

    try {
        const fatura = await prisma.faturas.findFirst({
            where: { numero_cliente: numero_cliente }
        });

        if (fatura) {
            res.json(fatura);
        } else {
            res.status(404).send('Fatura not found');
        }
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
