import prisma from '../config/prisma.js';

// Get All Calendar Events
export const getEvents = async (req, res) => {
    try {
        const events = await prisma.calendarEvent.findMany({ orderBy: { startDate: 'asc' } });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Calendar Event
export const createEvent = async (req, res) => {
    try {
        const event = await prisma.calendarEvent.create({
            data: {
                organizationId: 'default',
                ...req.body
            }
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Calendar Event
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await prisma.calendarEvent.update({ where: { id }, data: req.body });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Calendar Event
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.calendarEvent.delete({ where: { id } });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
