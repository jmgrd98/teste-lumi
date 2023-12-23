import express from 'express';
import * as FaturaController from '../controllers/faturaController';

const router = express.Router();

router.get('/faturas', FaturaController.getAllFaturas);
router.get('/faturas/:id', FaturaController.getFaturaById);
router.get('/faturas/numeroCliente/:numeroCliente', FaturaController.getFaturaByNumeroCliente);

export default router;
