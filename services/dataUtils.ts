
import { Order, NewOrderState, FittingData, SizeGroup, ColorRow, BOMItem } from '../types';

export const getBuyerName = (buyer: any): string => {
    if (!buyer) return '';
    if (typeof buyer === 'string') return buyer;
    if (typeof buyer === 'object' && 'name' in buyer) return buyer.name;
    return String(buyer);
};

export const deepParseOrder = (order: any): Order => {
    if (!order) return order;

    const safeParse = (data: any, fallback: any) => {
        if (typeof data === 'string') {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error("DeepParse Error:", e, data);
                return fallback;
            }
        }
        return data || fallback;
    };

    return {
        ...order,
        buyer: getBuyerName(order.buyer),
        colors: safeParse(order.colors, []),
        fitting: safeParse(order.fitting, []),
        embellishments: safeParse(order.embellishments, []),
        washing: safeParse(order.washing, {}),
        finishing: safeParse(order.finishing, { finalInspectionStatus: 'Pending', packingList: [] }),
        criticalPath: safeParse(order.criticalPath, {
            capacity: { totalOrderQty: order.quantity || 0 },
            schedule: []
        }),
        skippedStages: safeParse(order.skippedStages, []),
        sizeGroups: (order.sizeGroups || []).map((sg: any) => ({
            ...sg,
            sizes: safeParse(sg.sizes, []),
            colors: safeParse(sg.colors, []),
            breakdown: safeParse(sg.breakdown, {})
        })),
        bom: (order.bom || []).map((item: any) => ({
            ...item,
            usageData: safeParse(item.usageData, { generic: 0 })
        }))
    };
};

export const mapOrderToNewOrderState = (order: Order): NewOrderState => {
    const parsed = deepParseOrder(order);

    return {
        generalInfo: {
            formData: {
                jobNumber: parsed.orderID || '',
                buyerName: (parsed.buyer as any)?.name || parsed.buyer || '',
                merchandiserName: parsed.merchandiserName || '',
                factoryRef: parsed.factoryRef || '',
                styleNumber: parsed.styleNo || '',
                productID: parsed.id || '',
                poNumber: parsed.poNumber || '',
                poDate: parsed.poDate || '',
                shipDate: parsed.deliveryDate || '',
                plannedDate: parsed.plannedDate || '',
                shipMode: (parsed.shipMode as any) || 'Sea',
                description: parsed.styleDescription || '',
                incoterms: parsed.incoterms || '',
            },
            styleImage: parsed.imageUrl || null,
            colors: parsed.colors as any,
            sizeGroups: parsed.sizeGroups as any
        },
        fitting: parsed.fitting as any[],
        sampling: parsed.samplingDetails || [],
        embellishments: parsed.embellishments as any[],
        washing: parsed.washing as any,
        finishing: parsed.finishing as any,
        criticalPath: parsed.criticalPath as any,
        bom: parsed.bom as any[],
        bomStatus: parsed.bomStatus || 'Draft',
        planningNotes: parsed.planningNotes || '',
        skippedStages: parsed.skippedStages as string[]
    };
};
