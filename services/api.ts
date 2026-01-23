
import axios from 'axios';
import { SystemUser, Order, NewOrderState } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add token
apiClient.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const { token } = JSON.parse(user);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const authService = {
    login: async (credentials: any) => {
        const response = await apiClient.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    register: async (userData: any) => {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },
    getUsers: async () => {
        const response = await apiClient.get('/auth');
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('user');
    }
};

export const orderService = {
    getAll: async () => {
        const response = await apiClient.get('/orders');
        return response.data;
    },
    create: async (orderData: any) => {
        const response = await apiClient.post('/orders', orderData);
        return response.data;
    },
    update: async (id: string, orderData: any) => {
        const response = await apiClient.put(`/orders/${id}`, orderData);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/orders/${id}`);
        return response.data;
    }
};

export const designationService = {
    getAll: async () => {
        const response = await apiClient.get('/designations');
        return response.data;
    },
    create: async (data: any) => {
        const response = await apiClient.post('/designations', data);
        return response.data;
    },
    update: async (id: string, data: any) => {
        const response = await apiClient.put(`/designations/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiClient.delete(`/designations/${id}`);
        return response.data;
    }
};

export const settingsService = {
    getSettings: async () => {
        const response = await apiClient.get('/settings/settings');
        return response.data;
    },
    getLocations: async () => {
        const response = await apiClient.get('/settings/locations');
        return response.data;
    },
    getSalesTerms: async () => {
        const response = await apiClient.get('/settings/sales-terms');
        return response.data;
    },
    getPOTerms: async () => {
        const response = await apiClient.get('/settings/po-terms');
        return response.data;
    },
    getThreadOperations: async () => {
        const response = await apiClient.get('/settings/thread-operations');
        return response.data;
    },
    getMachineFactors: async () => {
        const response = await apiClient.get('/settings/machine-factors');
        return response.data;
    },
    getGarmentTemplates: async () => {
        const response = await apiClient.get('/settings/garment-templates');
        return response.data;
    },
    getProductionLines: async () => {
        const response = await apiClient.get('/settings/production-lines');
        return response.data;
    },
    getMonthlyTargets: async () => {
        const response = await apiClient.get('/settings/monthly-targets');
        return response.data;
    },
    getPackingInstructions: async () => {
        const response = await apiClient.get('/settings/packing-instructions');
        return response.data;
    },
    getProcessSteps: async () => {
        const response = await apiClient.get('/settings/process-steps');
        return response.data;
    }
};


export const api = {
    // Auth
    login: authService.login,
    register: authService.register,
    getUsers: authService.getUsers,
    logout: authService.logout,

    // Orders
    getOrders: orderService.getAll,
    createOrder: orderService.create,
    updateOrder: orderService.update,
    deleteOrder: orderService.delete,

    // Designations
    getDesignations: designationService.getAll,
    createDesignation: designationService.create,
    updateDesignation: designationService.update,
    deleteDesignation: designationService.delete,

    // Settings
    getSettings: settingsService.getSettings,
    getLocations: settingsService.getLocations,
    getSalesTerms: settingsService.getSalesTerms,
    getPOTerms: settingsService.getPOTerms,
    getThreadOperations: settingsService.getThreadOperations,
    getMachineFactors: settingsService.getMachineFactors,
    getGarmentTemplates: settingsService.getGarmentTemplates,
    getProductionLines: settingsService.getProductionLines,
    getMonthlyTargets: settingsService.getMonthlyTargets,
    getPackingInstructions: settingsService.getPackingInstructions,
    getProcessSteps: settingsService.getProcessSteps,
};

export default api;