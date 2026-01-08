import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, ClipboardList, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">
        Bem-vindo ao Microfrontend Bayer
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Gerencie entregas e lista pendente do microserviço Bayer
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link to="/deliveries" className="block">
          <Card className="hover:shadow-lg transition-shadow duration-200 border-2 border-blue-500 h-full">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Package className="h-16 w-16 text-blue-500" />
              </div>
              <CardTitle>Entregas</CardTitle>
              <CardDescription>
                Criar e visualizar todas as entregas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="default">
                Acessar Entregas
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/pending-list" className="block">
          <Card className="hover:shadow-lg transition-shadow duration-200 border-2 border-purple-500 h-full">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <ClipboardList className="h-16 w-16 text-purple-500" />
              </div>
              <CardTitle>Lista Pendente</CardTitle>
              <CardDescription>
                Visualizar e executar ações na lista pendente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="default">
                Acessar Lista Pendente
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="mt-12 max-w-4xl mx-auto bg-blue-50">
        <CardHeader>
          <CardTitle>Funcionalidades Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                Entregas:
              </h4>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Criar entrega com ID de saldo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Visualizar todas as entregas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Atualização automática da lista</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-purple-500" />
                Lista Pendente:
              </h4>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Visualizar itens pendentes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Consumir saldo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Fixar saldo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Aprovar/Rejeitar itens</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
