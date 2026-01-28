import prisma from '../config/prisma.js';

// Get All Buyers
export const getBuyers = async (req, res) => {
    try {
        const buyers = await prisma.buyer.findMany();
        // Parse JSON strings back to objects for the frontend
        const parsed = buyers.map(b => ({
            ...b,
            addresses: b.addresses ? JSON.parse(b.addresses) : [],
            contacts: b.contacts ? JSON.parse(b.contacts) : []
        }));
        res.json(parsed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Buyer
export const createBuyer = async (req, res) => {
    try {
        const { name, logoUrl, website, country, companyPhone, paymentTerms, incoterms, agentName, agentCommission, addresses, contacts } = req.body;

        const buyer = await prisma.buyer.create({
            data: {
                organizationId: 'default',
                name,
                logoUrl,
                website,
                country,
                companyPhone,
                paymentTerms,
                incoterms,
                agentName,
                agentCommission: agentCommission || 0,
                addresses: addresses ? JSON.stringify(addresses) : null,
                contacts: contacts ? JSON.stringify(contacts) : null
            }
        });

        res.status(201).json({
            ...buyer,
            addresses: addresses || [],
            contacts: contacts || []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Buyer
export const updateBuyer = async (req, res) => {
    try {
        const { id } = req.params;
        const { addresses, contacts, ...otherData } = req.body;

        const updatePayload = {
            ...otherData,
            ...(addresses !== undefined && { addresses: JSON.stringify(addresses) }),
            ...(contacts !== undefined && { contacts: JSON.stringify(contacts) })
        };

        const buyer = await prisma.buyer.update({
            where: { id },
            data: updatePayload
        });

        res.json({
            ...buyer,
            addresses: buyer.addresses ? JSON.parse(buyer.addresses) : [],
            contacts: buyer.contacts ? JSON.parse(buyer.contacts) : []
        });
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