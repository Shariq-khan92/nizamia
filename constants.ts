
import { Order, Buyer, Supplier, Tab, MasterBOMItem, BuyingAgency, BOMItem, ColorRow, SizeGroup, FittingData } from './types';

import {
  LayoutDashboard, ShoppingBag, Layers, Calculator, ShoppingCart,
  Factory, Users, Truck, Package, DollarSign, Settings, FileSpreadsheet,
  Scissors, ClipboardList, BookOpen, CalendarRange, Activity, Tag, Box, Scale, Palette, Image, GanttChartSquare
} from 'lucide-react';

export const LOGO_URL = "https://cdn-icons-png.flaticon.com/512/25/25694.png";

export const NAV_ITEMS = [
  { id: Tab.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { id: Tab.ORDERS, icon: ShoppingBag, label: 'Order Management' },
  { id: Tab.PLANNING, icon: Layers, label: 'Pre-Production Hub' },
  { id: Tab.SAMPLING, icon: Scissors, label: 'Sample Room' },
  { id: Tab.COSTING, icon: Calculator, label: 'Costing' },
  { id: Tab.PURCHASING, icon: ShoppingCart, label: 'Purchasing' },
  { id: Tab.PRODUCTION, icon: Factory, label: 'Production' },
  { id: Tab.BUYERS, icon: Users, label: 'Buyers' },
  { id: Tab.SUPPLIERS, icon: Truck, label: 'Suppliers' },
  { id: Tab.BOM, icon: FileSpreadsheet, label: 'BOM' },
  { id: Tab.FINANCE, icon: DollarSign, label: 'Finance' },
  { id: Tab.SHIPPING, icon: Package, label: 'Shipping' },
  { id: Tab.RESOURCES, icon: BookOpen, label: 'Resources' },
  { id: Tab.SETTINGS, icon: Settings, label: 'Settings' },
];

export const PRODUCTION_TOOLS = [
  {
    id: "costing-generator",
    title: "Costing Sheet",
    icon: FileSpreadsheet,
    color: "text-green-600",
    bg: "bg-green-50"
  },
  {
    id: "parcel-dispatch",
    title: "Parcel Dispatch",
    icon: Box,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    id: "fabric-consumption",
    title: "Fabric Consumption",
    icon: Scissors,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    id: "sewing-thread",
    title: "Sewing Thread",
    icon: Activity,
    color: "text-pink-600",
    bg: "bg-pink-50"
  },
  {
    id: "trims",
    title: "Accessories / Trims",
    icon: Tag,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    id: "cbm",
    title: "CBM Calc",
    icon: Box,
    color: "text-teal-600",
    bg: "bg-teal-50"
  },
  {
    id: "gsm",
    title: "Fabric GSM",
    icon: Scale,
    color: "text-red-600",
    bg: "bg-red-50"
  },
  {
    id: "pantone-converter",
    title: "Pantone Converter",
    icon: Palette,
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  {
    id: "catalogue-maker",
    title: "Catalogue Maker",
    icon: Image,
    color: "text-amber-600",
    bg: "bg-amber-50"
  }
];

export const formatAppDate = (dateString?: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-');
};

export const parseCSVDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const cleanStr = dateStr.trim();
  if (cleanStr.match(/^\d{4}-\d{2}-\d{2}$/)) return cleanStr;

  const parts = cleanStr.split(/[-/ ]/);
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    let monthStr = parts[1];
    let year = parts[2];

    const monthNames: Record<string, string> = {
      'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06',
      'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
    };

    let month = '01';
    if (!isNaN(Number(monthStr))) {
      month = monthStr.padStart(2, '0');
    } else {
      const upperMonth = monthStr.toUpperCase().substring(0, 3);
      month = monthNames[upperMonth] || '01';
    }

    if (year.length === 2) {
      year = '20' + year;
    }

    return `${year}-${month}-${day}`;
  }
  return cleanStr;
};

