-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'User',
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buyer" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "website" TEXT,
    "country" TEXT,
    "companyPhone" TEXT,
    "paymentTerms" TEXT,
    "incoterms" TEXT,
    "agentName" TEXT,
    "agentCommission" DOUBLE PRECISION,
    "addresses" TEXT,
    "contacts" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "rating" DOUBLE PRECISION,
    "location" TEXT,
    "contactPerson" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "salesTaxId" TEXT,
    "productLine" TEXT,
    "creditTerms" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "poNumber" TEXT,
    "styleNo" TEXT,
    "buyerId" TEXT,
    "merchandiserName" TEXT,
    "quantity" INTEGER,
    "deliveryDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "amount" DOUBLE PRECISION,
    "price" DOUBLE PRECISION,
    "factoryRef" TEXT,
    "styleName" TEXT,
    "styleDescription" TEXT,
    "fabricName" TEXT,
    "fabricDescription" TEXT,
    "incoterms" TEXT,
    "shipMode" TEXT,
    "imageUrl" TEXT,
    "criticalPath" TEXT,
    "planningNotes" TEXT,
    "statusReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeGroup" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "groupName" TEXT,
    "unitPrice" TEXT,
    "currency" TEXT,
    "sizes" TEXT,
    "colors" TEXT,
    "breakdown" TEXT,

    CONSTRAINT "SizeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BomItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "processGroup" TEXT,
    "componentName" TEXT,
    "itemDetail" TEXT,
    "supplierRef" TEXT,
    "vendor" TEXT,
    "sourcingStatus" TEXT,
    "labStatus" TEXT,
    "leadTimeDays" INTEGER,
    "usageRule" TEXT,
    "usageData" TEXT,
    "wastagePercent" DOUBLE PRECISION,
    "isTestingRequired" BOOLEAN,
    "isApproved" BOOLEAN,
    "uom" TEXT,
    "unitsPerPack" INTEGER,
    "packingUnit" TEXT,

    CONSTRAINT "BomItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleRow" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "samNumber" TEXT,
    "type" TEXT,
    "fabric" TEXT,
    "shade" TEXT,
    "wash" TEXT,
    "baseSize" TEXT,
    "threadColor" TEXT,
    "zipperColor" TEXT,
    "lining" TEXT,
    "quantity" TEXT,
    "deadline" TEXT,
    "status" TEXT,
    "labStatus" TEXT,
    "isTestingRequired" BOOLEAN,
    "isApproved" BOOLEAN,

    CONSTRAINT "SampleRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderID_key" ON "Order"("orderID");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeGroup" ADD CONSTRAINT "SizeGroup_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BomItem" ADD CONSTRAINT "BomItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleRow" ADD CONSTRAINT "SampleRow_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
