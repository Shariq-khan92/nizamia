import prisma from '../config/prisma.js';

// Helper to parse JSON strings
const parseJSON = (str) => {
    if (!str) return null;
    try { return JSON.parse(str); } catch { return null; }
};

// Get All Jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await prisma.jobBatch.findMany({ orderBy: { createdAt: 'desc' } });
        const parsed = jobs.map(j => ({
            ...j,
            styles: parseJSON(j.styles) || [],
            plans: parseJSON(j.plans) || {},
            purchasingRequests: parseJSON(j.purchasingRequests) || [],
            workOrderRequests: parseJSON(j.workOrderRequests) || [],
            cuttingPlanDetails: parseJSON(j.cuttingPlanDetails) || [],
            dailyLogs: parseJSON(j.dailyLogs) || [],
            productionProgress: parseJSON(j.productionProgress) || {},
            stageSchedules: parseJSON(j.stageSchedules) || {}
        }));
        res.json(parsed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Job
export const createJob = async (req, res) => {
    try {
        const { styles, plans, purchasingRequests, workOrderRequests, cuttingPlanDetails, dailyLogs, productionProgress, stageSchedules, ...rest } = req.body;

        const job = await prisma.jobBatch.create({
            data: {
                organizationId: 'default',
                ...rest,
                styles: styles ? JSON.stringify(styles) : null,
                plans: plans ? JSON.stringify(plans) : null,
                purchasingRequests: purchasingRequests ? JSON.stringify(purchasingRequests) : null,
                workOrderRequests: workOrderRequests ? JSON.stringify(workOrderRequests) : null,
                cuttingPlanDetails: cuttingPlanDetails ? JSON.stringify(cuttingPlanDetails) : null,
                dailyLogs: dailyLogs ? JSON.stringify(dailyLogs) : null,
                productionProgress: productionProgress ? JSON.stringify(productionProgress) : null,
                stageSchedules: stageSchedules ? JSON.stringify(stageSchedules) : null
            }
        });

        res.status(201).json({
            ...job,
            styles: styles || [],
            plans: plans || {},
            purchasingRequests: purchasingRequests || [],
            workOrderRequests: workOrderRequests || [],
            cuttingPlanDetails: cuttingPlanDetails || [],
            dailyLogs: dailyLogs || [],
            productionProgress: productionProgress || {},
            stageSchedules: stageSchedules || {}
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Job
export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { styles, plans, purchasingRequests, workOrderRequests, cuttingPlanDetails, dailyLogs, productionProgress, stageSchedules, ...rest } = req.body;

        const updateData = { ...rest };
        if (styles !== undefined) updateData.styles = JSON.stringify(styles);
        if (plans !== undefined) updateData.plans = JSON.stringify(plans);
        if (purchasingRequests !== undefined) updateData.purchasingRequests = JSON.stringify(purchasingRequests);
        if (workOrderRequests !== undefined) updateData.workOrderRequests = JSON.stringify(workOrderRequests);
        if (cuttingPlanDetails !== undefined) updateData.cuttingPlanDetails = JSON.stringify(cuttingPlanDetails);
        if (dailyLogs !== undefined) updateData.dailyLogs = JSON.stringify(dailyLogs);
        if (productionProgress !== undefined) updateData.productionProgress = JSON.stringify(productionProgress);
        if (stageSchedules !== undefined) updateData.stageSchedules = JSON.stringify(stageSchedules);

        const job = await prisma.jobBatch.update({ where: { id }, data: updateData });

        res.json({
            ...job,
            styles: parseJSON(job.styles) || [],
            plans: parseJSON(job.plans) || {},
            purchasingRequests: parseJSON(job.purchasingRequests) || [],
            workOrderRequests: parseJSON(job.workOrderRequests) || [],
            cuttingPlanDetails: parseJSON(job.cuttingPlanDetails) || [],
            dailyLogs: parseJSON(job.dailyLogs) || [],
            productionProgress: parseJSON(job.productionProgress) || {},
            stageSchedules: parseJSON(job.stageSchedules) || {}
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.jobBatch.delete({ where: { id } });
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Refresh Job Data (Re-sync with latest Orders)
export const refreshJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await prisma.jobBatch.findUnique({ where: { id } });

        if (!job) return res.status(404).json({ message: 'Job not found' });

        const currentStyles = parseJSON(job.styles) || [];
        // Extract original Order IDs or Style IDs. 
        // Assuming job.styles contains full order objects, we need to find their original IDs.
        // If they are Order objects, they have 'id'.
        const orderIds = currentStyles.map(s => s.id).filter(Boolean);

        if (orderIds.length === 0) {
            return res.json(job); // Nothing to refresh
        }

        // Fetch fresh orders
        const freshOrders = await prisma.order.findMany({
            where: { id: { in: orderIds } },
            include: {
                buyer: true,
                bom: true,
                samplingDetails: true,
                sizeGroups: true
            }
        });

        // Update the job with fresh styles
        const updatedJob = await prisma.jobBatch.update({
            where: { id },
            data: {
                styles: JSON.stringify(freshOrders)
            }
        });

        res.json({
            ...updatedJob,
            styles: freshOrders, // Return fresh already parsed
            plans: parseJSON(updatedJob.plans) || {},
            purchasingRequests: parseJSON(updatedJob.purchasingRequests) || [],
            workOrderRequests: parseJSON(updatedJob.workOrderRequests) || [],
            cuttingPlanDetails: parseJSON(updatedJob.cuttingPlanDetails) || [],
            dailyLogs: parseJSON(updatedJob.dailyLogs) || [],
            productionProgress: parseJSON(updatedJob.productionProgress) || {},
            stageSchedules: parseJSON(updatedJob.stageSchedules) || {}
        });

    } catch (error) {
        console.error("Refresh Job Error:", error);
        res.status(500).json({ message: error.message });
    }
};
