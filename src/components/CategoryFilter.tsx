import React from 'react';
import { useFruits } from '../context/FruitsContext';

const categories = ['All', 'Seasonal', 'Tropical', 'Berries', 'Citrus', 'Exotic'];

export function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useFruits();

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full border-2 transition-colors whitespace-nowrap ${
            selectedCategory === category
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}