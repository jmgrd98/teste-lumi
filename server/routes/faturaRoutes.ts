import express from 'express';
import * as FaturaController from '../controllers/faturaController';

const router = express.Router();

router.get('/', FaturaController.getAllFaturas);
router.get('/fatura/:id', FaturaController.getFaturaById);
router.get('/cliente/:numero_cliente', FaturaController.getFaturaByNumeroCliente);

export default router;
