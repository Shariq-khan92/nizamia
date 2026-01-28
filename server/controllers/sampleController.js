import prisma from '../config/prisma.js';

const parseJSON = (str) => {
    if (!str) return null;
    try { return JSON.parse(str); } catch { return null; }
};

// Get All Development Samples
export const getSamples = async (req, res) => {
    try {
        const samples = await prisma.developmentSample.findMany({ orderBy: { createdAt: 'desc' } });
        const parsed = samples.map(s => ({
            ...s,
            bom: parseJSON(s.bom) || [],
            embellishments: parseJSON(s.embellishments) || []
        }));
        res.json(parsed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Development Sample
export const createSample = async (req, res) => {
    try {
        const { bom, embellishments, ...rest } = req.body;
        const sample = await prisma.developmentSample.create({
            data: {
                organizationId: 'default',
                ...rest,
                bom: bom ? JSON.stringify(bom) : null,
                embellishments: embellishments ? JSON.stringify(embellishments) : null
            }
        });
        res.status(201).json({ ...sample, bom: bom || [], embellishments: embellishments || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Development Sample
export const updateSample = async (req, res) => {
    try {
        const { id } = req.params;
        const { bom, embellishments, ...rest } = req.body;
        const updateData = { ...rest };
        if (bom !== undefined) updateData.bom = JSON.stringify(bom);
        if (embellishments !== undefined) updateData.embellishments = JSON.stringify(embellishments);

        const sample = await prisma.developmentSample.update({ where: { id }, data: updateData });
        res.json({ ...sample, bom: parseJSON(sample.bom) || [], embellishments: parseJSON(sample.embellishments) || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Development Sample
export const deleteSample = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.developmentSample.delete({ where: { id } });
        res.json({ message: 'Development Sample deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
