
import express from 'express';
import {
    getCostings,
    getCostingById,
    createCosting,
    updateCosting,
    deleteCosting
} from '../controllers/costingController.js';

const router = express.Router();

router.get('/', getCostings);
router.get('/:id', getCostingById);
router.post('/', createCosting);
router.put('/:id', updateCosting);
router.delete('/:id', deleteCosting);

export default router;
