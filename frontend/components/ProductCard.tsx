
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a href={`#/product/${product.id}`} className="block group bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-72 object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
         <div className="absolute bottom-0 left-0 p-4">
             <h3 className="text-white text-xl font-bold font-serif">{product.name}</h3>
         </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-brand-ochre">{product.price.toFixed(2)} €</p>
        <span className="text-sm font-medium text-brand-brown group-hover:text-white group-hover:bg-brand-ochre transition-all duration-300 border border-brand-ochre rounded-full px-4 py-1">
          Voir
        </span>
      </div>
    </a>
  );
};

export default ProductCard;
