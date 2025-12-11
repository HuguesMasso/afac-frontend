import React, { ReactNode } from 'react';

interface AdminPageProps {
    children: ReactNode;
}

// Composant pour les liens (utilisant <a> pour le routage manuel basé sur le HASH)
const SimpleNavLink: React.FC<{ to: string, children: ReactNode }> = ({ to, children }) => {
    // Détermine si le lien est actif
    // Utilise window.location.hash pour correspondre à la logique de routage de App.tsx
    const isActive = window.location.hash.includes(to) && 
                     (to !== '/admin' || window.location.hash === '#/admin'); // Fixe le dashboard pour l'exactitude
    
    return (
        <li>
            <a 
                href={`#${to}`} 
                className={`block p-3 rounded-lg transition-colors text-sm font-medium ${
                    isActive 
                        ? 'bg-brand-ochre text-gray-900 shadow-md' 
                        : 'hover:bg-gray-700 text-gray-300'
                }`}
            >
                {children}
            </a>
        </li>
    );
};


const AdminPage: React.FC<AdminPageProps> = ({ children }) => {
    
    return (
        <div className="flex min-h-screen bg-gray-100">
            
            {/* Barre latérale (Menu de navigation) */}
            <nav className="w-64 bg-gray-900 text-white p-6 shadow-2xl">
                <h2 className="text-3xl font-serif font-extrabold mb-10 text-brand-ochre border-b border-gray-700 pb-3">
                    AFAC ADMIN
                </h2>
                
                <ul className="space-y-3">
                    {/* 1. TABLEAU DE BORD (Accueil Admin) */}
                    <SimpleNavLink to="/admin">
                        Tableau de Bord
                    </SimpleNavLink>
                    
                    {/* 2. GESTION DES ARTICLES (Blog) */}
                    <SimpleNavLink to="/admin/articles">
                        Gestion du Blog (Articles)
                    </SimpleNavLink>
                    
                    {/* 3. GESTION DES PRODUITS (Boutique) - NOUVELLE ÉTIQUETTE */}
                    <SimpleNavLink to="/admin/products">
                        Gestion de la Boutique (Produits)
                    </SimpleNavLink>
                    
                    {/* 4. STATISTIQUES (Renvoie au Dashboard) */}
                    <SimpleNavLink to="/admin">
                        Statistiques & Rapports
                    </SimpleNavLink>
                    
                    {/* IDÉE SUPPLÉMENTAIRE : Gérer les utilisateurs/commentaires */}
                    <SimpleNavLink to="/admin/users"> 
                        Gérer les Utilisateurs
                    </SimpleNavLink>
                </ul>

                {/* Bouton de déconnexion */}
                <div className="mt-10 pt-6 border-t border-gray-700">
                    <button 
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        Déconnexion
                    </button>
                </div>

            </nav>

            {/* Contenu principal (Affichage de la sous-route) */}
            <div className="flex-1 overflow-y-auto p-8">
                {children} {/* Ici s'affichera AdminDashboard, AdminArticlesPage, etc. */}
            </div>
        </div>
    );
};

export default AdminPage;