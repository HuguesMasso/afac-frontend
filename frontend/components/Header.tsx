
import React from 'react';

interface HeaderProps {
    currentRoute: string;
    setRoute: (route: string) => void; 
}

const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
    
    const getLinkClass = (path: string) => {
        // La classe de base pour tous les liens
        const baseClass = "text-lg hover:text-brand-ochre transition-colors duration-300";
        
        // Logique pour déterminer si le lien est actif :
        // 1. Si on est sur la racine ('#/'), on vérifie si la route est vide ou '#/'
        // 2. Sinon, on vérifie si la route actuelle commence par le chemin du lien
        const isActive = (path === '#/' && (currentRoute === '' || currentRoute === '#/')) 
                       || (path !== '#/' && currentRoute.startsWith(path));
                       
        // Si actif, ajoute le style gras et la couleur ocre, sinon la couleur verte par défaut
        return isActive ? `${baseClass} text-brand-ochre font-bold` : `${baseClass} text-brand-green`;
    };
    
    return (
        <header 
            // MODIFICATIONS CLÉS POUR L'ESPACEMENT ET LA SÉPARATION
            // py-5: padding vertical intérieur
            // mb-8: marge inférieure pour espacer le contenu suivant
            // border-b border-gray-200: ligne de séparation professionnelle
            className="bg-brand-sand shadow-md sticky top-0 z-50 py-5 mb-8 border-b border-gray-200" 
        >
            <div className="container mx-auto px-4 flex justify-between items-center"> 
                
                {/* Logo / Nom du Site */}
                <a href="#/" className="text-3xl font-bold font-serif text-brand-brown tracking-wider">
                    AFAC AHEAD
                </a>
                
                {/* Navigation Principale */}
                <nav>
                    <ul className="flex space-x-8 items-center">
                        <li>
                            <a href="#/" className={getLinkClass('#/')}>
                                Accueil
                            </a>
                        </li>
                        
                        {/* LIEN VERS LA LISTE D'ARTICLES (Blog) */}
                        <li>
                            <a href="#/articles" className={getLinkClass('#/articles')}>
                                Articles
                            </a>
                        </li>
                        
                        {/* LIEN VERS LA LISTE DE PRODUITS (Boutique) */}
                        <li>
                            <a href="#/shop" className={getLinkClass('#/shop')}>
                                Boutique
                            </a>
                        </li>
                        
                        {/* Optionnel: Ajouter un lien pour l'Admin/Login ici si nécessaire */}
                        {/* <li>
                            <a href="#/admin" className={getLinkClass('#/admin')}>
                                Admin
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;