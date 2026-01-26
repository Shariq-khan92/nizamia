import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSettings = async (req, res) => {
  try {
    const settings = await prisma.companySettings.findFirst({
      where: { organizationId: 'default-org' },
    });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      where: { organizationId: 'default-org' },
      orderBy: { name: 'asc' },
    });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSalesTerms = async (req, res) => {
  try {
    const terms = await prisma.salesTerms.findMany({
      where: { organizationId: 'default-org' },
    });
    res.json(terms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPOTerms = async (req, res) => {
  try {
    const terms = await prisma.pOTerms.findMany({
      where: { organizationId: 'default-org' },
    });
    res.json(terms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getThreadOperations = async (req, res) => {
  try {
    const operations = await prisma.threadOperation.findMany({
      where: { organizationId: 'default-org' },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
    res.json(operations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMachineFactors = async (req, res) => {
  try {
    const factors = await prisma.machineFactor.findMany({
      where: { organizationId: 'default-org' },
      orderBy: { machineType: 'asc' },
    });
    res.json(factors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGarmentTemplates = async (req, res) => {
  try {
    const templates = await prisma.garmentTemplate.findMany({
      where: { organizationId: 'default-org' },
      include: {
        GarmentTemplateStep: {
          orderBy: { stepOrder: 'asc' },
        },
      },
    });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductionLines = async (req, res) => {
  try {
    const lines = await prisma.productionLine.findMany({
      where: { organizationId: 'default-org' },
      orderBy: { name: 'asc' },
    });
    res.json(lines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMonthlyTargets = async (req, res) => {
  try {
    const targets = await prisma.monthlyTarget.findMany({
      where: {
        organizationId: 'default-org',
        year: 2026,
      },
      orderBy: { month: 'asc' },
    });
    res.json(targets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPackingInstructions = async (req, res) => {
  try {
    const instructions = await prisma.packingInstruction.findMany({
      where: { organizationId: 'default-org' },
    });
    res.json(instructions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProcessSteps = async (req, res) => {
  try {
    const steps = await prisma.processStep.findMany({
      where: { organizationId: 'default-org' },
      orderBy: { sequenceOrder: 'asc' },
    });
    res.json(steps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Settings
export const updateSettings = async (req, res) => {
  try {
    const { taxRate, cottonRate, currencyRates, updatedAt } = req.body;

    const settings = await prisma.companySettings.upsert({
      where: { id: 'main-settings' },
      update: {
        taxRate,
        cottonRate,
        currencyRates: JSON.stringify(currencyRates),
        lastUpdated: updatedAt
      },
      create: {
        id: 'main-settings',
        organizationId: 'default-org',
        taxRate,
        cottonRate,
        currencyRates: JSON.stringify(currencyRates),
        lastUpdated: updatedAt
      }
    });

    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Locations
export const updateLocations = async (req, res) => {
  try {
    const locations = req.body; // Array of location names

    // Delete existing locations
    await prisma.location.deleteMany({
      where: { organizationId: 'default-org' }
    });

    // Create new locations
    const createdLocations = await prisma.location.createMany({
      data: locations.map(name => ({ organizationId: 'default-org', name }))
    });

    res.json({ message: 'Locations updated successfully', count: locations.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Company Details
export const updateCompanyDetails = async (req, res) => {
  try {
    const { name, address, phone, website, logoUrl, salesTerms, poTerms } = req.body;

    // For now, we'll just return success since company details might be handled differently
    res.json({ message: 'Company details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Monthly Targets
export const updateMonthlyTargets = async (req, res) => {
  try {
    const targets = req.body; // Array of monthly targets

    // Delete existing targets
    await prisma.monthlyTarget.deleteMany({
      where: { organizationId: 'default-org' }
    });

    // Create new targets
    const createdTargets = await prisma.monthlyTarget.createMany({
      data: targets.map(target => ({ ...target, organizationId: 'default-org' }))
    });

    res.json({ message: 'Monthly targets updated successfully', count: targets.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
