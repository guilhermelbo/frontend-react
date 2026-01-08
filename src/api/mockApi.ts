import type {
  Delivery,
  CreateDeliveryRequest,
  CreateDeliveryResponse,
  PendingListResponse,
  PendingActionRequest,
  PendingActionResponse,
  PendingItem,
} from '../types/bayer';
import { mockDeliveries, mockPendingItems, generateDeliveryId } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage (simulating database)
let deliveries: Delivery[] = [...mockDeliveries];
let pendingItems: PendingItem[] = [...mockPendingItems];

// Delivery endpoints mock
export const mockDeliveryApi = {
  /**
   * Create a new delivery with the given balance ID
   */
  createDelivery: async (request: CreateDeliveryRequest): Promise<CreateDeliveryResponse> => {
    await delay(500); // Simulate network delay

    const newDelivery: Delivery = {
      id: generateDeliveryId(),
      balanceId: request.balanceId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      details: 'Entrega criada',
    };

    deliveries.unshift(newDelivery);

    return {
      delivery: newDelivery,
      message: 'Entrega criada com sucesso',
    };
  },

  /**
   * Get all deliveries
   */
  getAllDeliveries: async (): Promise<Delivery[]> => {
    await delay(300); // Simulate network delay
    return [...deliveries];
  },

  /**
   * Get a specific delivery by ID
   */
  getDeliveryById: async (id: string): Promise<Delivery> => {
    await delay(200); // Simulate network delay
    
    const delivery = deliveries.find(d => d.id === id);
    if (!delivery) {
      throw new Error(`Entrega com ID ${id} não encontrada`);
    }
    
    return delivery;
  },
};

// Pending list endpoints mock
export const mockPendingListApi = {
  /**
   * Get the pending list with pagination
   */
  getPendingList: async (page = 1, pageSize = 10): Promise<PendingListResponse> => {
    await delay(400); // Simulate network delay

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = pendingItems.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      total: pendingItems.length,
      page,
      pageSize,
    };
  },

  /**
   * Execute an action on a pending item
   */
  executePendingAction: async (request: PendingActionRequest): Promise<PendingActionResponse> => {
    await delay(600); // Simulate network delay

    const itemIndex = pendingItems.findIndex(item => item.id === request.itemId);
    
    if (itemIndex === -1) {
      throw new Error(`Item com ID ${request.itemId} não encontrado`);
    }

    const item = pendingItems[itemIndex];
    
    // Update item based on action
    const updatedItem: PendingItem = {
      ...item,
      status: 'completed',
      updatedAt: new Date().toISOString(),
    };

    // Apply action-specific updates
    if (request.action === 'consume' || request.action === 'fix') {
      if (request.amount !== undefined) {
        updatedItem.amount = request.amount;
      }
    }

    if (request.reason) {
      updatedItem.reason = request.reason;
    }

    pendingItems[itemIndex] = updatedItem;

    const actionMessages: Record<string, string> = {
      consume: 'Saldo consumido com sucesso',
      fix: 'Saldo fixado com sucesso',
      approve: 'Item aprovado com sucesso',
      reject: 'Item rejeitado com sucesso',
    };

    return {
      success: true,
      message: actionMessages[request.action] || 'Ação executada com sucesso',
      item: updatedItem,
    };
  },

  /**
   * Consume balance for a pending item
   */
  consumeBalance: async (itemId: string, amount?: number): Promise<PendingActionResponse> => {
    return mockPendingListApi.executePendingAction({
      action: 'consume',
      itemId,
      amount,
    });
  },

  /**
   * Fix balance for a pending item
   */
  fixBalance: async (itemId: string, amount?: number, reason?: string): Promise<PendingActionResponse> => {
    return mockPendingListApi.executePendingAction({
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
    return mockPendingListApi.executePendingAction({
      action: 'approve',
      itemId,
    });
  },

  /**
   * Reject a pending item
   */
  rejectPendingItem: async (itemId: string, reason?: string): Promise<PendingActionResponse> => {
    return mockPendingListApi.executePendingAction({
      action: 'reject',
      itemId,
      reason,
    });
  },
};
