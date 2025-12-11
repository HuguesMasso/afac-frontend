import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
// REMARQUE : On utilise window.location.hash pour revenir à la liste
// au lieu de useNavigate, pour rester compatible avec notre routage manuel.

interface Article {
    id: number;
    title: string;
    content: string;
    image_url: string;
    date: string; // Utilisation de 'date' comme nom de colonne
    summary: string;
}

interface EditArticlePageProps {
    articleId: number;
}

const EditArticlePage: React.FC<EditArticlePageProps> = ({ articleId }) => {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // 1. CHARGEMENT DE L'ARTICLE EXISTANT
    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('articles')
                .select('id, title, content, image_url, summary, date')
                .eq('id', articleId)
                .single();

            if (error) {
                console.error("Erreur de chargement de l'article:", error);
                setError("Impossible de charger l'article pour l'édition.");
                setArticle(null);
            } else {
                setArticle(data as Article);
            }
            setLoading(false);
        };

        fetchArticle();
    }, [articleId]);

    // 2. GESTION DES CHANGEMENTS DU FORMULAIRE
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (article) {
            setArticle({
                ...article,
                [e.target.name]: e.target.value,
            });
        }
    };

    // 3. SOUMISSION DU FORMULAIRE (MISE À JOUR)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!article || isSaving) return;

        setIsSaving(true);
        setError(null);
        
        // Exclure l'ID et la date de la mise à jour
        const { id, date, ...updates } = article;

        const { error } = await supabase
            .from('articles')
            .update(updates)
            .eq('id', articleId);

        if (error) {
            setError(`Échec de la mise à jour : ${error.message}`);
        } else {
            alert('Article mis à jour avec succès !');
            // Rediriger vers la liste des articles
            window.location.hash = '#/admin/articles';
        }
        setIsSaving(false);
    };

    if (loading) return <div className="text-center py-20"><p className="text-lg text-gray-700">Chargement des données de l'article...</p></div>;
    if (error && !article) return <div className="text-center py-20 text-red-600"><p className="text-lg">{error}</p></div>;
    if (!article) return <div className="text-center py-20 text-gray-500"><p className="text-lg">Article non trouvé.</p></div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-brand-dark-blue">
                Éditer l'Article: {article.title}
            </h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl">
                {/* Champ Titre */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={article.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                {/* Champ Résumé */}
                <div className="mb-4">
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Résumé (pour la page d'accueil)</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={article.summary}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                
                {/* Champ Contenu */}
                <div className="mb-4">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu de l'Article</label>
                    <textarea
                        name="content"
                        id="content"
                        value={article.content}
                        onChange={handleChange}
                        required
                        rows={10}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                {/* Champ Image URL */}
                <div className="mb-6">
                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL de l'Image</label>
                    <input
                        type="url"
                        name="image_url"
                        id="image_url"
                        value={article.image_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                {/* Message d'erreur/succès */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Bouton de Soumission */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`bg-brand-blue text-white py-2 px-4 rounded-md font-semibold transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder les Modifications'}
                    </button>
                    <a 
                        href="#/admin/articles"
                        className="bg-gray-400 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-500 transition-colors"
                    >
                        Annuler
                    </a>
                </div>
            </form>
        </div>
    );
};

export default EditArticlePage;