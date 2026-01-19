
import React, { useEffect, useState } from 'react';
// @ts-ignore
import topBannerImage from '../assets/ngangue1.jpg';
import { supabase } from '../supabaseClient';

// On définit la structure d'un article tel qu'il vient de la base de données
interface Article {
    id: number;
    title: string;
    date: string;
    image_url: string | null; // Peut être null si pas d'image
    summary: string | null;
}

const HomePage: React.FC = () => {
    const [recentArticles, setRecentArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    // Récupération des 3 derniers articles depuis Supabase
    useEffect(() => {
        const fetchRecentArticles = async () => {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('date', { ascending: false }) // Les plus récents en premier
                .limit(3); // On en garde seulement 3 pour l'accueil

            if (error) {
                console.error("Erreur chargement articles:", error);
            } else if (data) {
                setRecentArticles(data);
            }
            setLoading(false);
        };

        fetchRecentArticles();
    }, []);

    return (
        <div className="flex flex-col font-sans">
            
            {/* --- BANNIÈRE PRINCIPALE --- */}
            <div className="container mx-auto px-4 mt-6 mb-6">
                <div className="w-full h-48 md:h-[350px] overflow-hidden rounded-2xl shadow-xl">
                    <img
                        src={topBannerImage}
                        alt="AFACAHEAD Accueil"
                        // 'object-top' permet de voir le haut de l'image (la tête)
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </div>

            {/* --- SECTION : À LA UNE (ARTICLES) --- */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto max-w-6xl px-4">
                    <h2 className="text-3xl font-bold text-center text-brand-dark-blue mb-8">
                        À la Une
                    </h2>

                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Chargement des actualités...</div>
                    ) : recentArticles.length === 0 ? (
                        <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow p-6">
                            <p className="text-lg">Aucun article n'a été publié pour le moment.</p>
                            <p className="text-sm mt-2">Connectez-vous à l'admin pour en ajouter !</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentArticles.map((article) => (
                                <div key={article.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col border border-gray-100 group">
                                    
                                    {/* Image de l'article */}
                                    <div className="h-48 overflow-hidden rounded-lg mb-4 bg-gray-100 relative">
                                        {article.image_url ? (
                                            <img 
                                                src={article.image_url} 
                                                alt={article.title} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            /* Placeholder si pas d'image */
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Titre */}
                                    <h3 className="font-bold text-lg mb-2 text-brand-dark-blue line-clamp-2 group-hover:text-brand-ochre transition-colors">
                                        {article.title}
                                    </h3>
                                    
                                    {/* Résumé */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                        {article.summary || "Découvrez cet article en cliquant ci-dessous..."}
                                    </p>
                                    
                                    {/* Date et Lien */}
                                    <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
                                        <span className="text-xs text-gray-400 font-medium">
                                            {new Date(article.date).toLocaleDateString('fr-FR')}
                                        </span>
                                        <a href={`#/article/${article.id}`} className="text-brand-ochre font-bold hover:text-yellow-700 text-sm flex items-center">
                                            Lire l'article <span className="ml-1 text-lg">→</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-10">
                         <a href="#/articles" className="inline-block px-8 py-3 bg-brand-blue text-white font-semibold rounded-full hover:bg-blue-800 transition shadow-md hover:-translate-y-1">
                            Voir tous les articles
                        </a>
                    </div>
                </div>
            </section>

            {/* --- SECTION : POURQUOI NOUS CHOISIR --- */}
            <section className="py-16 bg-white">
                <div className="container mx-auto max-w-6xl px-4">
                    <h2 className="text-3xl font-bold text-center text-brand-dark-blue mb-12">Pourquoi Choisir AFACAHEAD ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-green-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Contenu de Qualité</h3>
                            <p className="text-gray-600">Histoires et faits réels sur l'Afrique</p>
                        </div>
                        <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Produits de Qualité</h3>
                            <p className="text-gray-600">Tous nos Produits africains ont une histoire </p>
                        </div>
                        <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-yellow-50 text-brand-ochre rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Support Dédié</h3>
                            <p className="text-gray-600">Une équipe pour vous servir.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;