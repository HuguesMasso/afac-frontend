import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { Product } from '../types';

interface EditProductPageProps {
    productId: number;
}

const EditProductPage: React.FC<EditProductPageProps> = ({ productId }) => {
    // Utilisez Omit<Product, 'id'> car l'ID est dans les props
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    // 1. Chargement des données existantes
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error: dbError } = await supabase
                    .from('products')
                    .select('name, price, description, imageUrl:image_url')
                    .eq('id', productId)
                    .single();

                if (dbError) throw dbError;
                if (!data) throw new Error("Produit non trouvé.");

                // Mettre à jour l'état du formulaire avec les données chargées
                setFormData(data as Omit<Product, 'id'>);
            } catch (e: any) {
                setError(e.message || "Erreur de chargement du produit.");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);
    
    // Gère la modification des champs (identique à NewProductPage)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value,
        }));
    };

    // 2. Soumission du formulaire de MODIFICATION
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!formData.name || formData.price <= 0 || !formData.imageUrl) {
            setMessage("Veuillez remplir les champs obligatoires.");
            setLoading(false);
            return;
        }

        try {
            // Utilisation de .update() et filtrage par l'ID
            const { error: updateError } = await supabase
                .from('products')
                .update({ 
                    name: formData.name, 
                    price: formData.price, 
                    description: formData.description, 
                    image_url: formData.imageUrl,
                })
                .eq('id', productId); 

            if (updateError) throw updateError;

            setMessage(`✅ Produit n°${productId} modifié avec succès !`);
            // OPTIONNEL: window.location.hash = '#/admin/products'; // Rediriger vers la liste admin
        
        } catch (error: any) {
            setMessage(`❌ Erreur de modification: ${error.message}.`);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !error) {
        return <div className="text-center py-20 text-xl">Chargement des données du produit...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold text-brand-brown mb-8 text-center">Modifier Produit n°{productId}</h1>
            
            {message && (
                <div className={`p-4 mb-4 rounded ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-6">
                {/* Reprendre ici tous les champs du formulaire (Nom, Prix, Description, URL Image) en utilisant `formData` et `handleChange` */}
                {/* Exemple du champ Nom : */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du Produit</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
                    />
                </div>
                {/* ... (Ajoutez les autres champs ici : Prix, Description, URL Image) ... */}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-ochre hover:bg-brand-brown transition duration-200 disabled:opacity-50"
                >
                    {loading ? 'Modification en cours...' : 'Sauvegarder les Modifications'}
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;