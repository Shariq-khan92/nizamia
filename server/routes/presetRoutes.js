import express from 'express';
import { getPresets, createPreset, updatePreset, deletePreset } from '../controllers/presetController.js';

const router = express.Router();

// BOM Preset routes
router.get('/', getPresets);
router.post('/', createPreset);
router.put('/:id', updatePreset);
router.delete('/:id', deletePreset);

export default router;
