-- ============================================================================
-- NIZAMIA APPAREL - STATIC DATA MIGRATION SQL QUERIES
-- ============================================================================
-- Run this file after executing: npx prisma migrate dev
-- These queries populate all the configuration data needed for the application
-- ============================================================================

-- 1. SALES TERMS
-- ============================================================================
INSERT INTO "SalesTerms" (id, "organizationId", name, content, "isDefault", "createdAt", "updatedAt")
VALUES (
  'st-default-001',
  'default-org',
  'Default Sales Terms',
  '1. PRODUCTION START: Lead times begin only after (a) receipt of deposit/LC and (b) written approval of all Pre-Production (PP) samples and lab dips.

2. DELAYS: Any delay in Buyer approvals or payment will result in an automatic day-for-day extension of the shipment date. Factory is not liable for delays caused by the Buyer.

3. TOLERANCE: A quantity tolerance of +/- 5% is reserved. The Buyer agrees to accept and pay for the actual quantity produced within this range.

4. PRICE VALIDITY: Prices are based on current material costs. Factory reserves the right to renegotiate unit prices if the Buyer delays production by more than 45 days.

5. AIR FREIGHT: If shipment is delayed due to Buyer''s late approvals, any resulting air freight or expedited shipping costs shall be paid by the Buyer.

6. CLAIMS: Quality/quantity claims must be submitted within 15 days of port arrival. No claims accepted after goods are processed or sold. Total liability for any claim shall not exceed the original invoice value of the goods.

7. OWNERSHIP: Goods remain Factory property until full payment is received. Factory reserves the right to resell de-branded goods in the event of non-payment or cancellation.

8. FORCE MAJEURE: Factory is not liable for delays caused by strikes, power shortages, natural disasters, or other events beyond its reasonable control.

9. JURISDICTION: This contract is governed by the laws of Karachi, Pakistan.',
  true,
  NOW(),
  NOW()
);

-- 2. PO TERMS
-- ============================================================================
INSERT INTO "POTerms" (id, "organizationId", name, content, "isDefault", "createdAt", "updatedAt")
VALUES (
  'po-default-001',
  'default-org',
  'Default PO Terms',
  '1. Deliveries must be made between 09:00 AM and 05:00 PM (Mon-Sat).
2. Items must strictly adhere to the approved quality samples.
3. Payment will be processed as per credit terms days after GRN.
4. Partial shipments are accepted only with prior written approval.
5. We reserve the right to return non-compliant goods.',
  true,
  NOW(),
  NOW()
);

-- 3. MONTHLY TARGETS (Year 2026)
-- ============================================================================
INSERT INTO "MonthlyTarget" (id, "organizationId", month, "salesTarget", "volumeTarget", year, "createdAt", "updatedAt")
VALUES
  ('mt-001', 'default-org', 'January', 150000, 12000, 2026, NOW(), NOW()),
  ('mt-002', 'default-org', 'February', 140000, 11000, 2026, NOW(), NOW()),
  ('mt-003', 'default-org', 'March', 160000, 13000, 2026, NOW(), NOW()),
  ('mt-004', 'default-org', 'April', 170000, 14000, 2026, NOW(), NOW()),
  ('mt-005', 'default-org', 'May', 180000, 15000, 2026, NOW(), NOW()),
  ('mt-006', 'default-org', 'June', 155000, 12500, 2026, NOW(), NOW()),
  ('mt-007', 'default-org', 'July', 145000, 11500, 2026, NOW(), NOW()),
  ('mt-008', 'default-org', 'August', 150000, 12000, 2026, NOW(), NOW()),
  ('mt-009', 'default-org', 'September', 190000, 16000, 2026, NOW(), NOW()),
  ('mt-010', 'default-org', 'October', 200000, 17000, 2026, NOW(), NOW()),
  ('mt-011', 'default-org', 'November', 210000, 18000, 2026, NOW(), NOW()),
  ('mt-012', 'default-org', 'December', 130000, 10000, 2026, NOW(), NOW());

