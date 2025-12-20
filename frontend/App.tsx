
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
  const [route, setRoute] = useState<string>(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    const currentRoute = route || '#/';

    // --- LOGIQUE ADMIN ---
    if (currentRoute.startsWith('#/admin')) {
        return (
            <AdminPage>
                {currentRoute === '#/admin' && <AdminDashboard />} 
                {currentRoute === '#/admin/articles' && <AdminArticlesPage />} 
                {currentRoute === '#/admin/new-article' && <NewArticlePage />}
                {currentRoute.startsWith('#/admin/edit-article/') && (() => {
                        const id = parseInt(currentRoute.substring('#/admin/edit-article/'.length));
                        return !isNaN(id) ? <EditArticlePage articleId={id} /> : null;
                    })() 
                }
                {currentRoute === '#/admin/products' && <AdminProductsPage />} 
                {currentRoute === '#/admin/new-product' && <NewProductPage />}
                {currentRoute.startsWith('#/admin/edit-product/') && (() => {
                        const id = parseInt(currentRoute.substring('#/admin/edit-product/'.length));
                        return !isNaN(id) ? <EditProductPage productId={id} /> : null;
                    })() 
                }
            </AdminPage>
        );
    }

    // --- ROUTES PUBLIQUES ---
    if (currentRoute === '#/shop') return <ShopPage />;
    if (currentRoute === '#/articles') return <ArticlesPage />;
    if (currentRoute === '#/login') return <LoginPage />;
    if (currentRoute.startsWith('#/article/')) {
        const id = parseInt(currentRoute.split('/')[2]);
        return <ArticlePage articleId={id} />;
    }
    
    // PAR DÉFAUT : HomePage
    return <HomePage />;
  };

  // Déterminer si on est sur l'admin pour cacher le Header/Footer standard
  const isAdmin = route.startsWith('#/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Header currentRoute={route} setRoute={setRoute} />}
      
      {/* On enlève le 'container' ici pour laisser les pages gérer leur propre largeur */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;