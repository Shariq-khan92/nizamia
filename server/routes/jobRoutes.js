import express from 'express';
import { getJobs, createJob, updateJob, deleteJob, refreshJob } from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.post('/:id/refresh', refreshJob);

export default router;
