import prisma from '../config/prisma.js';

// Get All Master BOM Items
export const getMasterBOMItems = async (req, res) => {
    try {
        const items = await prisma.masterBOMItem.findMany();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Master BOM Item
export const createMasterBOMItem = async (req, res) => {
    try {
        const {
            type, category, supplier, brand, uom, isNominated, price, code,
            construction, content, weight, width, shade, warpShrinkage, weftShrinkage,
            itemName, details
        } = req.body;

        const item = await prisma.masterBOMItem.create({
            data: {
                organizationId: 'default',
                type,
                category,
                supplier,
                brand: brand || 'Generic',
                uom: uom || 'Pieces',
                isNominated: isNominated || false,
                price: price || 0,
                code,
                construction,
                content,
                weight,
                width,
                shade,
                warpShrinkage,
                weftShrinkage,
                itemName,
                details
            }
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Master BOM Item
export const updateMasterBOMItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const item = await prisma.masterBOMItem.update({
            where: { id },
            data: updateData
        });

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Master BOM Item
export const deleteMasterBOMItem = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.masterBOMItem.delete({
            where: { id }
        });

        res.json({ message: 'Master BOM Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
