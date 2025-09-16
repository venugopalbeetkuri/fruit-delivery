import React, { createContext, useContext, useState } from 'react';
import type { Fruit } from './FruitsContext';

type CartItem = Pick<Fruit, 'id' | 'name' | 'price' | 'image'> & {
  quantity: number;
  category?: string;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (fruit: Fruit) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (fruit: Fruit) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === fruit.id);

      if (existingItem) {
        return currentItems.map(item =>
          item.id === fruit.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const { id, name, price, image, category } = fruit;
      return [
        ...currentItems,
        { id, name, price, image, category, quantity: 1 },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
