import prisma from '../config/prisma.js';

const parseJSON = (str) => {
    if (!str) return null;
    try { return JSON.parse(str); } catch { return null; }
};

// Get All Work Orders
export const getWorkOrders = async (req, res) => {
    try {
        const orders = await prisma.issuedWorkOrder.findMany({ orderBy: { createdAt: 'desc' } });
        const parsed = orders.map(o => ({
            ...o,
            items: parseJSON(o.items) || []
        }));
        res.json(parsed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Work Order
export const createWorkOrder = async (req, res) => {
    try {
        const { items, ...rest } = req.body;
        const order = await prisma.issuedWorkOrder.create({
            data: {
                organizationId: 'default',
                ...rest,
                items: items ? JSON.stringify(items) : null
            }
        });
        res.status(201).json({ ...order, items: items || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Work Order
export const updateWorkOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { items, ...rest } = req.body;
        const updateData = { ...rest };
        if (items !== undefined) updateData.items = JSON.stringify(items);

        const order = await prisma.issuedWorkOrder.update({ where: { id }, data: updateData });
        res.json({ ...order, items: parseJSON(order.items) || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Work Order
export const deleteWorkOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.issuedWorkOrder.delete({ where: { id } });
        res.json({ message: 'Work Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
