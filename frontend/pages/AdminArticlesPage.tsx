import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
// REMARQUE: Pas d'import de 'react-router-dom' pour éviter l'erreur de contexte.

interface Article {
    id: number;
    title: string;
    date: string;
}

const AdminArticlesPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('id, title, date')
            .order('date', { ascending: false });

        if (error) {
            console.error('Erreur de chargement des articles:', error);
            setError('Impossible de charger la liste des articles.');
            setArticles([]);
        } else {
            setArticles(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (articleId: number, articleTitle: string) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'article : "${articleTitle}" ?`)) {
            return;
        }

        setLoading(true);
        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', articleId);

        if (error) {
            setError(`Échec de la suppression : ${error.message}`);
            setLoading(false);
        } else {
            // Recharger la liste après une suppression réussie
            fetchArticles();
        }
    };

    if (loading) return <div className="text-center py-20"><p className="text-lg text-gray-700">Chargement de la liste des articles...</p></div>;
    if (error) return <div className="text-center py-20 text-red-600"><p className="text-lg">{error}</p></div>;

    return (
        <div className="p-4">
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-800">Gestion du Blog (Articles)</h1>
                <a 
                    href="#/admin/new-article"
                    className="flex items-center space-x-2 bg-brand-green text-white py-2 px-4 rounded-lg font-medium shadow-md hover:bg-green-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    <span>Ajouter un Article</span>
                </a>
            </header>

            {articles.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-gray-500">Aucun article n'a été publié pour le moment.</p>
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
                                    Titre de l'Article
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Publié le
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {article.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-700 max-w-sm truncate">
                                        {article.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(article.date).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                                        <a
                                            href={`#/admin/edit-article/${article.id}`}
                                            className="text-brand-blue hover:underline p-2 rounded-md transition-colors"
                                            title="Éditer l'article"
                                        >
                                            Éditer
                                        </a>
                                        <button
                                            onClick={() => handleDelete(article.id, article.title)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded-md transition-colors"
                                            title="Supprimer l'article"
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

export default AdminArticlesPage;