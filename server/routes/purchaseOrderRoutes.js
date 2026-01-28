import express from 'express';
import { getPurchaseOrders, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } from '../controllers/purchaseOrderController.js';

const router = express.Router();

router.get('/', getPurchaseOrders);
router.post('/', createPurchaseOrder);
router.put('/:id', updatePurchaseOrder);
router.delete('/:id', deletePurchaseOrder);

export default router;
