import express from 'express';
import { getBuyers, createBuyer, updateBuyer, deleteBuyer } from '../controllers/buyerController.js';

const router = express.Router();

// Buyer routes
router.get('/', getBuyers);
router.post('/', createBuyer);
router.put('/:id', updateBuyer);
router.delete('/:id', deleteBuyer);

export default router;