# Frontend React - Bayer Microservice Integration

Este é um microfrontend React que consome todos os endpoints disponíveis do microserviço Bayer.

## 🚀 Funcionalidades

### Gestão de Entregas
- **Criar Entrega**: Disparar a criação de uma nova entrega recebendo o ID do saldo
- **Visualizar Entregas**: Listar todas as entregas com informações detalhadas de status
- **Atualização Automática**: Os dados são atualizados automaticamente usando SWR

### Lista Pendente
- **Visualizar Lista Pendente**: Exibir todos os itens pendentes com paginação
- **Consumir Saldo**: Executar ação de consumo de saldo em itens pendentes
- **Fixar Saldo**: Executar ação de fixação de saldo com valor e motivo
- **Aprovar Item**: Aprovar itens da lista pendente
- **Rejeitar Item**: Rejeitar itens da lista pendente com motivo

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Framework CSS utilitário
- **SWR** - React Hooks para data fetching com cache
- **Axios** - Cliente HTTP para requisições à API
- **React Router** - Roteamento para aplicação SPA

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/guilhermelbo/frontend-react.git
cd frontend-react

# Instale as dependências
npm install
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure a URL do microserviço Bayer no arquivo `.env`:
```env
VITE_BAYER_API_URL=http://localhost:8080/api
```

## 🏃 Executando o Projeto

### Modo de Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

### Build para Produção
```bash
npm run build
```

### Preview da Build de Produção
```bash
npm run preview
```

### Verificação de Tipos TypeScript
```bash
npm run lint
```

## 📂 Estrutura do Projeto

```
frontend-react/
├── src/
│   ├── api/              # Camada de serviço API
│   │   └── bayerApi.ts   # Cliente e endpoints da API Bayer
│   ├── components/       # Componentes React
│   │   ├── CreateDelivery.tsx
│   │   ├── DeliveriesList.tsx
│   │   └── PendingList.tsx
│   ├── hooks/            # Custom hooks
│   │   └── useBayerApi.ts
│   ├── pages/            # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   ├── DeliveriesPage.tsx
│   │   └── PendingListPage.tsx
│   ├── types/            # Definições de tipos TypeScript
│   │   └── bayer.ts
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globais com Tailwind
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## 🔌 Endpoints da API Bayer

### Entregas
- `POST /api/deliveries` - Criar uma nova entrega
- `GET /api/deliveries` - Listar todas as entregas
- `GET /api/deliveries/:id` - Obter detalhes de uma entrega

### Lista Pendente
- `GET /api/pending-list` - Listar itens pendentes (com paginação)
- `POST /api/pending-list/:id/action` - Executar ação em um item pendente
  - Ações disponíveis: `consume`, `fix`, `approve`, `reject`

## 📱 Interface do Usuário

A aplicação possui três páginas principais:

1. **Home** - Página inicial com links para as funcionalidades
2. **Entregas** - Criar e visualizar entregas
3. **Lista Pendente** - Visualizar e executar ações na lista pendente

Todas as páginas possuem:
- Interface responsiva com Tailwind CSS
- Feedback visual para ações do usuário
- Tratamento de erros
- Loading states
- Atualização automática de dados

## 🧪 Desenvolvimento

### Estrutura de Código
- **Separação de Concerns**: API, componentes, hooks e tipos em pastas separadas
- **TypeScript**: Tipagem forte para maior segurança e autocompleção
- **Custom Hooks**: Lógica reutilizável com SWR para data fetching
- **Componentes Modulares**: Componentes pequenos e focados em uma responsabilidade

### Boas Práticas Implementadas
- Interceptors para autenticação e tratamento de erros
- Cache inteligente com SWR
- Revalidação automática de dados
- Paginação na lista pendente
- Modais para confirmação de ações
- Feedback visual para todas as ações

## 📝 Licença

ISC