-- 4. LOCATIONS (Export Destinations)
-- ============================================================================
INSERT INTO "Location" (id, "organizationId", name, "createdAt", "updatedAt")
VALUES
  ('loc-001', 'default-org', 'London', NOW(), NOW()),
  ('loc-002', 'default-org', 'New York', NOW(), NOW()),
  ('loc-003', 'default-org', 'Los Angeles', NOW(), NOW()),
  ('loc-004', 'default-org', 'Barcelona', NOW(), NOW()),
  ('loc-005', 'default-org', 'Dubai', NOW(), NOW()),
  ('loc-006', 'default-org', 'Istanbul', NOW(), NOW()),
  ('loc-007', 'default-org', 'Melbourne', NOW(), NOW()),
  ('loc-008', 'default-org', 'Tokyo', NOW(), NOW()),
  ('loc-009', 'default-org', 'Paris', NOW(), NOW());

-- 5. THREAD OPERATIONS (By Category)
-- ============================================================================
INSERT INTO "ThreadOperation" (id, "organizationId", category, name, "createdAt", "updatedAt")
VALUES
  -- TOPS CATEGORY
  ('top-001', 'default-org', 'Tops', 'Shoulder Join', NOW(), NOW()),
  ('top-002', 'default-org', 'Tops', 'Side Seam', NOW(), NOW()),
  ('top-003', 'default-org', 'Tops', 'Sleeve Join', NOW(), NOW()),
  ('top-004', 'default-org', 'Tops', 'Collar Attach', NOW(), NOW()),
  ('top-005', 'default-org', 'Tops', 'Cuff Attach', NOW(), NOW()),
  ('top-006', 'default-org', 'Tops', 'Placket', NOW(), NOW()),
  ('top-007', 'default-org', 'Tops', 'Hem (Top/Jacket)', NOW(), NOW()),
  -- BOTTOMS CATEGORY
  ('bot-001', 'default-org', 'Bottoms', 'Front Rise', NOW(), NOW()),
  ('bot-002', 'default-org', 'Bottoms', 'Back Rise', NOW(), NOW()),
  ('bot-003', 'default-org', 'Bottoms', 'Yoke Join', NOW(), NOW()),
  ('bot-004', 'default-org', 'Bottoms', 'Inseam Join', NOW(), NOW()),
  ('bot-005', 'default-org', 'Bottoms', 'Outseam Join', NOW(), NOW()),
  ('bot-006', 'default-org', 'Bottoms', 'Waistband Attach', NOW(), NOW()),
  ('bot-007', 'default-org', 'Bottoms', 'Belt Loop Attach', NOW(), NOW()),
  ('bot-008', 'default-org', 'Bottoms', 'Fly Construction', NOW(), NOW()),
  ('bot-009', 'default-org', 'Bottoms', 'Hem (Bottoms)', NOW(), NOW()),
  ('bot-010', 'default-org', 'Bottoms', 'Pocket Bags', NOW(), NOW()),
  ('bot-011', 'default-org', 'Bottoms', 'Pocket Facing', NOW(), NOW()),
  -- UNIVERSAL CATEGORY
  ('uni-001', 'default-org', 'Universal', 'Overlock Edge', NOW(), NOW()),
  ('uni-002', 'default-org', 'Universal', 'Topstitch', NOW(), NOW()),
  ('uni-003', 'default-org', 'Universal', 'Bartack', NOW(), NOW()),
  ('uni-004', 'default-org', 'Universal', 'Decorative Stitch', NOW(), NOW()),
  ('uni-005', 'default-org', 'Universal', 'Reinforcement Stitch', NOW(), NOW());

-- 6. MACHINE FACTORS
-- ============================================================================
INSERT INTO "MachineFactor" (id, "organizationId", "machineType", factor, description, "createdAt", "updatedAt")
VALUES
  ('mf-001', 'default-org', 'Lockstitch', 2.5, 'Standard lockstitch machine for basic seams', NOW(), NOW()),
  ('mf-002', 'default-org', 'Overlock / Serger', 3.5, 'Overlock/serger machine for edge finishing', NOW(), NOW()),
  ('mf-003', 'default-org', 'Double Needle', 4.0, 'Double needle machine for topstitching', NOW(), NOW()),
  ('mf-004', 'default-org', 'Coverstitch', 4.0, 'Coverstitch machine for knit finishes', NOW(), NOW()),
  ('mf-005', 'default-org', 'Flatlock', 4.5, 'Flatlock machine for stretch seams', NOW(), NOW()),
  ('mf-006', 'default-org', 'Bartack', 10.0, 'Bartack machine for reinforced areas', NOW(), NOW()),
  ('mf-007', 'default-org', 'Zigzag', 2.8, 'Zigzag machine for elastic attachment', NOW(), NOW());

