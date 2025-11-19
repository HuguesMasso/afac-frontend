
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { Article } from '../types';
import { contentCache } from '../hooks/useContent'; // <-- NOUVEL IMPORT DU CACHE

interface ArticlePageProps {
  articleId: number;
}

// Fonction pour formater la date (inchangée)
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

const ArticlePage: React.FC<ArticlePageProps> = ({ articleId }) => {
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true);
            setError(null);

            // --- ÉTAPE D'OPTIMISATION : VÉRIFIER LE CACHE EN PREMIER ---
            if (contentCache && contentCache.articles.length > 0) {
                // Tenter de trouver l'article dans les données déjà chargées par la page d'accueil
                const cachedArticle = contentCache.articles.find(a => a.id === articleId);
                
                if (cachedArticle) {
                    setArticle(cachedArticle);
                    setIsLoading(false);
                    // SORTIE RAPIDE : l'article est chargé instantanément sans appel API
                    return; 
                }
            }
            // --- FIN DE L'OPTIMISATION ---


            try {
                // Si l'article n'est pas dans le cache, faire l'appel API (uniquement si nécessaire)
                const { data, error: dbError } = await supabase
                    .from('articles')
                    .select('id, title, date, summary, content, imageUrl:image_url')
                    .eq('id', articleId) 
                    .single(); 

                if (dbError) throw dbError;

                if (data) {
                    setArticle(data as Article);
                } else {
                    setError("Article non trouvé.");
                }

            } catch (e: any) {
                console.error('Erreur de chargement de l\'article:', e);
                setError("Impossible de charger l'article. Erreur de connexion ou données manquantes.");
            } finally {
                // Cette ligne est exécutée même si le cache a été utilisé, pour garantir l'arrêt du chargement
                // Mais elle est atteinte instantanément si le 'return' du cache est appelé.
                if (article === null) setIsLoading(false); 
            }
        };

        if (articleId) {
            fetchArticle();
        }
    }, [articleId]);

    // ... (le reste du rendu (if isLoading, if error, etc.) est inchangé) ...
    if (isLoading) {
        return <div className="text-center py-20 text-xl">Chargement de l'article...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
    }

    if (!article) {
        return <div className="text-center py-20 text-gray-600">Article introuvable.</div>;
    }

    const content = Array.isArray(article.content) ? article.content : [article.content];
    
    return (
        <div className="max-w-4xl mx-auto py-10">
            {/* Bouton de retour */}
            <a 
                href="#/" 
                className="inline-flex items-center text-brand-ochre hover:text-brand-brown transition-colors mb-6"
            >
                &larr; Retour à l'accueil
            </a>
            
            <header className="mb-8">
                <h1 className="text-5xl font-serif font-bold text-brand-brown mb-3">{article.title}</h1>
                <p className="text-lg text-gray-500">Publié le {formatDate(article.date)}</p>
            </header>

            {/* Image de Couverture */}
            <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-96 object-cover rounded-lg shadow-xl mb-10"
            />
            
            {/* Contenu de l'Article */}
            <article className="prose prose-lg max-w-none text-gray-800 space-y-6">
                {content.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </article>

        </div>
    );
};

export default ArticlePage;