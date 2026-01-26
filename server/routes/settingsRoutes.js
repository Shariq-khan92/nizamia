import express from 'express';
import {
  getSettings, updateSettings,
  getLocations, updateLocations,
  getSalesTerms, getPOTerms,
  getThreadOperations, getMachineFactors, getGarmentTemplates,
  getProductionLines, getMonthlyTargets, updateMonthlyTargets,
  getPackingInstructions, getProcessSteps,
  updateCompanyDetails
} from '../controllers/settingsController.js';

const router = express.Router();

// Settings routes
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Locations routes
router.get('/locations', getLocations);
router.put('/locations', updateLocations);

// Terms routes
router.get('/sales-terms', getSalesTerms);
router.get('/po-terms', getPOTerms);

// Thread operations routes
router.get('/thread-operations', getThreadOperations);
router.get('/machine-factors', getMachineFactors);
router.get('/garment-templates', getGarmentTemplates);

// Production routes
router.get('/production-lines', getProductionLines);

// Monthly targets routes
router.get('/monthly-targets', getMonthlyTargets);
router.put('/monthly-targets', updateMonthlyTargets);

// Packing instructions routes
router.get('/packing-instructions', getPackingInstructions);

// Process steps routes
router.get('/process-steps', getProcessSteps);

// Company details routes
router.put('/company-details', updateCompanyDetails);

export default router;
