import React from 'react';
import { Product } from '../../features/farmer/api/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="border rounded-lg p-4">
    <img 
      src={product.imageUrl} 
      alt={product.name}
      className="h-48 w-full object-cover"
    />
    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    <p className="text-gray-600">{product.price} ብር / {product.unit}</p>
    <button className="bg-primary text-white px-4 py-2 mt-2 rounded">
      ይያዙ
    </button>
  </div>
);

export default ProductCard;