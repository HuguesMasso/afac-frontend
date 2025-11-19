import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useContent } from '../hooks/useContent'; 
import type { Article } from '../types';

const AdminArticlesPage: React.FC = () => {
    // 1. Chargement des données (utilise le hook useContent pour les articles)
    // Nous utilisons la fonction refreshContent pour mettre à jour la liste après suppression.
    const { articles, isLoading, error, refreshContent } = useContent(); 
    const [message, setMessage] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Fonction pour formater la date (vous pouvez la réutiliser de ArticlePage)
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    // 2. Logique de Suppression (DELETE)
    const handleDelete = async (articleId: number, articleTitle: string) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'article : "${articleTitle}" ? Cette action est irréversible.`)) {
            return;
        }

        setDeletingId(articleId);
        setMessage('');

        try {
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', articleId);

            if (error) throw error;

            setMessage(`✅ Article "${articleTitle}" supprimé avec succès !`);
            
            // Recharger le contenu pour mettre à jour la liste
            refreshContent(); 
            
        } catch (error: any) {
            console.error('Erreur lors de la suppression de l\'article:', error.message);
            setMessage(`❌ Erreur de suppression: ${error.message}. Vérifiez les RLS.`);
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 text-xl">Chargement des articles...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <header className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-4xl font-bold text-brand-brown">Gestion des Articles du Blog</h1>
                <a 
                    href="#/admin/new-article" 
                    className="bg-brand-green text-white py-2 px-4 rounded-md shadow hover:bg-brand-ochre transition-colors"
                >
                    + Ajouter un Nouvel Article
                </a>
            </header>

            {message && (
                <div className={`p-4 mb-4 rounded ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            {articles.length === 0 ? (
                <p className="text-center text-xl text-gray-500 py-16">
                    Aucun article dans la base de données.
                </p>
            ) : (
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Résumé</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {articles.map((article: Article) => (
                                <tr key={article.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{article.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{article.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(article.date)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{article.summary}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        
                                        {/* 3. Lien vers la page de MODIFICATION */}
                                        <a 
                                            // La page EditArticlePage.tsx reste à créer, mais le lien est prêt.
                                            href={`#/admin/edit-article/${article.id}`} 
                                            className="text-brand-ochre hover:text-brand-brown"
                                        >
                                            Modifier
                                        </a>
                                        
                                        {/* 4. Bouton de SUPPRESSION */}
                                        <button
                                            onClick={() => handleDelete(article.id, article.title)}
                                            disabled={deletingId === article.id}
                                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                        >
                                            {deletingId === article.id ? 'Suppression...' : 'Supprimer'}
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

export default AdminArticlesPage;