# Static Data Analysis - Nizamia Apparel Project

## Overview
This document identifies all remaining static/hardcoded data in the project and provides SQL queries to make it fully dynamic.

---

## 1. STATIC DATA FOUND IN PROJECT

### A. In App.tsx
- **INITIAL_USERS**: Administrator user (ShafayH)
- **INITIAL_MONTHLY_TARGETS**: 12 months of sales and volume targets
- **DEFAULT_SALES_TERMS**: Long contract terms text
- **DEFAULT_PO_TERMS**: Purchase order terms text
- **enabledCities**: ['London', 'New York', 'Dubai']

### B. In SettingsDashboard.tsx
- **INITIAL_USERS**: Duplicate admin user definition
- **AVAILABLE_CITIES**: List of 9 cities

### C. In ResourcesDashboard.tsx
- **THREAD_OPERATIONS**: Object with thread operation categories
- **MACHINE_FACTORS**: Lookup table for machine types and their factors
- **GARMENT_TEMPLATES**: Pre-configured garment production templates

### D. In constants.ts
- **LOGO_URL**: Company logo URL
- **NAV_ITEMS**: Navigation menu items (Frontend only - OK to keep)
- **PRODUCTION_TOOLS**: Production module tools (Frontend only - OK to keep)

### E. In FinishingTab.tsx
- **INITIAL_INSTRUCTION**: Packing instruction template

### F. In ProcessPlanGenerator.tsx
- **DEFAULT_STEPS**: Default process steps

### G. In ProductionFlowDashboard.tsx
- **productionLines**: ['Line 1', 'Line 2', 'Line 3']

### H. In CostingDashboard.tsx
- **MOCK_COSTING_RECORDS**: Empty array (OK)

---

## 2. DATABASE SCHEMA ADDITIONS NEEDED

Add these new tables to your Prisma schema:

```prisma
// Settings and Configuration
model CompanySettings {
  id             String   @id @default(uuid())
  organizationId String
  taxRate        Float?
  cottonRate     Float?
  currencyRates  String?  // JSON string: {"USD": 1, "EUR": 0.92, "GBP": 0.79}
  lastUpdated    DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model SalesTerms {
  id             String   @id @default(uuid())
  organizationId String
  name           String   // e.g., "Default Sales Terms", "Bulk Order Terms"
  content        String   @db.Text
  isDefault      Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model POTerms {
  id             String   @id @default(uuid())
  organizationId String
  name           String
  content        String   @db.Text
  isDefault      Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model MonthlyTarget {
  id             String   @id @default(uuid())
  organizationId String
  month          String
  salesTarget    Float
  volumeTarget   Float
  year           Int      @default(2026)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  
  @@unique([organizationId, month, year])
}

model Location {
  id             String   @id @default(uuid())
  organizationId String
  name           String   @unique
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model ThreadOperation {
  id             String   @id @default(uuid())
  organizationId String
  category       String   // e.g., "Tops", "Bottoms", "Universal"
  name           String   // e.g., "Front Rise", "Shoulder Join"
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model MachineFactor {
  id             String   @id @default(uuid())
  organizationId String
  machineType    String   @unique // e.g., "Lockstitch", "Overlock / Serger"
  factor         Float    // e.g., 2.5, 3.5
  description    String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model GarmentTemplate {
  id             String   @id @default(uuid())
  organizationId String
  name           String   // e.g., "Jeans", "Jacket", "Shirt"
  description    String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model GarmentTemplateStep {
  id             String   @id @default(uuid())
  templateId     String
  template       GarmentTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade)
  stepOrder      Int
  operation      String
  machineType    String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model ProductionLine {
  id             String   @id @default(uuid())
  organizationId String
  name           String
  description    String?
  isActive       Boolean  @default(true)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model PackingInstruction {
  id             String   @id @default(uuid())
  organizationId String
  name           String
  content        String   @db.Text
  isDefault      Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model ProcessStep {
  id             String   @id @default(uuid())
  organizationId String
  name           String
  description    String?
  sequenceOrder  Int
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

---

## 3. SQL QUERIES TO INSERT INITIAL DATA

Run these queries to populate your database:

### A. Sales Terms
```sql
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
```

### B. PO Terms
```sql
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
```

### C. Monthly Targets (2026)
```sql
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
```

### D. Locations
```sql
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
```

### E. Thread Operations
```sql
INSERT INTO "ThreadOperation" (id, "organizationId", category, name, "createdAt", "updatedAt")
VALUES
  ('top-001', 'default-org', 'Tops', 'Shoulder Join', NOW(), NOW()),
  ('top-002', 'default-org', 'Tops', 'Side Seam', NOW(), NOW()),
  ('top-003', 'default-org', 'Tops', 'Sleeve Join', NOW(), NOW()),
  ('top-004', 'default-org', 'Tops', 'Collar Attach', NOW(), NOW()),
  ('top-005', 'default-org', 'Tops', 'Cuff Attach', NOW(), NOW()),
  ('top-006', 'default-org', 'Tops', 'Placket', NOW(), NOW()),
  ('top-007', 'default-org', 'Tops', 'Hem (Top/Jacket)', NOW(), NOW()),
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
  ('uni-001', 'default-org', 'Universal', 'Overlock Edge', NOW(), NOW()),
  ('uni-002', 'default-org', 'Universal', 'Topstitch', NOW(), NOW()),
  ('uni-003', 'default-org', 'Universal', 'Bartack', NOW(), NOW()),
  ('uni-004', 'default-org', 'Universal', 'Decorative Stitch', NOW(), NOW()),
  ('uni-005', 'default-org', 'Universal', 'Reinforcement Stitch', NOW(), NOW());
