import express from 'express';
import {
  getSettings,
  getLocations,
  getSalesTerms,
  getPOTerms,
  getThreadOperations,
  getMachineFactors,
  getGarmentTemplates,
  getProductionLines,
  getMonthlyTargets,
  getPackingInstructions,
  getProcessSteps,
} from '../controllers/settingsController.js';

const router = express.Router();

router.get('/settings', getSettings);
router.get('/locations', getLocations);
router.get('/sales-terms', getSalesTerms);
router.get('/po-terms', getPOTerms);
router.get('/thread-operations', getThreadOperations);
router.get('/machine-factors', getMachineFactors);
router.get('/garment-templates', getGarmentTemplates);
router.get('/production-lines', getProductionLines);
router.get('/monthly-targets', getMonthlyTargets);
router.get('/packing-instructions', getPackingInstructions);
router.get('/process-steps', getProcessSteps);

export default router;
