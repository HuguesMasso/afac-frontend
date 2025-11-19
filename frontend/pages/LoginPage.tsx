import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMessage(`Erreur de connexion : ${error.message}`);
        } else {
            // Redirige l'utilisateur vers le tableau de bord Admin
            window.location.hash = '#/admin'; 
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <h1 className="text-3xl font-serif font-bold text-center text-brand-brown mb-6">Connexion Admin</h1>
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-ochre text-white py-2 rounded-md font-semibold hover:bg-brand-brown transition-colors disabled:bg-gray-400"
                >
                    {loading ? 'Chargement...' : 'Se connecter'}
                </button>
                {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
            </form>
        </div>
    );
};

export default LoginPage;