-- 7. GARMENT TEMPLATES
-- ============================================================================
INSERT INTO "GarmentTemplate" (id, "organizationId", name, description, "createdAt", "updatedAt")
VALUES
  ('gt-001', 'default-org', 'Jeans', '5-pocket denim jeans with standard construction', NOW(), NOW()),
  ('gt-002', 'default-org', 'Jacket', 'Outerwear jacket with collar and sleeves', NOW(), NOW()),
  ('gt-003', 'default-org', 'Shirt', 'Woven button-up dress or casual shirt', NOW(), NOW()),
  ('gt-004', 'default-org', 'Hoodie', 'Knit hoodie with drawstrings and kangaroo pocket', NOW(), NOW());

-- 8. GARMENT TEMPLATE STEPS - JEANS
-- ============================================================================
INSERT INTO "GarmentTemplateStep" (id, "templateId", "stepOrder", operation, "machineType", "createdAt", "updatedAt")
VALUES
  ('gts-001', 'gt-001', 1, 'Front Rise', 'Lockstitch', NOW(), NOW()),
  ('gts-002', 'gt-001', 2, 'Back Rise', 'Double Needle', NOW(), NOW()),
  ('gts-003', 'gt-001', 3, 'Yoke Join', 'Double Needle', NOW(), NOW()),
  ('gts-004', 'gt-001', 4, 'Inseam Join', 'Double Needle', NOW(), NOW()),
  ('gts-005', 'gt-001', 5, 'Outseam Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-006', 'gt-001', 6, 'Waistband Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-007', 'gt-001', 7, 'Fly Construction', 'Lockstitch', NOW(), NOW()),
  ('gts-008', 'gt-001', 8, 'Hem (Bottoms)', 'Lockstitch', NOW(), NOW()),
  ('gts-009', 'gt-001', 9, 'Belt Loop Attach', 'Bartack', NOW(), NOW()),
  ('gts-010', 'gt-001', 10, 'Pocket Attach', 'Lockstitch', NOW(), NOW());

-- 9. GARMENT TEMPLATE STEPS - JACKET
-- ============================================================================
INSERT INTO "GarmentTemplateStep" (id, "templateId", "stepOrder", operation, "machineType", "createdAt", "updatedAt")
VALUES
  ('gts-011', 'gt-002', 1, 'Shoulder Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-012', 'gt-002', 2, 'Side Seam', 'Overlock / Serger', NOW(), NOW()),
  ('gts-013', 'gt-002', 3, 'Sleeve Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-014', 'gt-002', 4, 'Collar Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-015', 'gt-002', 5, 'Zipper Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-016', 'gt-002', 6, 'Hem (Top/Jacket)', 'Lockstitch', NOW(), NOW()),
  ('gts-017', 'gt-002', 7, 'Pocket Attach', 'Lockstitch', NOW(), NOW());

-- 10. GARMENT TEMPLATE STEPS - SHIRT
-- ============================================================================
INSERT INTO "GarmentTemplateStep" (id, "templateId", "stepOrder", operation, "machineType", "createdAt", "updatedAt")
VALUES
  ('gts-018', 'gt-003', 1, 'Shoulder Join', 'Lockstitch', NOW(), NOW()),
  ('gts-019', 'gt-003', 2, 'Side Seam', 'Overlock / Serger', NOW(), NOW()),
  ('gts-020', 'gt-003', 3, 'Sleeve Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-021', 'gt-003', 4, 'Collar Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-022', 'gt-003', 5, 'Cuff Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-023', 'gt-003', 6, 'Placket', 'Lockstitch', NOW(), NOW()),
  ('gts-024', 'gt-003', 7, 'Hem (Top/Jacket)', 'Lockstitch', NOW(), NOW());

