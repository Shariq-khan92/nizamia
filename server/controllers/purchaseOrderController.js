import prisma from '../config/prisma.js';

const parseJSON = (str) => {
    if (!str) return null;
    try { return JSON.parse(str); } catch { return null; }
};

// Get All Purchase Orders
export const getPurchaseOrders = async (req, res) => {
    try {
        const orders = await prisma.issuedPurchaseOrder.findMany({ orderBy: { createdAt: 'desc' } });
        const parsed = orders.map(o => ({
            ...o,
            items: parseJSON(o.items) || [],
            attachments: parseJSON(o.attachments) || []
        }));
        res.json(parsed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Purchase Order
export const createPurchaseOrder = async (req, res) => {
    try {
        const { items, attachments, ...rest } = req.body;
        const order = await prisma.issuedPurchaseOrder.create({
            data: {
                organizationId: 'default',
                ...rest,
                items: items ? JSON.stringify(items) : null,
                attachments: attachments ? JSON.stringify(attachments) : null
            }
        });
        res.status(201).json({ ...order, items: items || [], attachments: attachments || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Purchase Order
export const updatePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { items, attachments, ...rest } = req.body;
        const updateData = { ...rest };
        if (items !== undefined) updateData.items = JSON.stringify(items);
        if (attachments !== undefined) updateData.attachments = JSON.stringify(attachments);

        const order = await prisma.issuedPurchaseOrder.update({ where: { id }, data: updateData });
        res.json({ ...order, items: parseJSON(order.items) || [], attachments: parseJSON(order.attachments) || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Purchase Order
export const deletePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.issuedPurchaseOrder.delete({ where: { id } });
        res.json({ message: 'Purchase Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
