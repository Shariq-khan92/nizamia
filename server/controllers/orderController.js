import prisma from '../config/prisma.js';

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                buyer: true,
                bom: true,
                samplingDetails: true,
                sizeGroups: true
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single order
export const getOrderById = async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id },
            include: {
                buyer: true,
                bom: true,
                samplingDetails: true,
                sizeGroups: true
            }
        });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create order
export const createOrder = async (req, res) => {
    try {
        // Assume organizationId comes from authenticated user or is default for now
        const organizationId = "default-org-id";

        // Destructure nested fields that need special handling if any, 
        // but Prisma can handle nested writes if structured correctly.
        // For now, we take body as is, but ensure organizationId is present.
        // Destructure to remove 'buyer' relation field if sent as string/object incorrectly
        // We only want 'buyerId' to be passed to Prisma OR a properly formatted buyer connection.
        const { buyer, buyerId, ...restBody } = req.body;

        // Transform buyerId into Prisma 'connect' syntax
        let orderData = { ...restBody, organizationId };

        if (buyerId) {
            orderData.buyer = { connect: { id: buyerId } };
        } else if (buyer && buyer.connect && buyer.connect.id) {
            // Handle case where frontend sends { buyer: { connect: { id: ... } } }
            orderData.buyer = { connect: { id: buyer.connect.id } };
        }

        console.log('DEBUG: Creating Order with data:', JSON.stringify(orderData, null, 2));

        const createdOrder = await prisma.order.create({
            data: orderData
        });
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(400).json({ message: error.message });
    }
};

// Update order
export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(updatedOrder);
    } catch (error) {
        // Prisma throws specific error if record not found, but generic catch covers it
        res.status(400).json({ message: error.message });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        await prisma.order.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Order removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