-- 11. GARMENT TEMPLATE STEPS - HOODIE
-- ============================================================================
INSERT INTO "GarmentTemplateStep" (id, "templateId", "stepOrder", operation, "machineType", "createdAt", "updatedAt")
VALUES
  ('gts-025', 'gt-004', 1, 'Shoulder Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-026', 'gt-004', 2, 'Side Seam', 'Overlock / Serger', NOW(), NOW()),
  ('gts-027', 'gt-004', 3, 'Sleeve Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-028', 'gt-004', 4, 'Hood Attach', 'Overlock / Serger', NOW(), NOW()),
  ('gts-029', 'gt-004', 5, 'Pocket Attach', 'Coverstitch', NOW(), NOW()),
  ('gts-030', 'gt-004', 6, 'Hem (Top/Jacket)', 'Coverstitch', NOW(), NOW());

-- 12. PRODUCTION LINES
-- ============================================================================
INSERT INTO "ProductionLine" (id, "organizationId", name, description, "isActive", "createdAt", "updatedAt")
VALUES
  ('pl-001', 'default-org', 'Line 1', 'Main production line for bulk orders', true, NOW(), NOW()),
  ('pl-002', 'default-org', 'Line 2', 'Secondary production line for special orders', true, NOW(), NOW()),
  ('pl-003', 'default-org', 'Line 3', 'Quality control and sample production line', true, NOW(), NOW());

-- 13. COMPANY SETTINGS
-- ============================================================================
INSERT INTO "CompanySettings" (id, "organizationId", "taxRate", "cottonRate", "currencyRates", "lastUpdated", "createdAt", "updatedAt")
VALUES (
  'cs-default-001',
  'default-org',
  18.0,
  150.00,
  '{"USD": 278.50, "EUR": 286.75, "GBP": 352.00}',
  NOW(),
  NOW(),
  NOW()
);

-- 14. PACKING INSTRUCTION
-- ============================================================================
INSERT INTO "PackingInstruction" (id, "organizationId", name, content, "isDefault", "createdAt", "updatedAt")
VALUES (
  'pi-default-001',
  'default-org',
  'Default Packing Instruction',
  'Standard packing and finishing instructions for all orders:
- Apply appropriate care labels on all garments
- Attach size labels and brand labels as per buyer specifications
- Use hang tags provided by buyer
- Fold garments according to buyer standards
- Place in polybags with tissue paper
- Pack in cartons with cushioning material
- Apply barcodes and shipping labels
- Ensure carton weight does not exceed 30kg per carton',
  true,
  NOW(),
  NOW()
);

-- 15. PROCESS STEPS
-- ============================================================================
INSERT INTO "ProcessStep" (id, "organizationId", name, description, "sequenceOrder", "createdAt", "updatedAt")
VALUES
  ('ps-001', 'default-org', 'Fabric Inspection', 'Inspect incoming fabric for defects, color variations, and quality standards', 1, NOW(), NOW()),
  ('ps-002', 'default-org', 'Cutting', 'Cut fabric components according to approved markers and specifications', 2, NOW(), NOW()),
  ('ps-003', 'default-org', 'Dyeing & Washing', 'Apply color treatments, washing, or special finishes as required', 3, NOW(), NOW()),
  ('ps-004', 'default-org', 'Embellishment', 'Add prints, embroidery, buttons, or other special finishes', 4, NOW(), NOW()),
  ('ps-005', 'default-org', 'Stitching', 'Main garment assembly, seaming, and construction', 5, NOW(), NOW()),
  ('ps-006', 'default-org', 'Finishing', 'Hem attachment, trim addition, label and hangtag attachment', 6, NOW(), NOW()),
  ('ps-007', 'default-org', 'Quality Inspection', 'Final quality check, measurement verification, and defect inspection', 7, NOW(), NOW()),
  ('ps-008', 'default-org', 'Packing', 'Bagging, boxing, and preparation for shipment', 8, NOW(), NOW());

-- ============================================================================
-- END OF DATA MIGRATION
-- ============================================================================
-- Verify data insertion with:
-- SELECT COUNT(*) FROM "Location";
-- SELECT COUNT(*) FROM "MachineFactor";
-- SELECT COUNT(*) FROM "GarmentTemplate";
-- SELECT COUNT(*) FROM "ProductionLine";
-- ============================================================================
