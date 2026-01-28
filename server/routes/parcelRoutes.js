import express from 'express';
import { getParcels, createParcel, updateParcel, deleteParcel } from '../controllers/parcelController.js';

const router = express.Router();

router.get('/', getParcels);
router.post('/', createParcel);
router.put('/:id', updateParcel);
router.delete('/:id', deleteParcel);

export default router;
