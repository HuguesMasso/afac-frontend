import { createClient } from '@supabase/supabase-js';

// Récupérez ces valeurs depuis le panneau de configuration Supabase (Étape 2)
// NOTE: En production, utilisez des variables d'environnement (.env) pour masquer les clés.
const supabaseUrl = 'https://kgjwgwduprdkjrgdnemv.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnandnd2R1cHJka2pyZ2RuZW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjAzMTEsImV4cCI6MjA3ODg5NjMxMX0.3JkHQSSz-UXm8M5jXEEuN8siktoi4T0Wq8YDJJdKaU8'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);