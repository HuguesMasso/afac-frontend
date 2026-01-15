import React, { useState } from 'react';

// On définit les types pour être rigoureux
interface HeaderProps {
    currentRoute: string;
    setRoute: (route: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRoute, setRoute }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fonction de navigation sécurisée
    const navigate = (path: string) => {
        window.location.hash = path;
        setRoute(path);
        setIsMobileMenuOpen(false); // Ferme le menu mobile après clic
    };

    // --- SÉCURITÉ ICI : On s'assure que routeSafe est toujours une chaîne de texte ---
    const routeSafe = currentRoute || ''; 

    // Helper pour savoir si un lien est actif
    const isActive = (path: string) => {
        if (path === '#/') return routeSafe === '#/' || routeSafe === '';
        return routeSafe.startsWith(path);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                
                {/* LOGO */}
                <div 
                    className="text-2xl font-extrabold text-brand-dark-blue cursor-pointer tracking-tighter"
                    onClick={() => navigate('#/')}
                >
                    AFACAHEAD
                </div>

                {/* MENU BUREAU (Desktop) */}
                <nav className="hidden md:flex space-x-8">
                    <button 
                        onClick={() => navigate('#/')}
                        className={`text-base font-medium transition-colors duration-300 ${isActive('#/') ? 'text-brand-ochre' : 'text-gray-600 hover:text-brand-ochre'}`}
                    >
                        Accueil
                    </button>
                    <button 
                        onClick={() => navigate('#/shop')}
                        className={`text-base font-medium transition-colors duration-300 ${isActive('#/shop') ? 'text-brand-ochre' : 'text-gray-600 hover:text-brand-ochre'}`}
                    >
                        Boutique
                    </button>
                    <button 
                        onClick={() => navigate('#/articles')}
                        className={`text-base font-medium transition-colors duration-300 ${isActive('#/articles') ? 'text-brand-ochre' : 'text-gray-600 hover:text-brand-ochre'}`}
                    >
                        Articles
                    </button>
                    <button 
                        onClick={() => navigate('#/admin')} // Ou #/login
                        className="px-5 py-2 bg-brand-dark-blue text-white rounded-full font-semibold hover:bg-blue-900 transition shadow-md"
                    >
                        Espace Admin
                    </button>
                </nav>

                {/* BOUTON MENU MOBILE (Hamburger) */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-600 hover:text-brand-dark-blue focus:outline-none"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* MENU MOBILE (Déroulant) */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="flex flex-col px-4 py-2 space-y-2">
                        <button 
                            onClick={() => navigate('#/')}
                            className={`text-left py-2 font-medium ${isActive('#/') ? 'text-brand-ochre' : 'text-gray-600'}`}
                        >
                            Accueil
                        </button>
                        <button 
                            onClick={() => navigate('#/shop')}
                            className={`text-left py-2 font-medium ${isActive('#/shop') ? 'text-brand-ochre' : 'text-gray-600'}`}
                        >
                            Boutique
                        </button>
                        <button 
                            onClick={() => navigate('#/articles')}
                            className={`text-left py-2 font-medium ${isActive('#/articles') ? 'text-brand-ochre' : 'text-gray-600'}`}
                        >
                            Articles
                        </button>
                        <button 
                            onClick={() => navigate('#/admin')}
                            className="text-left py-2 font-bold text-brand-dark-blue"
                        >
                            Espace Admin
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;