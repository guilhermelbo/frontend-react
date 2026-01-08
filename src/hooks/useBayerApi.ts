import useSWR, { mutate } from 'swr';
import type { Delivery, PendingListResponse, PendingActionRequest, PendingActionResponse } from '../types/bayer';
import { deliveryApi, pendingListApi } from '../api/bayerApi';

/**
 * Hook to fetch all deliveries
 */
export function useDeliveries() {
  const { data, error, isLoading } = useSWR<Delivery[]>(
    '/deliveries',
    deliveryApi.getAllDeliveries,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    deliveries: data,
    isLoading,
    isError: error,
    mutate: () => mutate('/deliveries'),
  };
}

/**
 * Hook to fetch a specific delivery by ID
 */
export function useDelivery(id: string | null) {
  const { data, error, isLoading } = useSWR<Delivery>(
    id ? `/deliveries/${id}` : null,
    id ? () => deliveryApi.getDeliveryById(id) : null,
    {
      revalidateOnFocus: true,
    }
  );

  return {
    delivery: data,
    isLoading,
    isError: error,
  };
}

/**
 * Hook to fetch pending list with pagination
 */
export function usePendingList(page = 1, pageSize = 10) {
  const { data, error, isLoading } = useSWR<PendingListResponse>(
    `/pending-list?page=${page}&pageSize=${pageSize}`,
    () => pendingListApi.getPendingList(page, pageSize),
    {
      refreshInterval: 10000, // Refresh every 10 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    pendingList: data,
    isLoading,
    isError: error,
    mutate: () => mutate(`/pending-list?page=${page}&pageSize=${pageSize}`),
  };
}

/**
 * Hook to create a delivery
 */
export function useCreateDelivery() {
  const createDelivery = async (balanceId: string) => {
    try {
      const response = await deliveryApi.createDelivery({ balanceId });
      // Revalidate deliveries list after creation
      mutate('/deliveries');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { createDelivery };
}

/**
 * Hook to execute pending list actions
 */
export function usePendingActions() {
  const executeAction = async (request: PendingActionRequest): Promise<PendingActionResponse> => {
    try {
      const response = await pendingListApi.executePendingAction(request);
      // Revalidate pending list after action
      mutate((key) => typeof key === 'string' && key.startsWith('/pending-list'));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const consumeBalance = async (itemId: string, amount?: number) => {
    return executeAction({ action: 'consume', itemId, amount });
  };

  const fixBalance = async (itemId: string, amount?: number, reason?: string) => {
    return executeAction({ action: 'fix', itemId, amount, reason });
  };

  const approveItem = async (itemId: string) => {
    return executeAction({ action: 'approve', itemId });
  };

  const rejectItem = async (itemId: string, reason?: string) => {
    return executeAction({ action: 'reject', itemId, reason });
  };

  return {
    executeAction,
    consumeBalance,
    fixBalance,
    approveItem,
    rejectItem,
  };
}
