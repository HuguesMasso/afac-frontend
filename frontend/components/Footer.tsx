
import React from 'react';

const Footer: React.FC = () => {
 return (
  <footer className="bg-brand-brown text-white mt-12 pt-10 pb-4">
    <div className="container mx-auto px-4">
        
        {/* Grille Principale (3 Colonnes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-brand-ochre pb-8 mb-4">
            
            {/* Colonne 1 : À Propos (Nouveau Texte d'Ancrage) */}
            <div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-brand-ochre">AFAC AHEAD</h3>
                <p className="text-sm max-w-sm text-gray-300">
                    Ngangue et fils International
                </p>
            </div>
            
            {/* Colonne 2 : Contact & Informations (TA DEMANDE) */}
            <div>
                <h4 className="text-xl font-semibold mb-4">Nous Contacter</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-brand-ochre" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        Email : <a href="ngangueetfils@gmail.com" className="hover:text-brand-ochre transition-colors ml-1">ngangueetfils@gmail.com</a>
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-brand-ochre" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.49 5.49l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        Téléphone : +33 6 95 10 29 68 / +33 9 84 55 15  47
                    </li>
                    <li className="flex items-start">
                        <svg className="w-5 h-5 mr-3 mt-1 text-brand-ochre" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Adresse : Paris, France
                    </li>
                </ul>
            </div>
            
            {/* Colonne 3 : Liens Rapides */}
            <div>
                <h4 className="text-xl font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li><a href="#/" className="hover:text-brand-ochre transition-colors">Accueil</a></li>
                    <li><a href="#/articles" className="hover:text-brand-ochre transition-colors">Articles & Blog</a></li>
                    <li><a href="#/shop" className="hover:text-brand-ochre transition-colors">Boutique & Produits</a></li>
                    <li><a href="#/politique" className="hover:text-brand-ochre transition-colors">Politique de Confidentialité</a></li>
                </ul>
            </div>
            
        </div>
        
        {/* Droits d'auteur (Bottom Bar) */}
        <div className="flex justify-center items-center text-sm py-3 text-gray-400">
            <p>&copy; {new Date().getFullYear()} AFAC AHEAD. Tous droits réservés.</p>
        </div>
        
    </div>
</footer>
 );
};

export default Footer;
