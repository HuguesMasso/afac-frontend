import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useContent } from '../hooks/useContent'; 
import type { Product } from '../types';

const AdminProductsPage: React.FC = () => {
    // 1. Chargement des données (utilise le hook useContent pour les produits)
    const { products, isLoading, error, refreshContent } = useContent(); 
    const [message, setMessage] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Fonction de formatage du prix pour l'affichage
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
    };

    // 2. Logique de Suppression (DELETE)
    const handleDelete = async (productId: number, productName: string) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le produit : "${productName}" ? Cette action est irréversible.`)) {
            return;
        }

        setDeletingId(productId);
        setMessage('');

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;

            setMessage(`✅ Produit "${productName}" supprimé avec succès !`);
            
            // Recharger le contenu pour mettre à jour la liste
            refreshContent(); // Assurez-vous que votre useContent exporte cette fonction
            
        } catch (error: any) {
            console.error('Erreur lors de la suppression:', error.message);
            setMessage(`❌ Erreur de suppression: ${error.message}. Vérifiez les RLS.`);
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 text-xl">Chargement des produits...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <header className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-4xl font-bold text-brand-brown">Gestion des Produits</h1>
                <a 
                    href="#/admin/new-product" 
                    className="bg-brand-green text-white py-2 px-4 rounded-md shadow hover:bg-brand-ochre transition-colors"
                >
                    + Ajouter un Nouveau Produit
                </a>
            </header>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            {products.length === 0 ? (
                <p className="text-center text-xl text-gray-500 py-16">
                    Aucun produit dans la base de données.
                </p>
            ) : (
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product: Product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{formatPrice(product.price)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{product.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        
                                        {/* 3. Lien vers la page de MODIFICATION */}
                                        <a 
                                            href={`#/admin/edit-product/${product.id}`} 
                                            className="text-brand-ochre hover:text-brand-brown"
                                        >
                                            Modifier
                                        </a>
                                        
                                        {/* 4. Bouton de SUPPRESSION */}
                                        <button
                                            onClick={() => handleDelete(product.id, product.name)}
                                            disabled={deletingId === product.id}
                                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                        >
                                            {deletingId === product.id ? 'Suppression...' : 'Supprimer'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;