
import { Order, NewOrderState, FittingData, SizeGroup, ColorRow, BOMItem, SampleRow } from '../types';

export const getBuyerName = (buyer: any): string => {
    if (!buyer) return '';
    if (typeof buyer === 'string') return buyer;
    if (typeof buyer === 'object' && 'name' in buyer) return buyer.name;
    return String(buyer);
};

// Helper to format ISO date to YYYY-MM-DD for form inputs
const formatDateForInput = (dateValue: any): string => {
    if (!dateValue) return '';
    if (typeof dateValue === 'string') {
        // If already in YYYY-MM-DD format, return as-is
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) return dateValue;
        // If ISO format, extract date part
        if (dateValue.includes('T')) return dateValue.split('T')[0];
        return dateValue;
    }
    // If Date object
    if (dateValue instanceof Date) {
        return dateValue.toISOString().split('T')[0];
    }
    return '';
};

// Helper to extract unique colors from sizeGroups
const extractColorsFromSizeGroups = (sizeGroups: any[]): ColorRow[] => {
    if (!sizeGroups || sizeGroups.length === 0) return [];

    const colorMap = new Map<string, ColorRow>();
    sizeGroups.forEach((group: any) => {
        const colors = group.colors || [];
        colors.forEach((color: any) => {
            if (color && color.id && !colorMap.has(color.id)) {
                colorMap.set(color.id, { id: color.id, name: color.name || '' });
            }
        });
    });

    return Array.from(colorMap.values());
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

    // Parse sizeGroups first so we can extract colors if needed
    const parsedSizeGroups = (order.sizeGroups || []).map((sg: any) => ({
        ...sg,
        sizes: safeParse(sg.sizes, []),
        colors: safeParse(sg.colors, []),
        breakdown: safeParse(sg.breakdown, {})
    }));

    // Parse top-level colors, or extract from sizeGroups if empty
    let parsedColors = safeParse(order.colors, []);
    if ((!parsedColors || parsedColors.length === 0) && parsedSizeGroups.length > 0) {
        parsedColors = extractColorsFromSizeGroups(parsedSizeGroups);
    }

    return {
        ...order,
        buyer: getBuyerName(order.buyer),
        colors: parsedColors,
        fitting: safeParse(order.fitting, []),
        embellishments: safeParse(order.embellishments, []),
        washing: safeParse(order.washing, {}),
        finishing: safeParse(order.finishing, { finalInspectionStatus: 'Pending', packingList: [] }),
        criticalPath: safeParse(order.criticalPath, {
            capacity: { totalOrderQty: order.quantity || 0 },
            schedule: []
        }),
        skippedStages: safeParse(order.skippedStages, []),
        sizeGroups: parsedSizeGroups,
        bom: (order.bom || []).map((item: any) => ({
            ...item,
            usageData: safeParse(item.usageData, { generic: 0 })
        })),
        samplingDetails: (order.samplingDetails || []).map((sample: any) => ({
            ...sample,
            // Ensure id field exists for frontend usage
            id: sample.id || sample._id || `sample-${Math.random().toString(36).substr(2, 9)}`
        }))
    };
};

export const mapOrderToNewOrderState = (order: Order): NewOrderState => {
    const parsed = deepParseOrder(order);

    // Ensure colors are available (derive from sizeGroups if needed)
    let colors = parsed.colors as ColorRow[] || [];
    if (colors.length === 0 && parsed.sizeGroups && parsed.sizeGroups.length > 0) {
        colors = extractColorsFromSizeGroups(parsed.sizeGroups);
    }

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
                poDate: formatDateForInput(parsed.poDate),
                shipDate: formatDateForInput(parsed.deliveryDate),
                plannedDate: formatDateForInput(parsed.plannedDate),
                shipMode: (parsed.shipMode as any) || 'Sea',
                description: parsed.styleDescription || '',
                incoterms: parsed.incoterms || '',
            },
            styleImage: parsed.imageUrl || null,
            colors: colors,
            sizeGroups: parsed.sizeGroups as SizeGroup[] || []
        },
        fitting: parsed.fitting as any[] || [],
        sampling: parsed.samplingDetails as SampleRow[] || [],
        embellishments: parsed.embellishments as any[] || [],
        washing: parsed.washing as any || {},
        finishing: {
            finalInspectionStatus: (parsed.finishing as any)?.finalInspectionStatus || 'Pending',
            packingList: Array.isArray((parsed.finishing as any)?.packingList) ? (parsed.finishing as any).packingList : []
        },
        criticalPath: parsed.criticalPath as any,
        bom: parsed.bom as any[] || [],
        bomStatus: parsed.bomStatus || 'Draft',
        planningNotes: parsed.planningNotes || '',
        skippedStages: parsed.skippedStages as string[] || []
    };
};
