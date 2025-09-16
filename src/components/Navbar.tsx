import React from 'react';
import { ShoppingCart, Menu, Search, Apple } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFruits } from '../context/FruitsContext';
import { useUser } from '../context/UserContext';

export function Navbar() {
  const { items, toggleCart } = useCart();
  const { searchTerm, setSearchTerm } = useFruits();
  const { user, logout } = useUser();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Apple className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">FreshFruits</span>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search fruits..."
                className="w-96 px-4 py-2 pl-10 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
            <button className="relative p-2" onClick={toggleCart}>
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}