```

### F. Machine Factors
```sql
INSERT INTO "MachineFactor" (id, "organizationId", "machineType", factor, description, "createdAt", "updatedAt")
VALUES
  ('mf-001', 'default-org', 'Lockstitch', 2.5, 'Standard lockstitch machine', NOW(), NOW()),
  ('mf-002', 'default-org', 'Overlock / Serger', 3.5, 'Overlock/serger machine', NOW(), NOW()),
  ('mf-003', 'default-org', 'Double Needle', 4.0, 'Double needle machine', NOW(), NOW()),
  ('mf-004', 'default-org', 'Coverstitch', 4.0, 'Coverstitch machine', NOW(), NOW()),
  ('mf-005', 'default-org', 'Flatlock', 4.5, 'Flatlock machine', NOW(), NOW()),
  ('mf-006', 'default-org', 'Bartack', 10.0, 'Bartack machine', NOW(), NOW()),
  ('mf-007', 'default-org', 'Zigzag', 2.8, 'Zigzag machine', NOW(), NOW());
```

### G. Garment Templates
```sql
INSERT INTO "GarmentTemplate" (id, "organizationId", name, description, "createdAt", "updatedAt")
VALUES
  ('gt-001', 'default-org', 'Jeans', 'Standard 5-pocket jeans template', NOW(), NOW()),
  ('gt-002', 'default-org', 'Jacket', 'Jacket construction template', NOW(), NOW()),
  ('gt-003', 'default-org', 'Shirt', 'Woven shirt template', NOW(), NOW()),
  ('gt-004', 'default-org', 'Hoodie', 'Knit hoodie template', NOW(), NOW());
```

### H. Garment Template Steps (Jeans)
```sql
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
```

### I. Garment Template Steps (Jacket)
```sql
INSERT INTO "GarmentTemplateStep" (id, "templateId", "stepOrder", operation, "machineType", "createdAt", "updatedAt")
VALUES
  ('gts-011', 'gt-002', 1, 'Shoulder Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-012', 'gt-002', 2, 'Side Seam', 'Overlock / Serger', NOW(), NOW()),
  ('gts-013', 'gt-002', 3, 'Sleeve Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-014', 'gt-002', 4, 'Collar Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-015', 'gt-002', 5, 'Zipper Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-016', 'gt-002', 6, 'Hem (Top/Jacket)', 'Lockstitch', NOW(), NOW()),
  ('gts-017', 'gt-002', 7, 'Pocket Attach', 'Lockstitch', NOW(), NOW());
```

### J. Garment Template Steps (Shirt)
```sql
INSERT INTO "GarmentTemplateStep" (id, "templateId", "stepOrder", operation, "machineType", "createdAt", "updatedAt")
VALUES
  ('gts-018', 'gt-003', 1, 'Shoulder Join', 'Lockstitch', NOW(), NOW()),
  ('gts-019', 'gt-003', 2, 'Side Seam', 'Overlock / Serger', NOW(), NOW()),
  ('gts-020', 'gt-003', 3, 'Sleeve Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-021', 'gt-003', 4, 'Collar Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-022', 'gt-003', 5, 'Cuff Attach', 'Lockstitch', NOW(), NOW()),
  ('gts-023', 'gt-003', 6, 'Placket', 'Lockstitch', NOW(), NOW()),
  ('gts-024', 'gt-003', 7, 'Hem (Top/Jacket)', 'Lockstitch', NOW(), NOW());
```

### K. Garment Template Steps (Hoodie)
```sql
INSERT INTO "GarmentTemplateStep" (id, "templateId", "stepOrder", operation, "machineType", "createdAt", "updatedAt")
VALUES
  ('gts-025', 'gt-004', 1, 'Shoulder Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-026', 'gt-004', 2, 'Side Seam', 'Overlock / Serger', NOW(), NOW()),
  ('gts-027', 'gt-004', 3, 'Sleeve Join', 'Overlock / Serger', NOW(), NOW()),
  ('gts-028', 'gt-004', 4, 'Hood Attach', 'Overlock / Serger', NOW(), NOW()),
  ('gts-029', 'gt-004', 5, 'Pocket Attach', 'Coverstitch', NOW(), NOW()),
  ('gts-030', 'gt-004', 6, 'Hem (Top/Jacket)', 'Coverstitch', NOW(), NOW());
