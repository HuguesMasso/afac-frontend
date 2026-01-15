import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

interface Article {
    id: number;
    title: string;
    content: string;
    image_url: string;
    date: string;
    summary: string;
}

interface EditArticlePageProps {
    articleId: number;
}

const EditArticlePage: React.FC<EditArticlePageProps> = ({ articleId }) => {
    const [article, setArticle] = useState<Article | null>(null);
    // Nouvel état pour gérer le changement d'image
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // 1. CHARGEMENT
    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('articles')
                .select('*') // On prend tout
                .eq('id', articleId)
                .single();

            if (error) {
                console.error("Erreur chargement:", error);
                setError("Impossible de charger l'article.");
            } else {
                setArticle(data as Article);
            }
            setLoading(false);
        };
        fetchArticle();
    }, [articleId]);

    // 2. GESTION DES CHAMPS TEXTE
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (article) {
            setArticle({ ...article, [e.target.name]: e.target.value });
        }
    };

    // 3. GESTION DU NOUVEAU FICHIER IMAGE
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewImageFile(e.target.files[0]);
        }
    };

    // 4. SAUVEGARDE
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!article || isSaving) return;

        setIsSaving(true);
        setError(null);

        try {
            let finalImageUrl = article.image_url;

            // A. Si une nouvelle image a été sélectionnée, on l'upload d'abord
            if (newImageFile) {
                const fileExt = newImageFile.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                const filePath = `${fileName}`; // On met à la racine ou dans un dossier

                const { error: uploadError } = await supabase.storage
                    .from('afac-images') // Ton bucket
                    .upload(filePath, newImageFile);

                if (uploadError) throw uploadError;

                const { data: publicData } = supabase.storage
                    .from('afac-images')
                    .getPublicUrl(filePath);
                
                finalImageUrl = publicData.publicUrl;
            }

            // B. Mise à jour de la base de données
            const updates = {
                title: article.title,
                summary: article.summary,
                content: article.content, // Envoie en tant que texte (pas de split)
                image_url: finalImageUrl,
                // On ne touche pas à la date de création 'date', ou on peut ajouter une colonne 'updated_at'
            };

            const { error: updateError } = await supabase
                .from('articles')
                .update(updates)
                .eq('id', articleId);

            if (updateError) throw updateError;

            alert('Article modifié avec succès !');
            window.location.hash = '#/admin/articles';

        } catch (err: any) {
            console.error("Erreur sauvegarde:", err);
            setError(`Erreur lors de la modification : ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Chargement...</div>;
    if (!article) return <div className="p-10 text-center text-red-500">Article introuvable.</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-brand-dark-blue">Modifier l'Article</h1>
            
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                
                {/* Titre */}
                <div>
                    <label className="block font-bold text-gray-700 mb-2">Titre</label>
                    <input
                        type="text"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-brand-blue"
                        required
                    />
                </div>

                {/* Image Actuelle + Modification */}
                <div className="p-4 bg-gray-50 rounded border">
                    <label className="block font-bold text-gray-700 mb-2">Image de couverture</label>
                    
                    {/* Prévisualisation de l'image actuelle */}
                    {article.image_url && !newImageFile && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">Image actuelle :</p>
                            <img src={article.image_url} alt="Actuelle" className="h-32 object-cover rounded shadow" />
                        </div>
                    )}
                    
                    {/* Input pour changer */}
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-blue file:text-white hover:file:bg-blue-700"
                    />
                    {newImageFile && <p className="text-green-600 text-sm mt-2">Nouvelle image sélectionnée : {newImageFile.name}</p>}
                </div>

                {/* Résumé */}
                <div>
                    <label className="block font-bold text-gray-700 mb-2">Résumé</label>
                    <textarea
                        name="summary"
                        value={article.summary || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-brand-blue"
                    />
                </div>

                {/* Contenu */}
                <div>
                    <label className="block font-bold text-gray-700 mb-2">Contenu</label>
                    <textarea
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                        rows={10}
                        className="w-full border p-3 rounded focus:ring-2 focus:ring-brand-blue"
                        required
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-3 bg-brand-ochre text-white font-bold rounded hover:bg-yellow-600 transition disabled:opacity-50"
                    >
                        {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                    <a 
                        href="#/admin/articles"
                        className="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition"
                    >
                        Annuler
                    </a>
                </div>

            </form>
        </div>
    );
};

export default EditArticlePage;