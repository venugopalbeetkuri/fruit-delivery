import React, { createContext, useContext, useState } from 'react';

export interface Fruit {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface FruitsContextType {
  fruits: Fruit[];
  filteredFruits: Fruit[];
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  addFruit: (fruit: Omit<Fruit, 'id'>) => void;
}

const initialFruits = [
  {
    id: 1,
    name: 'Fresh Strawberries',
    price: 4.99,
    category: 'Berries',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 2.99,
    category: 'Tropical',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 3,
    name: 'Dragon Fruit',
    price: 6.99,
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 4,
    name: 'Fresh Oranges',
    price: 3.99,
    category: 'Citrus',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 5,
    name: 'Red Apples',
    price: 2.49,
    category: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 6,
    name: 'Mangoes',
    price: 5.99,
    category: 'Tropical',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=500',
  },
];

const categories = ['All', 'Seasonal', 'Tropical', 'Berries', 'Citrus', 'Exotic'];

const FruitsContext = createContext<FruitsContextType | undefined>(undefined);

export function FruitsProvider({ children }: { children: React.ReactNode }) {
  const [fruits, setFruits] = useState(initialFruits);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addFruit = (newFruit: Omit<Fruit, 'id'>) => {
    const maxId = Math.max(...fruits.map(f => f.id));
    setFruits(prev => [...prev, { ...newFruit, id: maxId + 1 }]);
  };

  const filteredFruits = fruits.filter(fruit => {
    const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || fruit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <FruitsContext.Provider value={{
      fruits,
      filteredFruits,
      searchTerm,
      selectedCategory,
      categories,
      setSearchTerm,
      setSelectedCategory,
      addFruit,
    }}>
      {children}
    </FruitsContext.Provider>
  );
}

export function useFruits() {
  const context = useContext(FruitsContext);
  if (context === undefined) {
    throw new Error('useFruits must be used within a FruitsProvider');
  }
  return context;
}