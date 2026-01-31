import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const buyerName = 'Test Buyer';
    const existing = await prisma.buyer.findFirst({ where: { name: buyerName } });

    if (!existing) {
        await prisma.buyer.create({
            data: {
                organizationId: 'default-org',
                name: buyerName,
                country: 'Testland',
                paymentTerms: 'LC',
                incoterms: 'FOB'
            }
        });
        console.log(`Buyer ${buyerName} seeded.`);
    } else {
        console.log(`Buyer ${buyerName} already exists.`);
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
