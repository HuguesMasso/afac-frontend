import React from 'react';

const AdminPage: React.FC = () => {
    // Cette page doit vérifier si l'utilisateur est connecté et est admin, 
    // mais pour l'instant, nous affichons les liens.

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold text-brand-brown mb-10 text-center">Tableau de Bord Administrateur</h1>
            
            <div className="space-y-12">
                {/* Section GESTION DES PRODUITS */}
                <div className="bg-white p-6 rounded-lg shadow-2xl">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Gestion de la Boutique (Produits)</h2>
                    <div className="flex space-x-4">
                        {/* Lien vers la LISTE qui contient Modifier/Supprimer */}
                        <a 
                            href="#/admin/products" 
                            className="flex-1 text-center py-3 px-6 bg-brand-green text-white rounded-md hover:bg-brand-ochre transition"
                        >
                            Voir/Modifier/Supprimer les Produits
                        </a>
                        {/* Lien vers la CRÉATION */}
                        <a 
                            href="#/admin/new-product" 
                            className="flex-1 text-center py-3 px-6 border border-brand-green text-brand-green rounded-md hover:bg-brand-sand transition"
                        >
                            Ajouter un Nouveau Produit
                        </a>
                    </div>
                </div>

                {/* Section GESTION DES ARTICLES */}
                <div className="bg-white p-6 rounded-lg shadow-2xl">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Gestion du Blog (Articles)</h2>
                    <div className="flex space-x-4">
                        {/* Lien vers la LISTE qui contiendra Modifier/Supprimer les Articles */}
                        {/* NOTE: Il faudra créer AdminArticlesPage.tsx plus tard */}
                        <a 
                            href="#/admin/articles" 
                            className="flex-1 text-center py-3 px-6 bg-brand-green text-white rounded-md hover:bg-brand-ochre transition"
                        >
                            Voir/Modifier/Supprimer les Articles
                        </a>
                        {/* Lien vers la CRÉATION */}
                        <a 
                            href="#/admin/new-article" 
                            className="flex-1 text-center py-3 px-6 border border-brand-green text-brand-green rounded-md hover:bg-brand-sand transition"
                        >
                            Ajouter un Nouvel Article
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;