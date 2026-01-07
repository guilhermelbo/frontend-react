import type { Delivery, PendingItem } from '../types/bayer';

// Mock data for deliveries
export const mockDeliveries: Delivery[] = [
  {
    id: 'del-001',
    balanceId: 'bal-123',
    status: 'completed',
    createdAt: '2026-01-07T10:30:00Z',
    updatedAt: '2026-01-07T14:45:00Z',
    details: 'Entrega concluída com sucesso',
  },
  {
    id: 'del-002',
    balanceId: 'bal-456',
    status: 'in_progress',
    createdAt: '2026-01-07T11:15:00Z',
    updatedAt: '2026-01-07T15:20:00Z',
    details: 'Entrega em processamento',
  },
  {
    id: 'del-003',
    balanceId: 'bal-789',
    status: 'pending',
    createdAt: '2026-01-07T13:00:00Z',
    updatedAt: '2026-01-07T13:00:00Z',
    details: 'Aguardando processamento',
  },
  {
    id: 'del-004',
    balanceId: 'bal-321',
    status: 'failed',
    createdAt: '2026-01-06T09:00:00Z',
    updatedAt: '2026-01-06T10:30:00Z',
    details: 'Erro ao processar entrega',
  },
  {
    id: 'del-005',
    balanceId: 'bal-654',
    status: 'completed',
    createdAt: '2026-01-06T14:20:00Z',
    updatedAt: '2026-01-06T16:45:00Z',
    details: 'Entrega finalizada',
  },
];

// Mock data for pending list
export const mockPendingItems: PendingItem[] = [
  {
    id: 'pend-001',
    balanceId: 'bal-111',
    type: 'consume',
    status: 'pending',
    amount: 1500.50,
    createdAt: '2026-01-07T09:00:00Z',
    updatedAt: '2026-01-07T09:00:00Z',
  },
  {
    id: 'pend-002',
    balanceId: 'bal-222',
    type: 'fix',
    status: 'pending',
    amount: 2300.75,
    reason: 'Ajuste de saldo necessário',
    createdAt: '2026-01-07T10:30:00Z',
    updatedAt: '2026-01-07T10:30:00Z',
  },
  {
    id: 'pend-003',
    balanceId: 'bal-333',
    type: 'approve',
    status: 'processing',
    createdAt: '2026-01-07T11:15:00Z',
    updatedAt: '2026-01-07T12:00:00Z',
  },
  {
    id: 'pend-004',
    balanceId: 'bal-444',
    type: 'consume',
    status: 'pending',
    amount: 5000.00,
    createdAt: '2026-01-07T13:45:00Z',
    updatedAt: '2026-01-07T13:45:00Z',
  },
  {
    id: 'pend-005',
    balanceId: 'bal-555',
    type: 'reject',
    status: 'completed',
    reason: 'Saldo insuficiente',
    createdAt: '2026-01-06T15:20:00Z',
    updatedAt: '2026-01-06T16:30:00Z',
  },
  {
    id: 'pend-006',
    balanceId: 'bal-666',
    type: 'fix',
    status: 'pending',
    amount: 750.25,
    createdAt: '2026-01-07T14:00:00Z',
    updatedAt: '2026-01-07T14:00:00Z',
  },
  {
    id: 'pend-007',
    balanceId: 'bal-777',
    type: 'consume',
    status: 'failed',
    amount: 3200.00,
    reason: 'Timeout ao processar',
    createdAt: '2026-01-07T08:30:00Z',
    updatedAt: '2026-01-07T09:45:00Z',
  },
];

// Helper to generate unique IDs
let deliveryCounter = mockDeliveries.length + 1;
export const generateDeliveryId = () => `del-${String(deliveryCounter++).padStart(3, '0')}`;
