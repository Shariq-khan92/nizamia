import prisma from '../config/prisma.js';

// Get All Buyers
export const getBuyers = async (req, res) => {
    try {
        const buyers = await prisma.buyer.findMany({
            include: {
                addresses: true,
                contacts: true
            }
        });
        res.json(buyers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Buyer
export const createBuyer = async (req, res) => {
    try {
        const { name, logoUrl, website, country, companyPhone, totalOrders, paymentTerms, incoterms, agentName, agentCommission, addresses, contacts } = req.body;

        const buyer = await prisma.buyer.create({
            data: {
                name,
                logoUrl,
                website,
                country,
                companyPhone,
                totalOrders: totalOrders || 0,
                paymentTerms,
                incoterms,
                agentName,
                agentCommission,
                addresses: {
                    create: addresses || []
                },
                contacts: {
                    create: contacts || []
                }
            },
            include: {
                addresses: true,
                contacts: true
            }
        });

        res.status(201).json(buyer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Buyer
export const updateBuyer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const buyer = await prisma.buyer.update({
            where: { id },
            data: updateData,
            include: {
                addresses: true,
                contacts: true
            }
        });

        res.json(buyer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Buyer
export const deleteBuyer = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.buyer.delete({
            where: { id }
        });

        res.json({ message: 'Buyer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};