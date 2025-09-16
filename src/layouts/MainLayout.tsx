import React from 'react';
import { Navbar } from '../components/Navbar';
import { CartSidebar } from '../components/CartSidebar';
import { Truck, Clock, Shield } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Hero Section */}
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fresh Fruits Delivered to Your Door
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Order fresh, hand-picked fruits from local farms
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Truck className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mt-4 font-semibold">Same Day Delivery</h3>
              <p className="text-sm text-gray-600">Order before 2 PM</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mt-4 font-semibold">Fresh Pick</h3>
              <p className="text-sm text-gray-600">Harvested daily</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mt-4 font-semibold">Quality Guarantee</h3>
              <p className="text-sm text-gray-600">100% satisfaction</p>
            </div>
          </div>
        </div>

        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2024 FreshFruits. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}