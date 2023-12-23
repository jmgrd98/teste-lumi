import { Request, Response } from 'express';
import * as FaturaService from '../services/faturaService';

export async function getAllFaturas(req: Request, res: Response) {
    try {
        const faturas = await FaturaService.getAllFaturas();
        res.json(faturas);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export async function getFaturaById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const fatura = await FaturaService.getFaturaById(id);
        if (fatura) {
            res.json(fatura);
        } else {
            res.status(404).send('Fatura not found');
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}

export async function getFaturaByNumeroCliente(req: Request, res: Response) {
    try {
        const numeroCliente = req.params.numero_cliente;
        const fatura = await FaturaService.findByNumeroCliente(numeroCliente);
        if (fatura.length > 0) {
            res.json(fatura);
        } else {
            res.status(404).send('Fatura not found for the given Numero Cliente');
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}
