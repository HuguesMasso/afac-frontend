
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
  // Initialisation sécurisée : on s'assure que route n'est jamais undefined ou null
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    // Sécurité supplémentaire : on s'assure qu'on travaille sur une chaîne
    const currentRoute = route || '#/';

    // --- LOGIQUE DE ROUTAGE D'ADMINISTRATION ---
    if (currentRoute.startsWith('#/admin')) {
        return (
            <AdminPage>
                {currentRoute === '#/admin' ? <AdminDashboard /> : null} 
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
    if (currentRoute.startsWith('#/article/')) {
      const id = parseInt(currentRoute.split('/')[2], 10);
      return <ArticlePage articleId={id} />;
    }
    
    if (currentRoute.startsWith('#/product/')) {
        const productIdStr = currentRoute.substring('#/product/'.length);
        const productId = parseInt(productIdStr);
        if (!isNaN(productId)) return <ProductPage productId={productId} />;
    }

    if (currentRoute === '#/shop') return <ShopPage />;
    if (currentRoute === '#/articles') return <ArticlesPage />;
    if (currentRoute === '#/login') return <LoginPage />;
    
    // Page d'accueil pour #/ ou n'importe quelle route non reconnue
    return <HomePage />;
  };

  // On vérifie si on est sur l'admin pour adapter le layout (optionnel)
  const isAdmin = route.startsWith('#/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {/* On n'affiche le Header/Footer classique que si on n'est pas dans l'interface admin personnalisée */}
      {!isAdmin && <Header currentRoute={route} setRoute={setRoute} />}
      
      <main className={`flex-grow ${isAdmin ? '' : 'container mx-auto px-4'}`}>
        {renderPage()}
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;