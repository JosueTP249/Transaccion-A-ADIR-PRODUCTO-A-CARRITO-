
import React, { useState, useCallback } from 'react';
import { Product, CartItem } from './types';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { ShoppingCartIcon } from './components/icons';

const initialProducts: Product[] = [
  { producto_id: 1, categoria_id: 1, nombre: 'Smartphone Galaxy X', descripcion: 'Teléfono con 128GB de almacenamiento.', precio: 8500.00, stock: 45, estado: 'Activo', imagen_url: 'https://picsum.photos/seed/galaxy/400/300' },
  { producto_id: 2, categoria_id: 1, nombre: 'Laptop Pro 15 pulgadas', descripcion: 'Computadora portátil ideal para diseño.', precio: 24500.50, stock: 10, estado: 'Activo', imagen_url: 'https://picsum.photos/seed/laptop/400/300' },
  { producto_id: 3, categoria_id: 1, nombre: 'Mouse Inalámbrico', descripcion: 'Mouse ergonómico con batería recargable.', precio: 350.00, stock: 0, estado: 'Inactivo', imagen_url: 'https://picsum.photos/seed/mouse/400/300' },
  { producto_id: 4, categoria_id: 2, nombre: 'Cafetera Programable', descripcion: 'Cafetera para 12 tazas.', precio: 890.00, stock: 25, estado: 'Activo', imagen_url: 'https://picsum.photos/seed/cafetera/400/300' },
  { producto_id: 5, categoria_id: 2, nombre: 'Juego de Sartenes', descripcion: 'Set de 3 sartenes antiadherentes.', precio: 1200.00, stock: 60, estado: 'Activo', imagen_url: 'https://picsum.photos/seed/sartenes/400/300' },
  { producto_id: 6, categoria_id: 3, nombre: 'Camiseta Running', descripcion: 'Camiseta transpirable talla M.', precio: 299.90, stock: 100, estado: 'Activo', imagen_url: 'https://picsum.photos/seed/camiseta/400/300' },
  { producto_id: 7, categoria_id: 3, nombre: 'Tenis Deportivos', descripcion: 'Calzado especial para alto impacto.', precio: 1500.00, stock: 15, estado: 'Activo', imagen_url: 'https://picsum.photos/seed/tenis/400/300' },
  { producto_id: 8, categoria_id: 4, nombre: 'Figura de Acción Retro', descripcion: 'Edición limitada del año 1999.', precio: 4500.00, stock: 2, estado: 'Descontinuado', imagen_url: 'https://picsum.photos/seed/figura/400/300' },
];


export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    // 1. Descontar stock del producto
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.producto_id === product.producto_id
          ? { ...p, stock: p.stock - quantity }
          : p
      )
    );

    // 2. Actualizar el carrito
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.producto_id === product.producto_id);
      if (existingItem) {
        return prevItems.map(item =>
          item.producto_id === product.producto_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, {
          producto_id: product.producto_id,
          nombre: product.nombre,
          precio: product.precio,
          quantity: quantity
        }];
      }
    });
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
    // En una aplicación real, aquí se debería decidir si el stock se restaura o no.
    // Para esta simulación, reseteamos al estado inicial para poder probar de nuevo.
    setProducts(initialProducts); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Tienda Demo</h1>
            <div className="flex items-center space-x-2">
                <ShoppingCartIcon className="h-6 w-6 text-gray-600"/>
                <span className="text-gray-700 font-medium">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Product Grid */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Productos Disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.producto_id} 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              ))}
            </div>
          </div>
          
          {/* Cart Section */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
             <div className="sticky top-24">
                <Cart items={cartItems} onClearCart={handleClearCart} />
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
