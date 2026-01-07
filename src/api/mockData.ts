import type { Delivery, PendingItem } from '../types/bayer';

// Helper function to generate relative dates
const getRelativeDate = (hoursAgo: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Mock data for deliveries
export const mockDeliveries: Delivery[] = [
  {
    id: 'del-001',
    balanceId: 'bal-123',
    status: 'completed',
    createdAt: getRelativeDate(48),
    updatedAt: getRelativeDate(24),
    details: 'Entrega concluída com sucesso',
  },
  {
    id: 'del-002',
    balanceId: 'bal-456',
    status: 'in_progress',
    createdAt: getRelativeDate(36),
    updatedAt: getRelativeDate(12),
    details: 'Entrega em processamento',
  },
  {
    id: 'del-003',
    balanceId: 'bal-789',
    status: 'pending',
    createdAt: getRelativeDate(6),
    updatedAt: getRelativeDate(6),
    details: 'Aguardando processamento',
  },
  {
    id: 'del-004',
    balanceId: 'bal-321',
    status: 'failed',
    createdAt: getRelativeDate(72),
    updatedAt: getRelativeDate(70),
    details: 'Erro ao processar entrega',
  },
  {
    id: 'del-005',
    balanceId: 'bal-654',
    status: 'completed',
    createdAt: getRelativeDate(60),
    updatedAt: getRelativeDate(55),
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
    createdAt: getRelativeDate(8),
    updatedAt: getRelativeDate(8),
  },
  {
    id: 'pend-002',
    balanceId: 'bal-222',
    type: 'fix',
    status: 'pending',
    amount: 2300.75,
    reason: 'Ajuste de saldo necessário',
    createdAt: getRelativeDate(6),
    updatedAt: getRelativeDate(6),
  },
  {
    id: 'pend-003',
    balanceId: 'bal-333',
    type: 'approve',
    status: 'processing',
    createdAt: getRelativeDate(5),
    updatedAt: getRelativeDate(4),
  },
  {
    id: 'pend-004',
    balanceId: 'bal-444',
    type: 'consume',
    status: 'pending',
    amount: 5000.00,
    createdAt: getRelativeDate(2),
    updatedAt: getRelativeDate(2),
  },
  {
    id: 'pend-005',
    balanceId: 'bal-555',
    type: 'reject',
    status: 'completed',
    reason: 'Saldo insuficiente',
    createdAt: getRelativeDate(32),
    updatedAt: getRelativeDate(30),
  },
  {
    id: 'pend-006',
    balanceId: 'bal-666',
    type: 'fix',
    status: 'pending',
    amount: 750.25,
    createdAt: getRelativeDate(3),
    updatedAt: getRelativeDate(3),
  },
  {
    id: 'pend-007',
    balanceId: 'bal-777',
    type: 'consume',
    status: 'failed',
    amount: 3200.00,
    reason: 'Timeout ao processar',
    createdAt: getRelativeDate(10),
    updatedAt: getRelativeDate(9),
  },
];

// Helper to generate unique IDs
let deliveryCounter = mockDeliveries.length + 1;
export const generateDeliveryId = () => `del-${String(deliveryCounter++).padStart(3, '0')}`;
