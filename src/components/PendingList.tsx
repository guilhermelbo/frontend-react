import React, { useState } from 'react';
import { usePendingList, usePendingActions } from '../hooks/useBayerApi';
import type { PendingItem } from '../types/bayer';

const PendingList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { pendingList, isLoading, isError, mutate } = usePendingList(page, pageSize);
  const { consumeBalance, fixBalance, approveItem, rejectItem } = usePendingActions();
  
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PendingItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<'consume' | 'fix' | 'approve' | 'reject'>('consume');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleAction = async (item: PendingItem, action: 'consume' | 'fix' | 'approve' | 'reject') => {
    setSelectedItem(item);
    setModalAction(action);
    setAmount('');
    setReason('');
    setShowModal(true);
    setActionError(null);
    setActionSuccess(null);
  };

  const executeAction = async () => {
    if (!selectedItem) return;

    setActionLoading(selectedItem.id);
    setActionError(null);
    setActionSuccess(null);

    try {
      let response;
      switch (modalAction) {
        case 'consume':
          response = await consumeBalance(selectedItem.id, amount ? parseFloat(amount) : undefined);
          break;
        case 'fix':
          response = await fixBalance(selectedItem.id, amount ? parseFloat(amount) : undefined, reason || undefined);
          break;
        case 'approve':
          response = await approveItem(selectedItem.id);
          break;
        case 'reject':
          response = await rejectItem(selectedItem.id, reason || undefined);
          break;
      }
      
      setActionSuccess(response.message);
      setShowModal(false);
      mutate();
    } catch (err: any) {
      setActionError(err.message || 'Erro ao executar ação');
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          Erro ao carregar lista pendente. Tente novamente.
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'processing':
        return 'Processando';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'consume':
        return 'Consumir';
      case 'fix':
        return 'Fixar';
      case 'approve':
        return 'Aprovar';
      case 'reject':
        return 'Rejeitar';
      default:
        return type;
    }
  };

  const totalPages = pendingList ? Math.ceil(pendingList.total / pageSize) : 1;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Lista Pendente</h2>
        <button
          onClick={() => mutate()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Atualizar
        </button>
      </div>

      {actionSuccess && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {actionSuccess}
        </div>
      )}

      {actionError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {actionError}
        </div>
      )}

      {!pendingList || pendingList.items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum item pendente encontrado
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID do Saldo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingList.items.map((item: PendingItem) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.balanceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getTypeText(item.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.amount || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleAction(item, 'consume')}
                        disabled={actionLoading === item.id}
                        className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                      >
                        Consumir
                      </button>
                      <button
                        onClick={() => handleAction(item, 'fix')}
                        disabled={actionLoading === item.id}
                        className="text-purple-600 hover:text-purple-900 disabled:text-gray-400"
                      >
                        Fixar
                      </button>
                      <button
                        onClick={() => handleAction(item, 'approve')}
                        disabled={actionLoading === item.id}
                        className="text-green-600 hover:text-green-900 disabled:text-gray-400"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleAction(item, 'reject')}
                        disabled={actionLoading === item.id}
                        className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                      >
                        Rejeitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando {(page - 1) * pageSize + 1} a {Math.min(page * pageSize, pendingList.total)} de {pendingList.total} itens
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal for action confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {modalAction === 'consume' && 'Consumir Saldo'}
                {modalAction === 'fix' && 'Fixar Saldo'}
                {modalAction === 'approve' && 'Aprovar Item'}
                {modalAction === 'reject' && 'Rejeitar Item'}
              </h3>
              
              {(modalAction === 'consume' || modalAction === 'fix') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor (opcional)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite o valor"
                  />
                </div>
              )}
              
              {(modalAction === 'fix' || modalAction === 'reject') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo {modalAction === 'reject' ? '' : '(opcional)'}
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite o motivo"
                    rows={3}
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={executeAction}
                  disabled={!!actionLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {actionLoading ? 'Processando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingList;
