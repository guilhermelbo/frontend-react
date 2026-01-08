import axios, { AxiosError } from 'axios';
import type {
  Delivery,
  CreateDeliveryRequest,
  CreateDeliveryResponse,
  PendingListResponse,
  PendingActionRequest,
  PendingActionResponse,
  ApiError,
} from '../types/bayer';
import { mockDeliveryApi, mockPendingListApi } from './mockApi';

// Configure the base URL for the Bayer microservice
// In production, this should come from environment variables
const API_BASE_URL = import.meta.env.VITE_BAYER_API_URL || 'http://localhost:8080/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'; // Default to true

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An error occurred',
      code: error.response?.data?.code || error.code,
      details: error.response?.data?.details,
    };
    return Promise.reject(apiError);
  }
);

// Delivery endpoints
export const deliveryApi = {
  /**
   * Create a new delivery with the given balance ID
   */
  createDelivery: async (request: CreateDeliveryRequest): Promise<CreateDeliveryResponse> => {
    if (USE_MOCK_API) {
      return mockDeliveryApi.createDelivery(request);
    }
    const response = await apiClient.post<CreateDeliveryResponse>('/deliveries', request);
    return response.data;
  },

  /**
   * Get all deliveries
   */
  getAllDeliveries: async (): Promise<Delivery[]> => {
    if (USE_MOCK_API) {
      return mockDeliveryApi.getAllDeliveries();
    }
    const response = await apiClient.get<Delivery[]>('/deliveries');
    return response.data;
  },

  /**
   * Get a specific delivery by ID
   */
  getDeliveryById: async (id: string): Promise<Delivery> => {
    if (USE_MOCK_API) {
      return mockDeliveryApi.getDeliveryById(id);
    }
    const response = await apiClient.get<Delivery>(`/deliveries/${id}`);
    return response.data;
  },
};

// Pending list endpoints
export const pendingListApi = {
  /**
   * Get the pending list with pagination
   */
  getPendingList: async (page = 1, pageSize = 10): Promise<PendingListResponse> => {
    if (USE_MOCK_API) {
      return mockPendingListApi.getPendingList(page, pageSize);
    }
    const response = await apiClient.get<PendingListResponse>('/pending-list', {
      params: { page, pageSize },
    });
    return response.data;
  },

  /**
   * Execute an action on a pending item
   */
  executePendingAction: async (request: PendingActionRequest): Promise<PendingActionResponse> => {
    if (USE_MOCK_API) {
      return mockPendingListApi.executePendingAction(request);
    }
    const response = await apiClient.post<PendingActionResponse>(
      `/pending-list/${request.itemId}/action`,
      {
        action: request.action,
        amount: request.amount,
        reason: request.reason,
      }
    );
    return response.data;
  },

  /**
   * Consume balance for a pending item
   */
  consumeBalance: async (itemId: string, amount?: number): Promise<PendingActionResponse> => {
    return pendingListApi.executePendingAction({
      action: 'consume',
      itemId,
      amount,
    });
  },

  /**
   * Fix balance for a pending item
   */
  fixBalance: async (itemId: string, amount?: number, reason?: string): Promise<PendingActionResponse> => {
    return pendingListApi.executePendingAction({
      action: 'fix',
      itemId,
      amount,
      reason,
    });
  },

  /**
   * Approve a pending item
   */
  approvePendingItem: async (itemId: string): Promise<PendingActionResponse> => {
    return pendingListApi.executePendingAction({
      action: 'approve',
      itemId,
    });
  },

  /**
   * Reject a pending item
   */
  rejectPendingItem: async (itemId: string, reason?: string): Promise<PendingActionResponse> => {
    return pendingListApi.executePendingAction({
      action: 'reject',
      itemId,
      reason,
    });
  },
};

export default apiClient;
