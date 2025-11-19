
import { useState, useEffect, useCallback } from 'react';
import type { Article, Product } from '../types';
import { supabase } from '../supabaseClient'; 

// --- Interface de l'état du contenu ---
interface ContentState {
    articles: Article[];
    products: Product[];
    isLoading: boolean;
    error: string | null;
}

// --- Interface pour la valeur de retour du hook (incluant la fonction de rafraîchissement) ---
interface UseContentReturn extends ContentState {
    refreshContent: () => void;
}

// Variable de cache globale EXPORTÉE pour être utilisée par ArticlePage
export let contentCache: ContentState | null = null; 

// --- Le hook useContent modifié ---
export const useContent = (): UseContentReturn => {
    
    // État principal
    const [content, setContent] = useState<ContentState>(
        // Utiliser le cache si disponible
        contentCache || { articles: [], products: [], isLoading: true, error: null }
    );

    // Fonction de récupération des données, maintenant dans un useCallback pour la stabilité
    const fetchData = useCallback(async () => {
        
        // Afficher l'état de chargement
        setContent(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            // --- 1. Récupérer les articles ---
            const { data: articlesData, error: articlesError } = await supabase
                .from('articles') 
                .select('id, title, date, summary, content, imageUrl:image_url') 
                .order('date', { ascending: false }); 

            if (articlesError) throw articlesError;

            // --- 2. Récupérer les produits ---
            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select('id, name, price, description, imageUrl:image_url');

            if (productsError) throw productsError;

            // --- 3. Mettre à jour l'état et le CACHE ---
            const newContent: ContentState = {
                articles: (articlesData as Article[]) || [],
                products: (productsData as Product[]) || [],
                isLoading: false,
                error: null,
            };
            
            contentCache = newContent; // Stocker les données dans le cache
            setContent(newContent);

        } catch (e: any) {
            console.error('Erreur lors de la récupération des données:', e.message);
            setContent(prev => ({
                ...prev,
                isLoading: false,
                error: "Erreur lors du chargement des données. Vérifiez la connexion ou les politiques RLS.",
            }));
        }
    }, []); // Dépendances vides, la fonction ne change jamais

    // Fonction exposée pour forcer le rechargement
    const refreshContent = useCallback(() => {
        // Déclenche l'appel à fetchData
        fetchData();
    }, [fetchData]);


    useEffect(() => {
        // Si le cache est déjà rempli, on utilise les données en mémoire
        if (contentCache) {
            setContent(contentCache);
            return; 
        }
        
        // Sinon, on charge les données
        fetchData();
    }, [fetchData]);

    return {
        ...content, // articles, products, isLoading, error
        refreshContent, // La fonction ajoutée pour les pages d'administration
    };
};