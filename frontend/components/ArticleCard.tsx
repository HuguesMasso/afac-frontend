
import React from 'react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="block group bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      <a href={`#/article/${article.id}`}>
        <div className="relative">
            {/* Le 'article.imageUrl' (camelCase) fonctionnera grâce au hook useContent */}
            <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
          </div>
      </a>
      <div className="p-6">
        <a href={`#/article/${article.id}`}>
          <h3 className="text-2xl font-serif font-bold text-brand-brown mb-2 group-hover:text-brand-ochre transition-colors duration-300">{article.title}</h3>
        </a>
        
        {/* LIGNE CORRIGÉE : Utilisation de la date formatée et suppression de l'auteur */}
        <p className="text-gray-600 text-sm mb-4">
          {formatDate(article.date)}
        </p>

        <p className="text-gray-700 leading-relaxed line-clamp-3">{article.summary}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
