import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const username = 'admin@nizamia.com';
    const password = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await prisma.user.findUnique({
        where: { username }
    });

    if (!existingUser) {
        console.log(`Creating user ${username}...`);
        await prisma.user.create({
            data: {
                name: 'Shariq K',
                username,
                password: hashedPassword,
                role: 'Administrator',
                organizationId: 'default-org'
            }
        });
        console.log(`User ${username} created successfully.`);
    } else {
        console.log(`User ${username} already exists.`);
        // Optional: Update password if needed
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
