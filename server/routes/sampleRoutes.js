import express from 'express';
import { getSamples, createSample, updateSample, deleteSample } from '../controllers/sampleController.js';

const router = express.Router();

router.get('/', getSamples);
router.post('/', createSample);
router.put('/:id', updateSample);
router.delete('/:id', deleteSample);

export default router;
