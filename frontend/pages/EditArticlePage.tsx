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
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // 1. CHARGEMENT DE L'ARTICLE
    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('articles')
                .select('*')
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

    // 2. GESTION DES CHAMPS
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (article) {
            setArticle({ ...article, [e.target.name]: e.target.value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewImageFile(e.target.files[0]);
        }
    };

    // 3. SAUVEGARDE
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!article || isSaving) return;

        setIsSaving(true);
        setError(null);

        try {
            let finalImageUrl = article.image_url;

            // Si nouvelle image, on upload
            if (newImageFile) {
                const fileExt = newImageFile.name.split('.').pop();
                const fileName = `${uuidv4()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('afac-images')
                    .upload(filePath, newImageFile);

                if (uploadError) throw uploadError;

                const { data: publicData } = supabase.storage
                    .from('afac-images')
                    .getPublicUrl(filePath);
                
                finalImageUrl = publicData.publicUrl;
            }

            // Update en base
            const { error: updateError } = await supabase
                .from('articles')
                .update({
                    title: article.title,
                    summary: article.summary,
                    content: article.content,
                    image_url: finalImageUrl,
                })
                .eq('id', articleId);

            if (updateError) throw updateError;

            alert('Article modifié avec succès !');
            window.location.hash = '#/admin/articles';

        } catch (err: any) {
            console.error("Erreur sauvegarde:", err);
            setError(`Erreur : ${err.message}`);
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

                {/* Image */}
                <div className="p-4 bg-gray-50 rounded border">
                    <label className="block font-bold text-gray-700 mb-2">Image de couverture</label>
                    {article.image_url && !newImageFile && (
                        <div className="mb-4">
                            <img src={article.image_url} alt="Actuelle" className="h-32 object-cover rounded shadow" />
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500"
                    />
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

                {/* --- C'EST ICI QUE MANQUAIT LE BOUTON --- */}
                <div className="flex items-center gap-4 pt-6 border-t mt-6">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`px-6 py-3 bg-brand-ochre text-white font-bold rounded hover:bg-yellow-600 transition shadow-md ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>

                    <button 
                        type="button"
                        onClick={() => window.location.hash = '#/admin/articles'}
                        className="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition"
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditArticlePage;