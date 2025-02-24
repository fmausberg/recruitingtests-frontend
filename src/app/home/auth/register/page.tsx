'use client';
import { useState } from 'react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        telephone: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hier kommt später Ihre Login-Logik
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-16 pb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">Registrieren</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Firstname Feld */}
                    <div>
                        <label 
                            htmlFor="firstname" 
                            className="block text-sm font-medium text-textPrimary mb-2"
                        >
                            Vorname
                        </label>
                        <input
                            type="firstname"
                            id="firstname"
                            value={formData.firstname}
                            onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
                            placeholder="Vorname"
                            required
                        />
                    </div>
                    {/* Lastname Feld */}
                    <div>
                        <label 
                            htmlFor="lastname" 
                            className="block text-sm font-medium text-textPrimary mb-2"
                        >
                            Nachname
                        </label>
                        <input
                            type="lastname"
                            id="lastname"
                            value={formData.lastname}
                            onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
                            placeholder="Nachname"
                            required
                        />
                    </div>
                    {/* Telephone Feld */}
                    <div>
                        <label 
                            htmlFor="telephone" 
                            className="block text-sm font-medium text-textPrimary mb-2"
                        >
                            Telefon
                        </label>
                        <input
                            type="telephone"
                            id="telephone"
                            value={formData.telephone}
                            onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
                            placeholder="Telefon"
                            required
                        />
                    </div>
                    {/* Email Feld */}
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium text-textPrimary mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
                            placeholder="ihre@email.com"
                            required
                        />
                    </div>

                    {/* Passwort Feld */}
                    <div>
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-textPrimary mb-2"
                        >
                            Passwort
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Zusätzliche Links */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input 
                                type="checkbox" 
                                className="rounded border-slate-300 text-formsDesigns-checkbox shadow-sm focus:formsDesigns-focus focus:ring focus:ring-formsDesigns-focus focus:ring-opacity-50"
                                required
                            />
                            <span className="ml-2 text-textPrimary">Datenschutz akzeptieren</span>
                        </label>
                        <a href="/home/auth/forgot-password" className="text-links hover:text-links-hover">
                            Datenschutzerklärung
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primaryButton text-primaryButton-text py-2 px-4 rounded-md hover:bg-primaryButton-hover focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus focus:ring-offset-2 transition-colors duration-300"
                    >
                        Registrieren
                    </button>

                    {/* Registrierungs-Link */}
                    <p className="text-center text-sm text-textPrimary-light">
                        Bereits ein Konto?{' '}
                        <a href="/home//auth/login" className="text-links hover:text-links-hover">
                            Jetzt einloggen
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}