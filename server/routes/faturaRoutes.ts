import express from 'express';
import * as FaturaController from '../controllers/faturaController';

const router = express.Router();

/**
 * @swagger
 * /faturas:
 *   get:
 *     summary: Retrieve a list of faturas
 *     responses:
 *       200:
 *         description: A list of faturas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fatura'
 */
router.get('/', FaturaController.getAllFaturas);
/**
 * @swagger
 * /faturas/{id}:
 *   get:
 *     summary: Retrieve a single fatura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the fatura to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single fatura.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fatura'
 *       404:
 *         description: Fatura not found.
 */
router.get('/fatura/:id', FaturaController.getFaturaById);
router.get('/cliente/:numero_cliente', FaturaController.getFaturaByNumeroCliente);
router.get('/download/:id', FaturaController.downloadFaturaFile);

export default router;
