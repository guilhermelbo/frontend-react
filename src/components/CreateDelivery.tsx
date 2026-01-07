import React, { useState } from 'react';
import { useCreateDelivery } from '../hooks/useBayerApi';

const CreateDelivery: React.FC = () => {
  const [balanceId, setBalanceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { createDelivery } = useCreateDelivery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!balanceId.trim()) {
      setError('Por favor, insira um ID de saldo válido');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await createDelivery(balanceId);
      setSuccess(`Entrega criada com sucesso! ID: ${response.delivery.id}`);
      setBalanceId('');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar entrega');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Criar Nova Entrega</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="balanceId" className="block text-sm font-medium text-gray-700 mb-2">
            ID do Saldo
          </label>
          <input
            type="text"
            id="balanceId"
            value={balanceId}
            onChange={(e) => setBalanceId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite o ID do saldo"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
        >
          {loading ? 'Criando...' : 'Criar Entrega'}
        </button>
      </form>
    </div>
  );
};

export default CreateDelivery;
