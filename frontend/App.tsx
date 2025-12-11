
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
import AdminDashboard from './pages/AdminDashboard'; // Importé pour la nouvelle logique


const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {

    // --- LOGIQUE DE ROUTAGE D'ADMINISTRATION (MODIFIÉE) ---
    // Cette partie est remontée pour englober toutes les routes admin
    if (route.startsWith('#/admin')) {
        // Enveloppe toutes les pages d'administration dans le composant AdminPage
        return (
            <AdminPage>
                {/* 1. ROUTE PAR DÉFAUT DE L'ADMINISTRATION : #/admin */}
                {route === '#/admin' ? <AdminDashboard /> : null} 

                {/* 2. GESTION DES ARTICLES : #/admin/articles */}
                {route === '#/admin/articles' ? <AdminArticlesPage /> : null} 

                {/* 3. NOUVEL ARTICLE : #/admin/new-article */}
                {route === '#/admin/new-article' ? <NewArticlePage /> : null}

                {/* 4. MODIFIER ARTICLE : #/admin/edit-article/:id */}
                {route.startsWith('#/admin/edit-article/') ? 
                    (() => {
                        const idStr = route.substring('#/admin/edit-article/'.length);
                        const id = parseInt(idStr);
                        return !isNaN(id) ? <EditArticlePage articleId={id} /> : <div className="text-center py-20 text-red-500">ID d'article invalide.</div>;
                    })() 
                    : null
                }
                
                {/* 5. GESTION DES PRODUITS : #/admin/products */}
                {route === '#/admin/products' ? <AdminProductsPage /> : null} 
                
                {/* 6. NOUVEAU PRODUIT : #/admin/new-product */}
                {route === '#/admin/new-product' ? <NewProductPage /> : null}

                {/* 7. MODIFIER PRODUIT : #/admin/edit-product/:id */}
                {route.startsWith('#/admin/edit-product/') ? 
                    (() => {
                        const productIdStr = route.substring('#/admin/edit-product/'.length);
                        const productId = parseInt(productIdStr);
                        return !isNaN(productId) ? <EditProductPage productId={productId} /> : <div className="text-center py-20 text-red-500">ID de produit invalide.</div>;
                    })() 
                    : null
                }
            </AdminPage>
        );
    }
    // --- FIN LOGIQUE D'ADMINISTRATION ---


    // --- ROUTES PUBLIQUES ---
    if (route.startsWith('#/article/')) {
      const id = parseInt(route.split('/')[2], 10);
      return <ArticlePage articleId={id} />;
    }
    
    // Route de détail de produit
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
    
    if (route === '#/login') { 
      return <LoginPage />;
    }
    
    // --- ROUTE PAR DÉFAUT ---
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRoute={route} setRoute={setRoute} /> 
      <main className="flex-grow container mx-auto px-4">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;