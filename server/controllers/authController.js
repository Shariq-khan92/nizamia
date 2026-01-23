import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, username, password, role } = req.body;
        // Basic multi-tenancy: For now we assume a default org ID since logic for org creation isn't specified yet.
        // In a real app, this would come from the request context or registration flow.
        const organizationId = "default-org-id";

        const userExists = await prisma.user.findUnique({
            where: { username }
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
                role: role || 'User',
                organizationId
            }
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

// Get All Users
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                lastActive: true,
                createdAt: true
            }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
