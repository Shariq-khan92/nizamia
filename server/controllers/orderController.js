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
        // Destructure to handle nested relations separately
        const { sizeGroups, bom, samplingDetails, buyer, buyerId, ...orderData } = req.body;

        // Handle buyer connection
        if (buyerId) {
            orderData.buyer = { connect: { id: buyerId } };
        }

        // Update the main order first
        const updatedOrder = await prisma.order.update({
            where: { id: req.params.id },
            data: orderData,
            include: {
                buyer: true,
                bom: true,
                samplingDetails: true,
                sizeGroups: true
            }
        });

        // If sizeGroups provided, delete existing and recreate
        if (sizeGroups && Array.isArray(sizeGroups)) {
            await prisma.sizeGroup.deleteMany({ where: { orderId: req.params.id } });
            for (const sg of sizeGroups) {
                // Only extract valid schema fields to avoid Prisma validation errors
                await prisma.sizeGroup.create({
                    data: {
                        orderId: req.params.id,
                        groupName: sg.groupName || null,
                        unitPrice: sg.unitPrice || null,
                        currency: sg.currency || null,
                        colors: typeof sg.colors === 'object' ? JSON.stringify(sg.colors) : (sg.colors || null),
                        sizes: typeof sg.sizes === 'object' ? JSON.stringify(sg.sizes) : (sg.sizes || null),
                        breakdown: typeof sg.breakdown === 'object' ? JSON.stringify(sg.breakdown) : (sg.breakdown || null)
                    }
                });
            }
        }

        // If bom provided, delete existing and recreate
        if (bom && Array.isArray(bom)) {
            await prisma.bomItem.deleteMany({ where: { orderId: req.params.id } });
            for (const item of bom) {
                // Only extract valid schema fields
                await prisma.bomItem.create({
                    data: {
                        orderId: req.params.id,
                        processGroup: item.processGroup || null,
                        componentName: item.componentName || null,
                        itemDetail: item.itemDetail || null,
                        supplierRef: item.supplierRef || null,
                        vendor: item.vendor || null,
                        sourcingStatus: item.sourcingStatus || null,
                        labStatus: item.labStatus || null,
                        leadTimeDays: item.leadTimeDays || null,
                        usageRule: item.usageRule || null,
                        usageData: typeof item.usageData === 'object' ? JSON.stringify(item.usageData) : (item.usageData || null),
                        wastagePercent: item.wastagePercent || null,
                        isTestingRequired: item.isTestingRequired || null,
                        isApproved: item.isApproved || null,
                        uom: item.uom || null,
                        unitsPerPack: item.unitsPerPack || null,
                        packingUnit: item.packingUnit || null
                    }
                });
            }
        }

        // If samplingDetails provided, delete existing and recreate
        if (samplingDetails && Array.isArray(samplingDetails)) {
            await prisma.sampleRow.deleteMany({ where: { orderId: req.params.id } });
            for (const sample of samplingDetails) {
                // Only extract valid schema fields
                await prisma.sampleRow.create({
                    data: {
                        orderId: req.params.id,
                        samNumber: sample.samNumber || null,
                        type: sample.type || null,
                        fabric: sample.fabric || null,
                        shade: sample.shade || null,
                        wash: sample.wash || null,
                        baseSize: sample.baseSize || null,
                        threadColor: sample.threadColor || null,
                        zipperColor: sample.zipperColor || null,
                        lining: sample.lining || null,
                        quantity: sample.quantity || null,
                        deadline: sample.deadline || null,
                        status: sample.status || null,
                        labStatus: sample.labStatus || null,
                        isTestingRequired: sample.isTestingRequired || null,
                        isApproved: sample.isApproved || null,
                        currentStage: sample.currentStage || null,
                        lastUpdated: sample.lastUpdated || null
                    }
                });
            }
        }

        // Fetch the complete updated order with all relations
        const completeOrder = await prisma.order.findUnique({
            where: { id: req.params.id },
            include: {
                buyer: true,
                bom: true,
                samplingDetails: true,
                sizeGroups: true
            }
        });

        res.json(completeOrder);
    } catch (error) {
        console.error("Error updating order:", error);
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
