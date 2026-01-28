import prisma from '../config/prisma.js';

// Get All BOM Presets
export const getPresets = async (req, res) => {
    try {
        const presets = await prisma.bOMPreset.findMany();
        // Parse JSON strings back to arrays for the frontend
        const parsed = presets.map(p => ({
            ...p,
            items: p.items ? JSON.parse(p.items) : []
        }));
        res.json(parsed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create BOM Preset
export const createPreset = async (req, res) => {
    try {
        const { name, buyerName, items } = req.body;

        const preset = await prisma.bOMPreset.create({
            data: {
                organizationId: 'default',
                name,
                buyerName,
                items: items ? JSON.stringify(items) : null
            }
        });

        res.status(201).json({
            ...preset,
            items: items || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update BOM Preset
export const updatePreset = async (req, res) => {
    try {
        const { id } = req.params;
        const { items, ...otherData } = req.body;

        const updatePayload = {
            ...otherData,
            ...(items !== undefined && { items: JSON.stringify(items) })
        };

        const preset = await prisma.bOMPreset.update({
            where: { id },
            data: updatePayload
        });

        res.json({
            ...preset,
            items: preset.items ? JSON.parse(preset.items) : []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete BOM Preset
export const deletePreset = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.bOMPreset.delete({
            where: { id }
        });

        res.json({ message: 'BOM Preset deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
