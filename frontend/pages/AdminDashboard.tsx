import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
//import { Link } from 'react-router-dom';

// Composant pour afficher les cartes de statistiques
const StatCard: React.FC<{ title: string; count: number | null; icon: React.ReactNode; link: string }> = ({ title, count, icon, link }) => (
    <a to={link} className="block bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-brand-ochre">
        <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800">
                {count !== null ? count : '...'}
            </div>
            {icon}
        </div>
        <p className="text-sm font-medium text-gray-500 mt-1">{title}</p>
    </a>
);

const AdminDashboard: React.FC = () => {
    const [articleCount, setArticleCount] = useState<number | null>(null);
    const [productCount, setProductCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour charger les statistiques
    useEffect(() => {
        const fetchCounts = async () => {
            setError(null);
            
            // 1. Compter les articles
            const { count: articles, error: errArticles } = await supabase
                .from('articles')
                .select('*', { count: 'exact', head: true });

            // 2. Compter les produits (nécessite une table 'products')
            const { count: products, error: errProducts } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            if (errArticles || errProducts) {
                console.error("Erreur de chargement des stats:", errArticles || errProducts);
                setError("Erreur lors du chargement des données.");
            } else {
                setArticleCount(articles);
                setProductCount(products);
            }
            setLoading(false);
        };

        fetchCounts();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold mb-8 text-brand-dark-blue">
                Tableau de Bord Administrateur
            </h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                
                <StatCard 
                    title="Articles publiés" 
                    count={articleCount} 
                    link="/admin/articles"
                    icon={<svg className="w-8 h-8 text-brand-ochre" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-4m0-12V5"></path></svg>}
                />

                <StatCard 
                    title="Produits en boutique" 
                    count={productCount} 
                    link="/admin/products"
                    icon={<svg className="w-8 h-8 text-brand-ochre" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>}
                />
                
                {/* Carte vide pour une future stat (ex: Utilisateurs) */}
                <StatCard 
                    title="Total Utilisateurs" 
                    count={2} 
                    link="/admin/users"
                    icon={<svg className="w-8 h-8 text-brand-ochre" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2h2"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13A6 6 0 017 1v12zM15 11h2l-2 2h-2"></path></svg>}
                />
            </div>
            
            {loading && <p className="text-center text-gray-500">Chargement des données...</p>}

            {/* Section d'accès rapide (Menu rapide) */}
            <h2 className="text-2xl font-bold mt-12 mb-4 text-brand-dark-blue">Actions Rapides</h2>
            <div className="flex flex-wrap gap-4">
                <a to="/admin/new-article" className="py-2 px-4 bg-brand-blue text-white rounded-lg hover:bg-brand-dark-blue transition-colors">Créer un nouvel Article</a>
                <a to="/admin/new-product" className="py-2 px-4 bg-brand-blue text-white rounded-lg hover:bg-brand-dark-blue transition-colors">Ajouter un Produit</a>
                {/* ... Autres liens ... */}
            </div>

        </div>
    );
};

export default AdminDashboard;