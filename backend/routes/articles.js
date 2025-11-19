const express = require('express');
const supabase = require('../supabaseServer'); // Le client Supabase côté serveur
const router = express.Router();

// Middleware de sécurité : Vérifiez que l'utilisateur est un Admin avant de continuer.
// NOTE: Ceci est une version simplifiée. En réalité, vous vérifierez un JWT ou un token secret.
const checkAdmin = (req, res, next) => {
    // Ici, vous devrez implémenter la logique de vérification de l'administrateur.
    // Pour l'exemple, nous allons simuler une vérification par une clé d'en-tête secrète.
    const adminToken = req.headers['x-admin-token']; 
    if (adminToken === 'MA_CLE_ADMIN_SECRETE_123') { // REMPLACEZ ceci par une vraie logique de token
        next(); // L'utilisateur est admin, on continue
    } else {
        res.status(403).json({ error: 'Accès refusé. Token Admin manquant ou invalide.' });
    }
};

// --- ROUTE ADMIN : AJOUTER UN NOUVEL ARTICLE (Nécessite une vérification Admin) ---
router.post('/admin/add', checkAdmin, async (req, res) => {
    const { title, date, image_url, summary, content } = req.body;
    
    // Validation minimale des données
    if (!title || !content) {
        return res.status(400).json({ error: 'Titre et contenu sont requis.' });
    }

    // Insertion dans la table 'articles' de Supabase
    const { data, error } = await supabase
        .from('articles')
        .insert([{ 
            title, 
            date: date || new Date().toISOString(), // Utilise la date fournie ou la date actuelle
            image_url, 
            summary, 
            content // Le type doit correspondre à 'text[]' (tableau de texte)
        }])
        .select(); // Retourne l'enregistrement inséré

    if (error) {
        console.error('Erreur Supabase lors de l\'ajout :', error);
        return res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de l\'article.' });
    }

    res.status(201).json({ 
        message: 'Article ajouté avec succès.', 
        article: data[0] 
    });
});

module.exports = router;