import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Email ou mot de passe incorrect.");
            setLoading(false);
        } else {
            // Si la connexion réussit, App.tsx va le détecter automatiquement
            // et rediriger vers #/admin grâce au useEffect.
            window.location.hash = '#/admin';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-brand-dark-blue mb-8">Connexion Admin</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-3 rounded focus:ring-2 focus:ring-brand-blue"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Mot de passe</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-3 rounded focus:ring-2 focus:ring-brand-blue"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-brand-ochre text-white font-bold py-3 rounded hover:bg-yellow-600 transition"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;