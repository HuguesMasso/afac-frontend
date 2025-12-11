import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
// REMARQUE: Pas d'import de 'react-router-dom' pour éviter l'erreur de contexte.

interface Product {
    id: number;
    name: string;
    price: number;
    date: string;
}

const AdminProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('id, name, price, date')
            .order('date', { ascending: false });

        if (error) {
            console.error('Erreur de chargement des produits:', error);
            setError('Impossible de charger la liste des produits.');
            setProducts([]);
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId: number, productName: string) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le produit : "${productName}" ?`)) {
            return;
        }

        setLoading(true);
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productId);

        if (error) {
            setError(`Échec de la suppression : ${error.message}`);
            setLoading(false);
        } else {
            // Recharger la liste après une suppression réussie
            fetchProducts();
        }
    };

    if (loading) return <div className="text-center py-20"><p className="text-lg text-gray-700">Chargement de la liste des produits...</p></div>;
    if (error) return <div className="text-center py-20 text-red-600"><p className="text-lg">{error}</p></div>;

    return (
        <div className="p-4">
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-800">Gestion de la Boutique (Produits)</h1>
                <a 
                    href="#/admin/new-product"
                    className="flex items-center space-x-2 bg-brand-ochre text-white py-2 px-4 rounded-lg font-medium shadow-md hover:bg-yellow-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    <span>Ajouter un Produit</span>
                </a>
            </header>

            {products.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-gray-500">Aucun produit n'est actuellement en boutique.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-xl rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nom du Produit
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Prix
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Créé le
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-700 max-w-sm truncate">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                                        {product.price.toFixed(2)} €
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(product.date).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                                        <a
                                            href={`#/admin/edit-product/${product.id}`}
                                            className="text-brand-ochre hover:underline p-2 rounded-md transition-colors"
                                            title="Éditer le produit"
                                        >
                                            Éditer
                                        </a>
                                        <button
                                            onClick={() => handleDelete(product.id, product.name)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded-md transition-colors"
                                            title="Supprimer le produit"
                                        >
                                            Supprimer
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