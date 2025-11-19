
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { Product } from '../types';
import { contentCache } from '../hooks/useContent'; 

interface ProductPageProps {
  productId: number;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1); 

    // Gestion des changements de quantité
    const handleQuantityChange = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // CODE MANQUANT (Correction de la recherche de données)
    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);

            // --- VÉRIFICATION DANS LE CACHE ---
            if (contentCache && contentCache.products.length > 0) {
                const cachedProduct = contentCache.products.find(p => p.id === productId);
                
                if (cachedProduct) {
                    setProduct(cachedProduct);
                    setIsLoading(false);
                    return; 
                }
            }
            // --- APPEL À SUPABASE (Si non trouvé) ---
            try {
                const { data, error: dbError } = await supabase
                    .from('products')
                    .select('id, name, price, description, imageUrl:image_url')
                    .eq('id', productId)
                    .single(); 

                if (dbError) throw dbError;

                if (data) {
                    setProduct(data as Product);
                } else {
                    setError("Produit non trouvé.");
                }

            } catch (e: any) {
                console.error('Erreur de chargement du produit:', e);
                setError("Impossible de charger le produit. Erreur de connexion ou données manquantes.");
            } finally {
                // On s'assure de toujours désactiver l'état de chargement
                setIsLoading(false); 
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    // --- VÉRIFICATIONS D'ÉTAT (Avant le rendu complet) ---
    
    if (isLoading) {
        return <div className="text-center py-20 text-xl">Chargement du produit...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
    }

    // SI le produit est null ici, c'est qu'il n'a pas été trouvé.
    if (!product) {
        return <div className="text-center py-20 text-gray-600">Produit introuvable.</div>;
    }

    // --- CALCULS (Déplacés ici, car on est sûr que 'product' existe) ---
    // Correction: On utilise maintenant 'product.price' sans '?.' car 'product' n'est pas null
    const totalPrice = product.price * quantity;
    const formattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price);
    const formattedTotalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPrice);
    
    // --- RENDU FINAL (Plus besoin des '!') ---
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <a 
                href="#/shop" 
                className="inline-flex items-center text-brand-green hover:text-brand-brown transition-colors mb-8"
            >
                &larr; Retour à la boutique
            </a>
            
            <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-xl shadow-2xl">
                {/* --------------------------- COLONNE GAUCHE : IMAGE & DESCRIPTION --------------------------- */}
                <div className="lg:w-1/2 space-y-8">
                    {/* Image du Produit (CORRIGÉ : suppression des '!') */}
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-lg"
                    />

                    {/* Description Détaillée */}
                    <div className="pt-4 border-t border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Description Détaillée</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </div>
                
                {/* --------------------------- COLONNE DROITE : INFOS D'ACHAT & PAIEMENT --------------------------- */}
                <div className="lg:w-1/2 space-y-6 lg:sticky lg:top-8 lg:h-fit">
                    {/* CORRIGÉ : suppression du '!' */}
                    <h1 className="text-5xl font-serif font-extrabold text-brand-brown">{product.name}</h1>
                    
                    {/* Prix Unitaire */}
                    <p className="text-2xl font-sans font-bold text-brand-ochre">
                        Prix Unitaire : {formattedPrice}
                    </p>

                    {/* Sélecteur de Quantité */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        <label className="block text-xl font-semibold text-gray-700">Quantité</label>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={quantity <= 1}
                                className="p-3 bg-gray-200 rounded-full text-2xl font-bold hover:bg-gray-300 disabled:opacity-50 transition"
                            >
                                −
                            </button>
                            <span className="text-3xl font-mono w-10 text-center">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange('increment')}
                                className="p-3 bg-gray-200 rounded-full text-2xl font-bold hover:bg-gray-300 transition"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    
                    {/* Infos de Paiement / Total */}
                    <div className="pt-6 border-t border-gray-300 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-800">Total :</span>
                            <span className="text-3xl font-extrabold text-brand-ochre">{formattedTotalPrice}</span>
                        </div>
                        
                        {/* Bouton d'Action */}
                        <button
                            onClick={() => alert(`Achat de ${quantity}x ${product.name} pour ${formattedTotalPrice}.`)}
                            className="w-full bg-brand-green text-white font-bold py-4 px-8 rounded-full text-xl transition-colors duration-300 hover:bg-brand-ochre shadow-lg mt-4"
                        >
                            Acheter Maintenant
                        </button>

                        <p className="text-sm text-center text-gray-500 pt-2">
                            Le paiement sera sécurisé par [Mentionnez votre solution de paiement].
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;