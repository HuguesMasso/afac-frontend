
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 1. IMPORTATION DE TON IMAGE
// @ts-ignore
import topBannerImage from '../assets/top-banner.jpeg';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Header />

            <main className="flex-grow">
                {/* 2. SECTION IMAGE (JUSTE APRÈS LE HEADER) */}
                <div className="w-full h-64 md:h-[550px] overflow-hidden bg-gray-200 border-b border-gray-100">
                    <img
                        src={topBannerImage}
                        alt="AFACAHEAD Accueil"
                        // object-cover permet à l'image de remplir l'espace sans se déformer
                        className="w-full h-full object-cover shadow-inner"
                    />
                </div>

                {/* Section Bannière d'introduction textuelle */}
                <section className="bg-brand-beige py-20 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark-blue mb-6 leading-tight">
                            L'Excellence et l'Innovation au Cœur de l'Afrique
                        </h1>
                        <p className="text-xl text-brand-gray mb-10 leading-relaxed">
                            Découvrez AFACAHEAD, votre partenaire privilégié pour des solutions
                            technologiques d'avant-garde et des produits de qualité supérieure.
                            Nous forgeons l'avenir, aujourd'hui.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                            <a href="#/boutique" className="px-8 py-4 bg-brand-ochre text-white text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-700 transition duration-300 w-full md:w-auto text-center">
                                Explorer la Boutique
                            </a>
                            <a href="#/articles" className="px-8 py-4 bg-white text-brand-blue text-lg font-semibold rounded-full shadow-lg border-2 border-brand-blue hover:bg-blue-50 transition duration-300 w-full md:w-auto text-center">
                                Lire nos Articles
                            </a>
                        </div>
                    </div>
                </section>

                {/* Section "Pourquoi Nous Choisir" */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto max-w-6xl px-4">
                        <h2 className="text-3xl font-bold text-center text-brand-dark-blue mb-12">Pourquoi Choisir AFACAHEAD ?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Valeur 1 */}
                            <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-green-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Qualité Certifiée</h3>
                                <p className="text-gray-600">Nous nous engageons à ne fournir que des produits répondant aux standards les plus élevés.</p>
                            </div>
                            {/* Valeur 2 */}
                            <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Innovation Continue</h3>
                                <p className="text-gray-600">Toujours à la pointe de la technologie pour vous offrir des solutions modernes.</p>
                            </div>
                            {/* Valeur 3 */}
                            <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-yellow-50 text-brand-ochre rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Support Dédié</h3>
                                <p className="text-gray-600">Notre équipe est à votre écoute pour vous accompagner à chaque étape.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
