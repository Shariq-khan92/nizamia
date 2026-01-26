import prisma from '../config/prisma.js';

// Get All Suppliers
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany({
            include: {
                addresses: true,
                contacts: true
            }
        });
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Supplier
export const createSupplier = async (req, res) => {
    try {
        const { name, contactPerson, phone, address, salesTaxId, productLine, creditTerms, rating, category, location } = req.body;

        const supplier = await prisma.supplier.create({
            data: {
                name,
                contactPerson,
                phone,
                address,
                salesTaxId,
                productLine,
                creditTerms,
                rating: rating || 5,
                category: category || productLine[0],
                location: location || 'Unknown'
            }
        });

        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Supplier
export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const supplier = await prisma.supplier.update({
            where: { id },
            data: updateData
        });

        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Supplier
export const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.supplier.delete({
            where: { id }
        });

        res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};