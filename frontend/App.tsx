
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
import EditArticlePage from './pages/EditArticlePage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminArticlesPage from './pages/AdminArticlesPage';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  // Initialisation sécurisée : on force une chaîne de caractères
  const [route, setRoute] = useState<string>(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      // On s'assure que même si le hash est vide, on a au moins '#/'
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    // SÉCURITÉ : On crée une copie locale garantie non-undefined pour les tests
    const currentRoute = route || '#/';

    // --- LOGIQUE DE ROUTAGE D'ADMINISTRATION ---
    // On vérifie d'abord si currentRoute existe avant le startsWith
    if (currentRoute && currentRoute.startsWith('#/admin')) {
        return (
            <AdminPage>
                {currentRoute === '#/admin' || currentRoute === '#/admin/' ? <AdminDashboard /> : null} 
                {currentRoute === '#/admin/articles' ? <AdminArticlesPage /> : null} 
                {currentRoute === '#/admin/new-article' ? <NewArticlePage /> : null}
                {currentRoute.startsWith('#/admin/edit-article/') && (() => {
                        const idStr = currentRoute.substring('#/admin/edit-article/'.length);
                        const id = parseInt(idStr);
                        return !isNaN(id) ? <EditArticlePage articleId={id} /> : <div className="text-center py-20 text-red-500">ID d'article invalide.</div>;
                    })() 
                }
                {currentRoute === '#/admin/products' ? <AdminProductsPage /> : null} 
                {currentRoute === '#/admin/new-product' ? <NewProductPage /> : null}
                {currentRoute.startsWith('#/admin/edit-product/') && (() => {
                        const productIdStr = currentRoute.substring('#/admin/edit-product/'.length);
                        const productId = parseInt(productIdStr);
                        return !isNaN(productId) ? <EditProductPage productId={productId} /> : <div className="text-center py-20 text-red-500">ID de produit invalide.</div>;
                    })() 
                }
            </AdminPage>
        );
    }

    // --- ROUTES PUBLIQUES ---
    if (currentRoute && currentRoute.startsWith('#/article/')) {
      const parts = currentRoute.split('/');
      const id = parts[2] ? parseInt(parts[2], 10) : NaN;
      return !isNaN(id) ? <ArticlePage articleId={id} /> : <HomePage />;
    }
    
    if (currentRoute && currentRoute.startsWith('#/product/')) {
        const productIdStr = currentRoute.substring('#/product/'.length);
        const productId = parseInt(productIdStr);
        if (!isNaN(productId)) return <ProductPage productId={productId} />;
    }

    if (currentRoute === '#/shop') return <ShopPage />;
    if (currentRoute === '#/articles') return <ArticlesPage />;
    if (currentRoute === '#/login') return <LoginPage />;
    
    // Si la route est vide ou ne correspond à rien : Accueil
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* On passe la route actuelle au Header pour gérer l'état actif des menus */}
      <Header currentRoute={route} setRoute={setRoute} /> 
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;