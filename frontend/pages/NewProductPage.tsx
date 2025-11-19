import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid'; 

// État initial du formulaire pour un nouveau produit
const initialFormState = {
    name: '',
    price: '', // Stocké comme string pour le formulaire, converti en float lors de l'envoi
    description: '',
};

const NewProductPage: React.FC = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // Gère les changements des champs de texte et du prix
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Gère la sélection du fichier image (identique à NewArticlePage)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        } else {
            setImageFile(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!imageFile) {
            setMessage({ text: "Erreur : Veuillez sélectionner une image.", type: 'error' });
            setLoading(false);
            return;
        }

        let publicUrl = '';
        const bucketName = 'afac-images'; // DOIT CORRESPONDRE AU NOM DE VOTRE BUCKET SUPABASE

        try {
            // --- ÉTAPE 1: ENVOI DU FICHIER À SUPABASE STORAGE ---
            const fileName = `${uuidv4()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const filePath = `products/${fileName}`; // Chemin de stockage différent des articles

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            const { data: publicData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);
            
            publicUrl = publicData.publicUrl;
            
            // --- ÉTAPE 2: INSERTION DU PRODUIT DANS LA BASE DE DONNÉES ---
            
            const newProduct = {
                name: formData.name,
                image_url: publicUrl,
                // Convertit le prix en nombre à virgule pour la base de données (type numeric)
                price: parseFloat(formData.price), 
                description: formData.description,
            };
            
            // Cible la table 'products'
            const { error: dbError } = await supabase
                .from('products')
                .insert([newProduct]);

            if (dbError) throw dbError;

            setMessage({ text: 'Produit créé avec succès ! Redirection dans 3 secondes...', type: 'success' });
            setFormData(initialFormState); 
            setImageFile(null);
            
            setTimeout(() => {
                window.location.hash = '#/admin';
            }, 3000);

        } catch (error: any) {
            setMessage({ text: `Erreur critique: ${error.message || 'Problème d\'envoi ou de base de données.'}`, type: 'error' });
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-4xl font-serif font-bold text-brand-ochre mb-6">Ajouter un nouveau Produit</h1>
            
            {message && (
                <div className={`p-4 rounded mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                
                {/* Champ Nom du Produit */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-brand-brown mb-1">Nom du Produit</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-brand-ochre focus:border-brand-ochre"
                    />
                </div>
                
                {/* Champ Prix */}
                <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-brand-brown mb-1">Prix (en chiffres)</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01" // Permet les décimales
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-brand-ochre focus:border-brand-ochre"
                    />
                </div>

                {/* Champ Sélection de Fichier (Image) */}
                <div>
                    <label htmlFor="imageFile" className="block text-sm font-semibold text-brand-brown mb-1">Sélectionner l'Image du Produit</label>
                    <input
                        type="file"
                        name="imageFile"
                        id="imageFile"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-brand-ochre focus:border-brand-ochre"
                    />
                    {imageFile && (
                        <p className="mt-2 text-sm text-brand-green">Fichier sélectionné : **{imageFile.name}**</p>
                    )}
                </div>
                
                {/* Champ Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-brand-brown mb-1">Description Détaillée</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-brand-ochre focus:border-brand-ochre"
                    ></textarea>
                </div>
                
                {/* Bouton de Soumission */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-ochre text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-brand-brown disabled:bg-gray-400"
                >
                    {loading ? 'Publication en cours...' : 'Ajouter le Produit'}
                </button>
            </form>
        </div>
    );
};

export default NewProductPage;