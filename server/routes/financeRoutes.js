import express from 'express';
import { getExportInvoices, createExportInvoice, updateExportInvoice, deleteExportInvoice } from '../controllers/financeController.js';

const router = express.Router();

// Export Invoice routes
router.get('/', getExportInvoices);
router.post('/', createExportInvoice);
router.put('/:id', updateExportInvoice);
router.delete('/:id', deleteExportInvoice);

export default router;