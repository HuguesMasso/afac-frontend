
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-brown text-white mt-12 pt-8 pb-4">
      <div className="container mx-auto px-4">
        
        {/* Section principale du pied de page */}
        <div className="flex justify-between border-b border-brand-ochre pb-6 mb-6">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-3 text-brand-ochre">AFAC AHEAD</h3>
            <p className="text-sm max-w-sm">
              Notre mission est de partager les récits d'innovation, de culture et d'entrepreneuriat qui façonnent l'avenir du continent africain.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-3">Liens Rapides</h4>
            <ul>
              <li className="mb-1"><a href="#/" className="hover:text-brand-ochre transition-colors">Accueil</a></li>
              <li className="mb-1"><a href="#/articles" className="hover:text-brand-ochre transition-colors">Articles</a></li>
              <li className="mb-1"><a href="#/shop" className="hover:text-brand-ochre transition-colors">Boutique</a></li>
            </ul>
          </div>
        </div>
        
        {/* Droits d'auteur et Bouton Admin */}
        <div className="flex justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} AFAC AHEAD. Tous droits réservés.</p>
          
          {/* BOUTON ADMIN VISIBLE DANS LE PIED DE PAGE */}
          <a 
            href="#/admin" 
            className="text-brand-ochre hover:text-white font-semibold py-1 px-3 border border-brand-ochre hover:bg-brand-ochre transition-all rounded"
          >
            Administration
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
