import React from 'react';
import ArticleCard from '../components/ArticleCard'; 
import { useContent } from '../hooks/useContent';

const ArticlesPage: React.FC = () => {
    // Récupère les articles, le statut de chargement et l'erreur depuis le cache/Supabase
    const { articles, isLoading, error } = useContent(); 

    if (isLoading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-ochre mx-auto mb-4"></div>
                <p className="text-xl text-brand-brown">Chargement des articles...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-5xl font-serif font-bold text-center mb-12 text-brand-brown">
                Toutes nos Nouvelles et Actualités
            </h1>
            
            {articles.length === 0 ? (
                <p className="text-center text-2xl text-gray-600 py-16">
                    Aucun article n'a été publié pour l'instant.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticlesPage;