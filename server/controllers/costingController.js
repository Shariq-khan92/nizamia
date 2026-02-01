
import prisma from '../config/prisma.js';

// Get all costings
export const getCostings = async (req, res) => {
    try {
        const costings = await prisma.costingSheet.findMany({
            orderBy: { updatedAt: 'desc' }
        });

        // Parse JSON fields
        const parsedCostings = costings.map(costing => ({
            ...costing,
            currency: costing.currency ? JSON.parse(costing.currency) : null,
            fabric: costing.fabric ? JSON.parse(costing.fabric) : [],
            cm: costing.cm ? JSON.parse(costing.cm) : null,
            washing: costing.washing ? JSON.parse(costing.washing) : [],
            trims: costing.trims ? JSON.parse(costing.trims) : [],
            embellishment: costing.embellishment ? JSON.parse(costing.embellishment) : [],
            margins: costing.margins ? JSON.parse(costing.margins) : null,
            meta: {
                customer: costing.customer,
                styleNo: costing.styleNo,
                description: costing.description,
                agency: costing.agency,
                shipTo: costing.shipTo,
                sizeRange: costing.sizeRange,
                baseSize: costing.baseSize,
                quantity: costing.quantity,
                date: costing.date,
                user: costing.user
            }
        }));

        res.json(parsedCostings);
    } catch (error) {
        console.error("Error fetching costings:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get single costing
export const getCostingById = async (req, res) => {
    try {
        const costing = await prisma.costingSheet.findUnique({
            where: { id: req.params.id }
        });

        if (!costing) {
            return res.status(404).json({ message: 'Costing sheet not found' });
        }

        // Parse JSON fields
        const parsedCosting = {
            ...costing,
            currency: costing.currency ? JSON.parse(costing.currency) : null,
            fabric: costing.fabric ? JSON.parse(costing.fabric) : [],
            cm: costing.cm ? JSON.parse(costing.cm) : null,
            washing: costing.washing ? JSON.parse(costing.washing) : [],
            trims: costing.trims ? JSON.parse(costing.trims) : [],
            embellishment: costing.embellishment ? JSON.parse(costing.embellishment) : [],
            margins: costing.margins ? JSON.parse(costing.margins) : null,
            meta: {
                customer: costing.customer,
                styleNo: costing.styleNo,
                description: costing.description,
                agency: costing.agency,
                shipTo: costing.shipTo,
                sizeRange: costing.sizeRange,
                baseSize: costing.baseSize,
                quantity: costing.quantity,
                date: costing.date,
                user: costing.user
            }
        };

        res.json(parsedCosting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create costing
export const createCosting = async (req, res) => {
    try {
        const data = req.body;

        // Destructure meta and JSON fields from incoming data
        // Expecting data structure to match CostingState interface from frontend
        const { id, status, meta, currency, fabric, cm, washing, trims, embellishment, margins, finalFobPkr, finalFobUsd, marginPct } = data;

        // We'll generate a new ID in database, or use provided id if it's a UUID?
        // Frontend sends "id" as costingId (human readable) typically in "meta" or separate
        // Let's assume req.body is the full CostingState object

        const newCosting = await prisma.costingSheet.create({
            data: {
                // Map top level fields
                costingId: id || `CST-${Date.now()}`, // Fallback if no ID
                status: status || 'Draft',

                // Map Meta fields
                customer: meta?.customer,
                styleNo: meta?.styleNo,
                description: meta?.description,
                agency: meta?.agency,
                shipTo: meta?.shipTo,
                sizeRange: meta?.sizeRange,
                baseSize: meta?.baseSize,
                quantity: meta?.quantity ? parseInt(meta.quantity) : 0,
                date: meta?.date,
                user: meta?.user,

                // Stringify JSON fields
                currency: JSON.stringify(currency || {}),
                fabric: JSON.stringify(fabric || []),
                cm: JSON.stringify(cm || {}),
                washing: JSON.stringify(washing || []),
                trims: JSON.stringify(trims || []),
                embellishment: JSON.stringify(embellishment || []),
                margins: JSON.stringify(margins || {}),

                // Calculated fields
                finalFobPkr: finalFobPkr || 0,
                finalFobUsd: finalFobUsd || 0,
                marginPct: marginPct || 0 // Frontend needs to send this calculated value? Or we calculate?
                // For simplified CRUD, assume frontend sends what it has calculated or 0
            }
        });

        res.status(201).json(newCosting);
    } catch (error) {
        console.error("Error creating costing:", error);
        res.status(400).json({ message: error.message });
    }
};

// Update costing
export const updateCosting = async (req, res) => {
    try {
        const { id } = req.params; // This is the UUID
        const data = req.body;

        const { status, meta, currency, fabric, cm, washing, trims, embellishment, margins, finalFobPkr, finalFobUsd, marginPct } = data;

        const updatedCosting = await prisma.costingSheet.update({
            where: { id },
            data: {
                status: status,

                // Map Meta fields
                customer: meta?.customer,
                styleNo: meta?.styleNo,
                description: meta?.description,
                agency: meta?.agency,
                shipTo: meta?.shipTo,
                sizeRange: meta?.sizeRange,
                baseSize: meta?.baseSize,
                quantity: meta?.quantity ? parseInt(meta.quantity) : 0,
                date: meta?.date,
                user: meta?.user,

                // Stringify JSON fields
                currency: JSON.stringify(currency || {}),
                fabric: JSON.stringify(fabric || []),
                cm: JSON.stringify(cm || {}),
                washing: JSON.stringify(washing || []),
                trims: JSON.stringify(trims || []),
                embellishment: JSON.stringify(embellishment || []),
                margins: JSON.stringify(margins || {}),

                finalFobPkr: finalFobPkr || 0,
                finalFobUsd: finalFobUsd || 0,
                marginPct: marginPct || 0
            }
        });

        res.json(updatedCosting);
    } catch (error) {
        console.error("Error updating costing:", error);
        res.status(400).json({ message: error.message });
    }
};

// Delete costing
export const deleteCosting = async (req, res) => {
    try {
        await prisma.costingSheet.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Costing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
