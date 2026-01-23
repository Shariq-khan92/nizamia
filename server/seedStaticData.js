import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    console.log('Starting static data seeding...');

    // 1. Sales Terms
    await prisma.salesTerms.createMany({
      data: [
        {
          id: 'st-default-001',
          organizationId: 'default-org',
          name: 'Default Sales Terms',
          content: `1. PRODUCTION START: Lead times begin only after (a) receipt of deposit/LC and (b) written approval of all Pre-Production (PP) samples and lab dips.

2. DELAYS: Any delay in Buyer approvals or payment will result in an automatic day-for-day extension of the shipment date. Factory is not liable for delays caused by the Buyer.

3. TOLERANCE: A quantity tolerance of +/- 5% is reserved. The Buyer agrees to accept and pay for the actual quantity produced within this range.

4. PRICE VALIDITY: Prices are based on current material costs. Factory reserves the right to renegotiate unit prices if the Buyer delays production by more than 45 days.

5. AIR FREIGHT: If shipment is delayed due to Buyer's late approvals, any resulting air freight or expedited shipping costs shall be paid by the Buyer.

6. CLAIMS: Quality/quantity claims must be submitted within 15 days of port arrival. No claims accepted after goods are processed or sold. Total liability for any claim shall not exceed the original invoice value of the goods.

7. OWNERSHIP: Goods remain Factory property until full payment is received. Factory reserves the right to resell de-branded goods in the event of non-payment or cancellation.

8. FORCE MAJEURE: Factory is not liable for delays caused by strikes, power shortages, natural disasters, or other events beyond its reasonable control.

9. JURISDICTION: This contract is governed by the laws of Karachi, Pakistan.`,
          isDefault: true,
        },
      ],
      skipDuplicates: true,
    });
    console.log('✓ Sales Terms seeded');

    // 2. PO Terms
    await prisma.pOTerms.createMany({
      data: [
        {
          id: 'po-default-001',
          organizationId: 'default-org',
          name: 'Default PO Terms',
          content: `1. Deliveries must be made between 09:00 AM and 05:00 PM (Mon-Sat).
2. Items must strictly adhere to the approved quality samples.
3. Payment will be processed as per credit terms days after GRN.
4. Partial shipments are accepted only with prior written approval.
5. We reserve the right to return non-compliant goods.`,
          isDefault: true,
        },
      ],
      skipDuplicates: true,
    });
    console.log('✓ PO Terms seeded');

    // 3. Locations
    const locations = [
      'London',
      'New York',
      'Dubai',
      'Singapore',
      'Amsterdam',
      'Los Angeles',
      'Hong Kong',
      'Toronto',
      'Sydney',
    ];
    await prisma.location.createMany({
      data: locations.map((name, idx) => ({
        id: `loc-${idx + 1}`,
        organizationId: 'default-org',
        name,
      })),
      skipDuplicates: true,
    });
    console.log('✓ Locations seeded');

    // 4. Monthly Targets
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    await prisma.monthlyTarget.createMany({
      data: months.map((month, idx) => ({
        id: `mt-${idx + 1}`,
        organizationId: 'default-org',
        month,
        salesTarget: 50000 + idx * 5000,
        volumeTarget: 500 + idx * 50,
        year: 2026,
      })),
      skipDuplicates: true,
    });
    console.log('✓ Monthly Targets seeded');

    // 5. Thread Operations
    const threadOperations = [
      { category: 'Tops', operations: ['Shoulder Join', 'Neck Bind', 'Sleeve Hem', 'Button Holes', 'Button Placement', 'Collar Stitching', 'Front Placket'] },
      { category: 'Bottoms', operations: ['Waistband Stitching', 'Front Rise', 'Back Rise', 'Inseam', 'Outseam', 'Cuff Hem', 'Zip Installation', 'Pocket Stitching', 'Belt Loop Attachment', 'Waistband Closure', 'Back Yoke'] },
      { category: 'Universal', operations: ['Hem Stitching', 'Seam Finishing', 'Label Attachment', 'Safety Stitch', 'QC Thread Removal'] },
    ];
    let opIdx = 1;
    for (const { category, operations } of threadOperations) {
      for (const op of operations) {
        await prisma.threadOperation.create({
          data: {
            id: `to-${opIdx}`,
            organizationId: 'default-org',
            category,
            name: op,
          },
        }).catch(() => {}); // Skip if duplicate
        opIdx++;
      }
    }
    console.log('✓ Thread Operations seeded');

    // 6. Machine Factors
    const machineFactors = [
      { machineType: 'Lockstitch', factor: 2.5 },
      { machineType: 'Overlock / Serger', factor: 3.5 },
      { machineType: 'Coverstitch', factor: 4.2 },
      { machineType: 'Chainstitch', factor: 1.8 },
      { machineType: 'Flatlock', factor: 3.8 },
      { machineType: 'Bar Tacking', factor: 5.5 },
      { machineType: 'Blind Stitch', factor: 10.0 },
    ];
    await prisma.machineFactor.createMany({
      data: machineFactors.map((mf, idx) => ({
        id: `mf-${idx + 1}`,
        organizationId: 'default-org',
        machineType: mf.machineType,
        factor: mf.factor,
      })),
      skipDuplicates: true,
    });
    console.log('✓ Machine Factors seeded');

    // 7. Garment Templates with Steps
    const templates = [
      {
        name: 'Jeans',
        steps: [
          { stepOrder: 1, operation: 'Denim Dyeing', machineType: 'Lockstitch' },
          { stepOrder: 2, operation: 'Pattern Cutting', machineType: 'Lockstitch' },
          { stepOrder: 3, operation: 'Front Rise Stitching', machineType: 'Lockstitch' },
          { stepOrder: 4, operation: 'Back Rise Stitching', machineType: 'Lockstitch' },
          { stepOrder: 5, operation: 'Inseam Stitching', machineType: 'Lockstitch' },
          { stepOrder: 6, operation: 'Outseam Stitching', machineType: 'Lockstitch' },
          { stepOrder: 7, operation: 'Zip Installation', machineType: 'Lockstitch' },
          { stepOrder: 8, operation: 'Waistband Attachment', machineType: 'Lockstitch' },
          { stepOrder: 9, operation: 'Cuff Hem', machineType: 'Lockstitch' },
          { stepOrder: 10, operation: 'Button & Label', machineType: 'Bar Tacking' },
        ],
      },
      {
        name: 'Jacket',
        steps: [
          { stepOrder: 1, operation: 'Pattern Layout', machineType: 'Lockstitch' },
          { stepOrder: 2, operation: 'Front Panel Stitching', machineType: 'Lockstitch' },
          { stepOrder: 3, operation: 'Back Panel Stitching', machineType: 'Lockstitch' },
          { stepOrder: 4, operation: 'Shoulder Join', machineType: 'Lockstitch' },
          { stepOrder: 5, operation: 'Sleeve Attachment', machineType: 'Lockstitch' },
          { stepOrder: 6, operation: 'Collar Stitching', machineType: 'Lockstitch' },
          { stepOrder: 7, operation: 'Hem Stitching', machineType: 'Lockstitch' },
        ],
      },
      {
        name: 'Shirt',
        steps: [
          { stepOrder: 1, operation: 'Fabric Spreading', machineType: 'Lockstitch' },
          { stepOrder: 2, operation: 'Pattern Cutting', machineType: 'Lockstitch' },
          { stepOrder: 3, operation: 'Pocket Stitching', machineType: 'Lockstitch' },
          { stepOrder: 4, operation: 'Front & Back Join', machineType: 'Lockstitch' },
          { stepOrder: 5, operation: 'Shoulder Join', machineType: 'Lockstitch' },
          { stepOrder: 6, operation: 'Sleeve Attachment', machineType: 'Lockstitch' },
          { stepOrder: 7, operation: 'Collar Bind', machineType: 'Lockstitch' },
        ],
      },
      {
        name: 'Hoodie',
        steps: [
          { stepOrder: 1, operation: 'Body Panel Cutting', machineType: 'Lockstitch' },
          { stepOrder: 2, operation: 'Sleeve Cutting', machineType: 'Lockstitch' },
          { stepOrder: 3, operation: 'Hood Assembly', machineType: 'Lockstitch' },
          { stepOrder: 4, operation: 'Body Assembly', machineType: 'Lockstitch' },
          { stepOrder: 5, operation: 'Sleeve Attachment', machineType: 'Lockstitch' },
          { stepOrder: 6, operation: 'Cuff & Hem', machineType: 'Lockstitch' },
        ],
      },
    ];

    for (const template of templates) {
      const createdTemplate = await prisma.garmentTemplate.create({
        data: {
          id: `gt-${template.name.toLowerCase()}`,
          organizationId: 'default-org',
          name: template.name,
          description: `${template.name} template`,
        },
      }).catch(() => null);

      if (createdTemplate) {
        for (const step of template.steps) {
          await prisma.garmentTemplateStep.create({
            data: {
              id: `gts-${template.name.toLowerCase()}-${step.stepOrder}`,
              templateId: createdTemplate.id,
              stepOrder: step.stepOrder,
              operation: step.operation,
              machineType: step.machineType,
            },
          }).catch(() => {});
        }
      }
    }
    console.log('✓ Garment Templates seeded');

    // 8. Production Lines
    await prisma.productionLine.createMany({
      data: [
        { id: 'pl-1', organizationId: 'default-org', name: 'Line 1', description: 'Main Production Line' },
        { id: 'pl-2', organizationId: 'default-org', name: 'Line 2', description: 'Secondary Production Line' },
        { id: 'pl-3', organizationId: 'default-org', name: 'Line 3', description: 'Finishing Line' },
      ],
      skipDuplicates: true,
    });
    console.log('✓ Production Lines seeded');

    // 9. Packing Instructions
    await prisma.packingInstruction.createMany({
      data: [
        {
          id: 'pi-default',
          organizationId: 'default-org',
          name: 'Default Packing Instructions',
          content: `1. Fold all items according to buyer specifications.
2. Place items in correct size/color grouping.
3. Pack in corrugated cartons with appropriate labeling.
4. Add packing list inside each carton.
5. Apply barcode labels to all cartons.
6. Stack cartons on wooden pallets (max 15 cartons per pallet).
7. Wrap pallets with stretch film.
8. Ensure proper ventilation in storage area.
9. Maintain temperature between 15-25°C.
10. Handle with care - fragile items.`,
          isDefault: true,
        },
      ],
      skipDuplicates: true,
    });
    console.log('✓ Packing Instructions seeded');

    // 10. Process Steps
    const processSteps = [
      { name: 'Inspection', description: 'Receive and inspect raw materials' },
      { name: 'Cutting', description: 'Cut fabric pieces according to pattern' },
      { name: 'Dyeing', description: 'Dye fabrics and components' },
      { name: 'Embellishment', description: 'Add prints, embroidery, and embellishments' },
      { name: 'Stitching', description: 'Assemble components through stitching' },
      { name: 'Finishing', description: 'Final touches, hems, and trims' },
      { name: 'QC', description: 'Quality control inspection' },
      { name: 'Packing', description: 'Pack finished goods for shipment' },
    ];
    await prisma.processStep.createMany({
      data: processSteps.map((step, idx) => ({
        id: `ps-${idx + 1}`,
        organizationId: 'default-org',
        name: step.name,
        description: step.description,
        sequenceOrder: idx + 1,
      })),
      skipDuplicates: true,
    });
    console.log('✓ Process Steps seeded');

    // 11. Company Settings
    await prisma.companySettings.upsert({
      where: { id: 'cs-default' },
      update: {},
      create: {
        id: 'cs-default',
        organizationId: 'default-org',
        taxRate: 18,
        cottonRate: 150,
        currencyRates: JSON.stringify({
          USD: 1,
          EUR: 0.92,
          GBP: 0.79,
        }),
      },
    });
    console.log('✓ Company Settings seeded');

    console.log('\n✅ All static data seeded successfully!');
    console.log('Database tables populated:');
    console.log('  - SalesTerms (1)');
    console.log('  - POTerms (1)');
    console.log('  - Locations (9)');
    console.log('  - MonthlyTargets (12)');
    console.log('  - ThreadOperations (23)');
    console.log('  - MachineFactors (7)');
    console.log('  - GarmentTemplates (4 with 30 steps)');
    console.log('  - ProductionLines (3)');
    console.log('  - PackingInstructions (1)');
    console.log('  - ProcessSteps (8)');
    console.log('  - CompanySettings (1)');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
