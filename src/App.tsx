import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SWRConfig } from 'swr';
import HomePage from './pages/HomePage';
import DeliveriesPage from './pages/DeliveriesPage';
import PendingListPage from './pages/PendingListPage';
import './index.css';

function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        onError: (error) => {
          console.error('SWR Error:', error);
        },
      }}
    >
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Navigation Bar */}
          <nav className="bg-white shadow-lg mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link
                    to="/"
                    className="flex items-center px-2 py-2 text-gray-900 font-bold text-xl"
                  >
                    🏥 Bayer Microfrontend
                  </Link>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/deliveries"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-150"
                    >
                      📦 Entregas
                    </Link>
                    <Link
                      to="/pending-list"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-150"
                    >
                      📋 Lista Pendente
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/deliveries" element={<DeliveriesPage />} />
              <Route path="/pending-list" element={<PendingListPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-gray-500 text-sm">
                © 2026 Bayer Microfrontend - Integração com Microserviço Bayer
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </SWRConfig>
  );
}

export default App;
