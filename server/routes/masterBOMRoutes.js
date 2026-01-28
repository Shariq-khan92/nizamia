import express from 'express';
import { getMasterBOMItems, createMasterBOMItem, updateMasterBOMItem, deleteMasterBOMItem } from '../controllers/masterBOMController.js';

const router = express.Router();

// Master BOM Item routes
router.get('/', getMasterBOMItems);
router.post('/', createMasterBOMItem);
router.put('/:id', updateMasterBOMItem);
router.delete('/:id', deleteMasterBOMItem);

export default router;
