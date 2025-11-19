import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid'; // Pour générer un nom de fichier unique

// État initial du formulaire
const initialFormState = {
    title: '',
    summary: '',
    content: '',
};

const NewArticlePage: React.FC = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [imageFile, setImageFile] = useState<File | null>(null); // <-- NOUVEL ÉTAT pour le fichier
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // Gère les changements des champs de texte
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Gère la sélection du fichier image
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
        const bucketName = 'afac-images'; // <-- NOM DU BUCKET SUPABASE

        try {
            // --- ÉTAPE 1: ENVOI DU FICHIER À SUPABASE STORAGE ---
            
            // Crée un nom de fichier unique pour éviter les conflits
            const fileName = `${uuidv4()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const filePath = `articles/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            // Récupère l'URL publique de l'image pour la base de données
            const { data: publicData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);
            
            publicUrl = publicData.publicUrl;
            
            // --- ÉTAPE 2: INSERTION DE L'ARTICLE DANS LA BASE DE DONNÉES ---
            
            const newArticle = {
                title: formData.title,
                image_url: publicUrl, // <-- UTILISATION DE L'URL DU STOCKAGE
                summary: formData.summary,
                content: formData.content.split('\n').filter(p => p.trim() !== ''),
                date: new Date().toISOString(),
            };

            const { error: dbError } = await supabase
                .from('articles')
                .insert([newArticle]);

            if (dbError) throw dbError;

            setMessage({ text: 'Article et image créés avec succès ! Redirection dans 3 secondes...', type: 'success' });
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
            <h1 className="text-4xl font-serif font-bold text-brand-brown mb-6">Ajouter un nouvel Article</h1>
            
            {/* ... (Affichage des messages inchangé) ... */}
            {message && (
                <div className={`p-4 rounded mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                {/* Champ Titre (inchangé) */}
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-brand-brown mb-1">Titre de l'Article</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-brand-ochre focus:border-brand-ochre"
                    />
                </div>

                {/* NOUVEAU CHAMP : SÉLECTION DE FICHIER */}
                <div>
                    <label htmlFor="imageFile" className="block text-sm font-semibold text-brand-brown mb-1">Sélectionner l'Image de Couverture</label>
                    <input
                        type="file"
                        name="imageFile"
                        id="imageFile"
                        onChange={handleFileChange}
                        accept="image/*" // N'accepte que les images
                        required
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-brand-ochre focus:border-brand-ochre"
                    />
                    {imageFile && (
                        <p className="mt-2 text-sm text-brand-green">Fichier sélectionné : **{imageFile.name}**</p>
                    )}
                </div>
                
                {/* Champ Résumé (inchangé) */}
                <div>
                    <label htmlFor="summary" className="block text-sm font-semibold text-brand-brown mb-1">Résumé (pour la page d'accueil)</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-brand-ochre focus:border-brand-ochre"
                    ></textarea>
                </div>
                
                {/* Champ Contenu Complet (inchangé) */}
                <div>
                    <label htmlFor="content" className="block text-sm font-semibold text-brand-brown mb-1">Contenu Complet (Séparez les paragraphes par une ligne vide)</label>
                    <textarea
                        name="content"
                        id="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={10}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-brand-ochre focus:border-brand-ochre"
                    ></textarea>
                </div>

                {/* Bouton de Soumission (inchangé) */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 hover:bg-brand-brown disabled:bg-gray-400"
                >
                    {loading ? 'Publication en cours...' : 'Publier l\'Article'}
                </button>
            </form>
        </div>
    );
};

export default NewArticlePage;