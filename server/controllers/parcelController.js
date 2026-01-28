import prisma from '../config/prisma.js';

const parseJSON = (str) => {
    if (!str) return null;
    try { return JSON.parse(str); } catch { return null; }
};

// Get All Parcels
export const getParcels = async (req, res) => {
    try {
        const parcels = await prisma.parcel.findMany({ orderBy: { createdAt: 'desc' } });
        const parsed = parcels.map(p => ({
            ...p,
            documents: parseJSON(p.documents) || []
        }));
        res.json(parsed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Parcel
export const createParcel = async (req, res) => {
    try {
        const { documents, ...rest } = req.body;
        const parcel = await prisma.parcel.create({
            data: {
                organizationId: 'default',
                ...rest,
                documents: documents ? JSON.stringify(documents) : null
            }
        });
        res.status(201).json({ ...parcel, documents: documents || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Parcel
export const updateParcel = async (req, res) => {
    try {
        const { id } = req.params;
        const { documents, ...rest } = req.body;
        const updateData = { ...rest };
        if (documents !== undefined) updateData.documents = JSON.stringify(documents);

        const parcel = await prisma.parcel.update({ where: { id }, data: updateData });
        res.json({ ...parcel, documents: parseJSON(parcel.documents) || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Parcel
export const deleteParcel = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.parcel.delete({ where: { id } });
        res.json({ message: 'Parcel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
