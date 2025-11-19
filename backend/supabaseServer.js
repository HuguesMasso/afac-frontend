const { createClient } = require('@supabase/supabase-js');

// Récupération des clés secrètes
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas configurées dans .env");
}

// Initialisation du client Supabase
// **TRÈS IMPORTANT :** Nous utilisons la clé service_role (Service Key) ici. 
// Elle contourne toutes les politiques de sécurité (RLS) et est uniquement utilisée sur le serveur.
const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = supabase;