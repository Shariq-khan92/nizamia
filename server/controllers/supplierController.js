import prisma from '../config/prisma.js';

// Get All Suppliers
export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany();
        // Parse JSON strings back to arrays for the frontend
        const parsed = suppliers.map(s => ({
            ...s,
            productLine: s.productLine ? JSON.parse(s.productLine) : []
        }));
        res.json(parsed);
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
                organizationId: 'default',
                name,
                contactPerson,
                phone,
                address,
                salesTaxId,
                productLine: productLine ? JSON.stringify(productLine) : null,
                creditTerms,
                rating: rating || 5,
                category: category || (Array.isArray(productLine) && productLine[0]) || null,
                location: location || 'Unknown'
            }
        });

        res.status(201).json({
            ...supplier,
            productLine: productLine || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Supplier
export const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { productLine, ...otherData } = req.body;

        const updatePayload = {
            ...otherData,
            ...(productLine !== undefined && { productLine: JSON.stringify(productLine) })
        };

        const supplier = await prisma.supplier.update({
            where: { id },
            data: updatePayload
        });

        res.json({
            ...supplier,
            productLine: supplier.productLine ? JSON.parse(supplier.productLine) : []
        });
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