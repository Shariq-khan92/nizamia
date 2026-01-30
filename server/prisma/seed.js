import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Seed Admin User
    const user = await prisma.user.upsert({
        where: { username: 'shafay.h' },
        update: {},
        create: {
            organizationId: 'default-org',
            name: 'ShafayH',
            username: 'shafay.h',
            password: hashedPassword,
            role: 'Administrator',
            lastActive: new Date(),
        },
    });

    console.log('Admin user created:', user);

    // Seed Designations
    const designations = [
        { name: 'Director', description: 'Executive director role' },
        { name: 'General Manager', description: 'General management role' },
        { name: 'Merchandiser', description: 'Merchandising and product role' },
        { name: 'Sample Manager', description: 'Sample management and coordination' },
        { name: 'Production Manager', description: 'Production oversight and management' },
        { name: 'Store', description: 'Store operations' },
    ];

    for (const designation of designations) {
        await prisma.designation.upsert({
            where: { name: designation.name },
            update: { description: designation.description },
            create: {
                organizationId: 'default-org',
                ...designation,
            },
        });
    }

    console.log('Designations seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
