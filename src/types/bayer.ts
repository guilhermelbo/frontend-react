// Types for Bayer Microservice

export interface Balance {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Delivery {
  id: string;
  balanceId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  details?: string;
}

export interface PendingItem {
  id: string;
  balanceId: string;
  type: 'consume' | 'fix' | 'approve' | 'reject';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  amount?: number;
  reason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeliveryRequest {
  balanceId: string;
}

export interface CreateDeliveryResponse {
  delivery: Delivery;
  message: string;
}

export interface PendingListResponse {
  items: PendingItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PendingActionRequest {
  action: 'consume' | 'fix' | 'approve' | 'reject';
  itemId: string;
  amount?: number;
  reason?: string;
}

export interface PendingActionResponse {
  success: boolean;
  message: string;
  item?: PendingItem;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}
