import prisma from '../config/prisma.js';

// Get All Buying Agencies
export const getAgencies = async (req, res) => {
    try {
        const agencies = await prisma.buyingAgency.findMany();
        // Parse JSON strings back to arrays for the frontend
        const parsed = agencies.map(a => ({
            ...a,
            linkedBuyers: a.linkedBuyers ? JSON.parse(a.linkedBuyers) : []
        }));
        res.json(parsed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Buying Agency
export const createAgency = async (req, res) => {
    try {
        const { name, contactPerson, phone, address, linkedBuyers, activeOrdersCount } = req.body;

        const agency = await prisma.buyingAgency.create({
            data: {
                organizationId: 'default',
                name,
                contactPerson,
                phone,
                address,
                linkedBuyers: linkedBuyers ? JSON.stringify(linkedBuyers) : null,
                activeOrdersCount: activeOrdersCount || 0
            }
        });

        res.status(201).json({
            ...agency,
            linkedBuyers: linkedBuyers || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Buying Agency
export const updateAgency = async (req, res) => {
    try {
        const { id } = req.params;
        const { linkedBuyers, ...otherData } = req.body;

        const updatePayload = {
            ...otherData,
            ...(linkedBuyers !== undefined && { linkedBuyers: JSON.stringify(linkedBuyers) })
        };

        const agency = await prisma.buyingAgency.update({
            where: { id },
            data: updatePayload
        });

        res.json({
            ...agency,
            linkedBuyers: agency.linkedBuyers ? JSON.parse(agency.linkedBuyers) : []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Buying Agency
export const deleteAgency = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.buyingAgency.delete({
            where: { id }
        });

        res.json({ message: 'Buying Agency deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