```

### L. Production Lines
```sql
INSERT INTO "ProductionLine" (id, "organizationId", name, description, "isActive", "createdAt", "updatedAt")
VALUES
  ('pl-001', 'default-org', 'Line 1', 'Main production line', true, NOW(), NOW()),
  ('pl-002', 'default-org', 'Line 2', 'Secondary production line', true, NOW(), NOW()),
  ('pl-003', 'default-org', 'Line 3', 'Quality control line', true, NOW(), NOW());
```

### M. Company Settings
```sql
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
```

### N. Packing Instruction
```sql
INSERT INTO "PackingInstruction" (id, "organizationId", name, content, "isDefault", "createdAt", "updatedAt")
VALUES (
  'pi-default-001',
  'default-org',
  'Default Packing Instruction',
  'Standard packing and finishing instructions for all orders. Apply appropriate care labels, size labels, and hang tags as per buyer specifications.',
  true,
  NOW(),
  NOW()
);
```

### O. Process Steps
```sql
INSERT INTO "ProcessStep" (id, "organizationId", name, description, "sequenceOrder", "createdAt", "updatedAt")
VALUES
  ('ps-001', 'default-org', 'Fabric Inspection', 'Inspect incoming fabric for defects', 1, NOW(), NOW()),
  ('ps-002', 'default-org', 'Cutting', 'Cut fabric components according to markers', 2, NOW(), NOW()),
  ('ps-003', 'default-org', 'Dyeing & Washing', 'Apply color treatments as required', 3, NOW(), NOW()),
  ('ps-004', 'default-org', 'Embellishment', 'Add prints, embroidery, or special finishes', 4, NOW(), NOW()),
  ('ps-005', 'default-org', 'Stitching', 'Main garment assembly and seaming', 5, NOW(), NOW()),
  ('ps-006', 'default-org', 'Finishing', 'Hem, attach trims, labels, hangtags', 6, NOW(), NOW()),
  ('ps-007', 'default-org', 'Quality Inspection', 'Final quality check before packing', 7, NOW(), NOW()),
  ('ps-008', 'default-org', 'Packing', 'Bag, box, and prepare for shipment', 8, NOW(), NOW());
```

---

## 4. REMAINING FRONTEND-ONLY DATA (OK to keep as static)

These can remain in constants.ts as they are UI configuration, not business data:
- LOGO_URL
- NAV_ITEMS
- PRODUCTION_TOOLS
- formatAppDate
- parseCSVDate

---

## 5. FILES TO MODIFY (After SQL execution)

### A. Create new API endpoints in server:

**Location endpoints** (`locationsController.js`):
```javascript
export const getLocations = async (req, res) => {
  const locations = await prisma.location.findMany();
  res.json(locations);
};
```

**Settings endpoints** (`settingsController.js`):
```javascript
export const getSettings = async (req, res) => {
  const settings = await prisma.companySettings.findFirst();
  res.json(settings);
};

export const getThreadOperations = async (req, res) => {
  const ops = await prisma.threadOperation.findMany();
  res.json(ops);
};

export const getMachineFactors = async (req, res) => {
  const factors = await prisma.machineFactor.findMany();
  res.json(factors);
};

export const getGarmentTemplates = async (req, res) => {
  const templates = await prisma.garmentTemplate.findMany({
    include: { GarmentTemplateStep: true }
  });
  res.json(templates);
};

export const getProductionLines = async (req, res) => {
  const lines = await prisma.productionLine.findMany();
  res.json(lines);
};

export const getSalesTerms = async (req, res) => {
  const terms = await prisma.salesTerms.findMany();
  res.json(terms);
};

export const getPOTerms = async (req, res) => {
  const terms = await prisma.pOTerms.findMany();
  res.json(terms);
};

export const getMonthlyTargets = async (req, res) => {
  const targets = await prisma.monthlyTarget.findMany();
  res.json(targets);
};
```

### B. Update App.tsx to fetch from API:

```typescript
useEffect(() => {
  if (isAuthenticated) {
    Promise.all([
      api.getOrders(),
      api.getLocations(),
      api.getSettings(),
      api.getMonthlyTargets()
    ]).then(([orders, locations, settings, targets]) => {
      setOrders(orders);
      setEnabledCities(locations.map(l => l.name));
      setMonthlyTargets(targets);
      // ... etc
    }).catch(console.error);
  }
}, [isAuthenticated]);
```

### C. Update ResourcesDashboard to fetch templates:

Remove static `GARMENT_TEMPLATES`, `MACHINE_FACTORS`, `THREAD_OPERATIONS` and fetch from API.

---

## 6. MIGRATION COMMAND

After updating your Prisma schema:

```bash
cd server
npx prisma migrate dev --name add_static_data_tables
npm run seed
```

Then run the SQL queries above in your database to populate initial data.
