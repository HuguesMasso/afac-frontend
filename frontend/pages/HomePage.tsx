
import React from 'react';
// IMPORT SUPPRIMÉ : Nous n'utilisons plus les constantes statiques
// import { ARTICLES, PRODUCTS } from '../constants'; 
import { useContent } from '../hooks/useContent'; // <-- NOUVEL IMPORT

import ArticleCard from '../components/ArticleCard';
import ProductCard from '../components/ProductCard'; 

const HomePage: React.FC = () => {
  // --- UTILISATION DU HOOK POUR AVOIR LES DONNÉES DYNAMIQUES DE SUPABASE ---
  const { articles, products, isLoading, error } = useContent();

  // Affichage du chargement
  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-ochre mx-auto mb-4"></div>
        <p className="text-xl text-brand-brown">Chargement du contenu depuis Supabase...</p>
      </div>
    );
  }

  // Affichage de l'erreur (si Supabase ne répond pas)
  if (error) {
    return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;
  }
  
  // Utilisation des données récupérées (limitées pour la page d'accueil)
  const latestArticles = articles.slice(0, 4); 
  const featuredProducts = products.slice(0, 5);

  return (
    <div className="space-y-16">
      
      {/* --------------------- SECTION : BANNIÈRE D'INTRODUCTION --------------------- */}
      <section className="text-center py-12 bg-brand-sand rounded-lg shadow-inner">
        <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">GROUPE NGANGUE ET FILS INTERNATIONAL</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Les associations principales: AFAC -AHEAD.  APFI  AFL'EC
        </p>
      </section>

      {/* --------------------- SECTION : NOS DERNIERS ARTICLES (DEPUIS SUPABASE) --------------------- */}
      <section>
        <h2 className="text-4xl font-serif font-bold text-center mb-10 text-brand-brown border-b-2 border-brand-ochre pb-2 inline-block mx-auto">
          Nos derniers articles
        </h2>
        
        {articles.length === 0 ? (
            <p className="text-center text-gray-600">Aucun article trouvé. Ajoutez-en un depuis le panneau d'administration !</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
        )}
        
        <div className="text-center mt-10">
          <a
            href="#/articles" // Note : Cette page n'existe pas encore, mais le lien est prêt
            className="inline-block bg-brand-ochre text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-brand-brown shadow-md"
          >
            Lire tous les récits
          </a>
        </div>
      </section>

      {/* --------------------- SECTION : BOUTIQUE (DEPUIS SUPABASE) --------------------- */}
      <section className="pt-8">
        <h2 className="text-4xl font-serif font-bold text-center mb-10 text-brand-brown border-b-2 border-brand-ochre pb-2 inline-block mx-auto">
          Artisanat et Création
        </h2>
        
        {products.length === 0 ? (
             <p className="text-center text-gray-600">Aucun produit trouvé. Ajoutez-en un depuis le panneau d'administration !</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        )}

        <div className="text-center mt-10">
          <a
            href="#/shop"
            className="inline-block bg-brand-green text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-brand-brown shadow-md"
          >
            Découvrir la Boutique
          </a>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
