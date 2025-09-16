import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FruitCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export function FruitCard(fruit: FruitCardProps) {
  const { addToCart } = useCart();
  const { name, price, image, category } = fruit;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white">
          <Heart className="w-5 h-5 text-rose-500" />
        </button>
        <span className="absolute top-3 left-3 px-2 py-1 bg-blue-500 text-white text-sm rounded-full">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(fruit)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}