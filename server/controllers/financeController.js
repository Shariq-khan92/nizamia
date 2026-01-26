import prisma from '../config/prisma.js';

// Get All Export Invoices
export const getExportInvoices = async (req, res) => {
    try {
        const invoices = await prisma.exportInvoice.findMany({
            include: {
                order: true
            }
        });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Export Invoice
export const createExportInvoice = async (req, res) => {
    try {
        const invoiceData = req.body;

        const invoice = await prisma.exportInvoice.create({
            data: invoiceData,
            include: {
                order: true
            }
        });

        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Export Invoice
export const updateExportInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const invoice = await prisma.exportInvoice.update({
            where: { id },
            data: updateData,
            include: {
                order: true
            }
        });

        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Export Invoice
export const deleteExportInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.exportInvoice.delete({
            where: { id }
        });

        res.json({ message: 'Export invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};