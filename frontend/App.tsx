import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Session } from '@supabase/supabase-js';

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
  // On initialise avec une chaîne vide "" pour éviter le "undefined"
  const [route, setRoute] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Sécurisation ici aussi : on s'assure que c'est toujours une chaîne de caractères
    setRoute(window.location.hash || '#/');
    setIsMounted(true);

    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && window.location.hash && window.location.hash.startsWith('#/admin')) {
          window.location.hash = '#/login';
      }
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      subscription.unsubscribe();
    };
  }, []);

  if (!isMounted || authLoading) {
    return null;
  }

  // --- CORRECTION MAJEURE ICI ---
  // On utilise une variable sécurisée "safeRoute"
  const safeRoute = route || '#/';

  const renderPage = () => {
    // On utilise safeRoute partout au lieu de route
    if (safeRoute.startsWith('#/admin')) {
        
        if (!session) {
            if (safeRoute !== '#/login') {
                 setTimeout(() => window.location.hash = '#/login', 0);
                 return <LoginPage />;
            }
        }

        return (
            <AdminPage>
                {safeRoute === '#/admin' && <AdminDashboard />}
                {safeRoute === '#/admin/articles' && <AdminArticlesPage />}
                {safeRoute === '#/admin/new-article' && <NewArticlePage />}
                {safeRoute.startsWith('#/admin/edit-article/') && (() => {
                        const id = parseInt(safeRoute.substring('#/admin/edit-article/'.length));
                        return !isNaN(id) ? <EditArticlePage articleId={id} /> : null;
                    })() 
                }
                {safeRoute === '#/admin/products' && <AdminProductsPage />}
                {safeRoute === '#/admin/new-product' && <NewProductPage />}
                {safeRoute.startsWith('#/admin/edit-product/') && (() => {
                        const id = parseInt(safeRoute.substring('#/admin/edit-product/'.length));
                        return !isNaN(id) ? <EditProductPage productId={id} /> : null;
                    })() 
                }
            </AdminPage>
        );
    }

    if (safeRoute === '#/shop') return <ShopPage />;
    if (safeRoute === '#/articles') return <ArticlesPage />;
    
    if (safeRoute === '#/login') {
        if (session) {
            setTimeout(() => window.location.hash = '#/admin', 0);
            return <AdminDashboard />;
        }
        return <LoginPage />;
    }

    if (safeRoute.startsWith('#/article/')) {
        const parts = safeRoute.split('/');
        const id = parts.length > 2 ? parseInt(parts[2]) : NaN;
        return !isNaN(id) ? <ArticlePage articleId={id} /> : <HomePage />;
    }
    if (safeRoute.startsWith('#/product/')) {
        const id = parseInt(safeRoute.substring('#/product/'.length));
        return !isNaN(id) ? <ProductPage productId={id} /> : <HomePage />;
    }

    return <HomePage />;
  };

  // --- CORRECTION CRITIQUE (C'est cette ligne qui faisait planter) ---
  // On ajoute "|| ''" pour que si route est undefined, ça devienne juste du texte vide
  const isAdminRoute = (route || '').startsWith('#/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {/* On passe safeRoute au Header aussi pour éviter les bugs dedans */}
      {(!isAdminRoute || !session) && <Header currentRoute={safeRoute} setRoute={setRoute} />}
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      {(!isAdminRoute || !session) && <Footer />}
    </div>
  );
};

export default App;