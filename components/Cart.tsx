
import React from 'react';
import { CartItem } from '../types';
import { ShoppingCartIcon, TrashIcon } from './icons';

interface CartProps {
  items: CartItem[];
  onClearCart: () => void;
}

export default function Cart({ items, onClearCart }: CartProps) {
  const total = items.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <ShoppingCartIcon className="h-6 w-6 mr-3 text-green-600"/>
            Mi Carrito
        </h2>
      </div>

      <div className="p-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Tu carrito está vacío.</p>
        ) : (
          <div className="flow-root">
            <ul role="list" className="-my-4 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.producto_id} className="flex py-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.nombre}</h3>
                    <div className="flex text-sm text-gray-500 mt-1">
                      <p>Cant: {item.quantity}</p>
                      <p className="ml-4 pl-4 border-l border-gray-200">@ ${item.precio.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">${(item.precio * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            En una aplicación real, los impuestos y el envío se calcularían en el checkout.
          </p>
          <div className="mt-6 flex flex-col space-y-2">
            <button
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
                Proceder al Pago
            </button>
            <button
                onClick={onClearCart}
                className="w-full bg-transparent text-red-600 font-medium py-2 px-4 rounded-md hover:bg-red-50 flex items-center justify-center transition-colors"
            >
                <TrashIcon className="h-4 w-4 mr-2"/>
                Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}