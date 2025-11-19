
import React from 'react';
import ProductCard from '../components/ProductCard'; 
import { useContent } from '../hooks/useContent';

const ShopPage: React.FC = () => {
    // Récupère les produits, le statut de chargement et l'erreur depuis le cache/Supabase
    const { products, isLoading, error } = useContent(); 

    if (isLoading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-ochre mx-auto mb-4"></div>
                <p className="text-xl text-brand-brown">Chargement de la boutique...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-5xl font-serif font-bold text-center mb-12 text-brand-brown">
                Notre Boutique d'Artisanat
            </h1>
            
            {products.length === 0 ? (
                <p className="text-center text-2xl text-gray-600 py-16">
                    Aucun produit n'est disponible pour l'instant.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopPage;
