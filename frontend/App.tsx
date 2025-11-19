
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage'; 
import LoginPage from './pages/LoginPage';
import NewArticlePage from './pages/NewArticlePage';
import NewProductPage from './pages/NewProductPage'; 
import ArticlesPage from './pages/ArticlesPage';
import EditProductPage from './pages/EditProductPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminArticlesPage from './pages/AdminArticlesPage';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (route.startsWith('#/article/')) {
      const id = parseInt(route.split('/')[2], 10);
      return <ArticlePage articleId={id} />;
    }
// --- NOUVELLE ROUTE D'ADMINISTRATION : Modifier un Produit ---
    if (route.startsWith('#/admin/edit-product/')) {
          const productIdStr = route.substring('#/admin/edit-product/'.length);
          const productId = parseInt(productIdStr);
            
          if (!isNaN(productId)) {
                return <EditProductPage productId={productId} />;
          }
          return <div className="text-center py-20 text-red-500">ID de produit invalide pour la modification.</div>;
    }
    // --- NOUVELLE ROUTE D'ADMINISTRATION : Gestion des Articles ---
        if (route === '#/admin/articles') {
            return <AdminArticlesPage />;
        }
    // Route pour la gestion de la liste des produits (NOUVELLE)
        if (route === '#/admin/products') {
            return <AdminProductsPage />;
        }
// --- NOUVELLE ROUTE : Page de Détail d'un Produit ---
    if (route.startsWith('#/product/')) {
        const productIdStr = route.substring('#/product/'.length);
        const productId = parseInt(productIdStr);
        
        if (!isNaN(productId)) {
          return <ProductPage productId={productId} />;
        }
    }
    if (route === '#/shop') {
      return <ShopPage />;
    }
// --- ASSUREZ-VOUS QUE CETTE CONDITION EXISTE ---
    if (route === '#/articles') {
        return <ArticlesPage />;
    }
// --- NOUVELLE ROUTE : Page de Détail d'un Article ---
    // Vérifie si la route commence par #/article/
    if (route.startsWith('#/article/')) {
        // Extrait l'ID (la partie après #/article/)
        const articleIdStr = route.substring('#/article/'.length);
        // Tente de convertir l'ID en nombre
        const articleId = parseInt(articleIdStr);
        
        // Si l'ID est un nombre valide, affiche ArticlePage
        if (!isNaN(articleId)) {
            return <ArticlePage articleId={articleId} />;
        }
    }
// NOUVELLE ROUTE PRODUIT
    if (route === '#/admin/new-product') { 
      return <NewProductPage />;
    }
// NOUVELLE ROUTE : Ajouter un nouvel article
    if (route === '#/admin/new-article') { 
      return <NewArticlePage />;
    }    
    if (route === '#/admin') { 
      return <AdminPage />;
    }
    if (route === '#/login') { 
      return <LoginPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ligne Corrigée : Passage de 'route' au Header */}
      <Header currentRoute={route} setRoute={setRoute} /> 
      <main className="flex-grow container mx-auto px-4">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;