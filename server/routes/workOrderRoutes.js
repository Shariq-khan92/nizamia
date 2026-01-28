import express from 'express';
import { getWorkOrders, createWorkOrder, updateWorkOrder, deleteWorkOrder } from '../controllers/workOrderController.js';

const router = express.Router();

router.get('/', getWorkOrders);
router.post('/', createWorkOrder);
router.put('/:id', updateWorkOrder);
router.delete('/:id', deleteWorkOrder);

export default router;
