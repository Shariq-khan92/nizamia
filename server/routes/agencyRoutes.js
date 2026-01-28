import express from 'express';
import { getAgencies, createAgency, updateAgency, deleteAgency } from '../controllers/agencyController.js';

const router = express.Router();

// Buying Agency routes
router.get('/', getAgencies);
router.post('/', createAgency);
router.put('/:id', updateAgency);
router.delete('/:id', deleteAgency);

export default router;
