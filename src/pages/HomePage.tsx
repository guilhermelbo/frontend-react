import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Bem-vindo ao Microfrontend Bayer
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Gerencie entregas e lista pendente do microserviço Bayer
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          to="/deliveries"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 border-2 border-blue-500"
        >
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Entregas</h2>
          <p className="text-gray-600">
            Criar e visualizar todas as entregas
          </p>
        </Link>

        <Link
          to="/pending-list"
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 border-2 border-purple-500"
        >
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lista Pendente</h2>
          <p className="text-gray-600">
            Visualizar e executar ações na lista pendente
          </p>
        </Link>
      </div>

      <div className="mt-12 max-w-4xl mx-auto bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Funcionalidades Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Entregas:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Criar entrega com ID de saldo</li>
              <li>Visualizar todas as entregas</li>
              <li>Atualização automática da lista</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Lista Pendente:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Visualizar itens pendentes</li>
              <li>Consumir saldo</li>
              <li>Fixar saldo</li>
              <li>Aprovar/Rejeitar itens</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
