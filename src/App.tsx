import React from 'react';
import { Plus } from 'lucide-react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { FruitCard } from './components/FruitCard';
import { CategoryFilter } from './components/CategoryFilter';
import { AddFruitModal } from './components/AddFruitModal';
import { CartProvider } from './context/CartContext';
import { FruitsProvider, useFruits } from './context/FruitsContext';
import { UserProvider, useUser } from './context/UserContext';
import { LoginPage } from './pages/LoginPage';
import { MainLayout } from './layouts/MainLayout';

function ProductGrid() {
  const { filteredFruits } = useFruits();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Fruits</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Fruit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFruits.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No fruits found matching your search criteria.
          </div>
        ) : (
          filteredFruits.map((fruit) => (
            <FruitCard key={fruit.id} {...fruit} />
          ))
        )}
      </div>

      <AddFruitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  );
}

function DashboardPage() {
  return (
    <FruitsProvider>
      <CartProvider>
        <MainLayout>
          <CategoryFilter />
          <ProductGrid />
        </MainLayout>
      </CartProvider>
    </FruitsProvider>
  );
}

function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function LoginRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <LoginPage />;
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route
            path="/"
            element={(
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
