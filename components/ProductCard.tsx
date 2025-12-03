
import React, { useState } from 'react';
import { Product } from '../types';
import { PlusIcon, MinusIcon, ShoppingCartIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const statusStyles: { [key in Product['estado']]: { bg: string; text: string; label: string } } = {
  Activo: { bg: 'bg-green-100', text: 'text-green-800', label: 'Disponible' },
  Inactivo: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'No disponible' },
  Descontinuado: { bg: 'bg-red-100', text: 'text-red-800', label: 'Descontinuado' },
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { nombre, descripcion, precio, stock, estado, imagen_url } = product;

  const canBeAdded = estado === 'Activo' && stock > 0;
  const maxQuantity = stock;

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > maxQuantity) return maxQuantity;
      return newQuantity;
    });
  };
  
  const handleAddToCartClick = () => {
    if (canBeAdded && quantity > 0 && quantity <= stock) {
      onAddToCart(product, quantity);
      setQuantity(1); // Reset quantity after adding
    }
  };

  const statusStyle = statusStyles[estado];
  const cardOpacity = canBeAdded ? 'opacity-100' : 'opacity-60';

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl ${cardOpacity}`}>
      <div className="relative">
        <img 
          className="h-48 w-full object-cover" 
          src={imagen_url || 'https://picsum.photos/400/300'} 
          alt={nombre} 
        />
        <span className={`absolute top-2 right-2 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
          {statusStyle.label}
        </span>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{nombre}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-grow">{descripcion}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-green-600">${precio.toFixed(2)}</p>
          <p className="text-sm font-medium text-gray-500">Stock: {stock}</p>
        </div>
      </div>

      {canBeAdded ? (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={() => handleQuantityChange(-1)} className="p-2 text-gray-500 hover:bg-gray-200 rounded-l-md transition-colors">
                <MinusIcon className="h-4 w-4" />
              </button>
              <input 
                type="text"
                readOnly
                value={quantity}
                className="w-10 text-center font-semibold text-gray-700 border-none bg-transparent focus:ring-0"
              />
              <button onClick={() => handleQuantityChange(1)} className="p-2 text-gray-500 hover:bg-gray-200 rounded-r-md transition-colors">
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={handleAddToCartClick}
              disabled={quantity > stock}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Agregar
            </button>
          </div>
          {quantity > stock && <p className="text-red-500 text-xs text-center mt-2">No hay suficiente stock.</p>}
        </div>
      ) : (
        <div className="p-4 bg-gray-100 text-center text-sm text-gray-500 font-medium border-t">
          Producto no disponible
        </div>
      )}
    </div>
  );
}