// Import des variables d'environnement
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

// Configuration du serveur
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({ 
    origin: 'http://localhost:5173' // Autorise les requêtes de votre frontend Vite
}));
app.use(express.json()); // Permet à Express de lire le JSON

// --- Routes d'API ---
// Importez ici vos modules de routes pour les articles, les produits, les transactions, etc.
const articleRoutes = require('./routes/articles');
app.use('/api/articles', articleRoutes); 
// Exemple de route de base
app.get('/', (req, res) => {
    res.send('AFAC AHEAD Backend API running.');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});