import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDesignations = async (req, res) => {
  try {
    const designations = await prisma.designation.findMany();
    res.json(designations);
  } catch (error) {
    console.error('Error fetching designations:', error);
    res.status(500).json({ message: 'Failed to fetch designations' });
  }
};

export const createDesignation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organizationId = req.body.organizationId || 'default-org';

    const designation = await prisma.designation.create({
      data: {
        organizationId,
        name,
        description,
      },
    });

    res.json(designation);
  } catch (error) {
    console.error('Error creating designation:', error);
    res.status(500).json({ message: 'Failed to create designation' });
  }
};

export const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const designation = await prisma.designation.update({
      where: { id },
      data: { name, description },
    });

    res.json(designation);
  } catch (error) {
    console.error('Error updating designation:', error);
    res.status(500).json({ message: 'Failed to update designation' });
  }
};

export const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.designation.delete({
      where: { id },
    });

    res.json({ message: 'Designation deleted successfully' });
  } catch (error) {
    console.error('Error deleting designation:', error);
    res.status(500).json({ message: 'Failed to delete designation' });
  }
};
