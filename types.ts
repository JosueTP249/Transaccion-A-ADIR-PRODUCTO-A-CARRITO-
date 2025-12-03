
export type ProductStatus = 'Activo' | 'Inactivo' | 'Descontinuado';

export interface Product {
  producto_id: number;
  categoria_id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: ProductStatus;
  imagen_url: string | null;
}

export interface CartItem {
  producto_id: number;
  nombre: string;
  precio: number;
  quantity: number;
}
