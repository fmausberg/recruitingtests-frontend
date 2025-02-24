'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mail: '',
        password: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear any previous error
        const response = await fetch('http://localhost:8080/api/v0/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mail: formData.mail,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName
          }),
        });
        const data = await response.json();
        console.log(data);
    
        if (response.ok) {
          if (data && data.id && data.mail) {
            // Registration successful, redirect to confirmation page
            router.push('/home/auth/register/confirmation');
          }
        } else {
          // Registration failed, show error message
          setError(data.message || 'There was an error with the registration. Please try again.');
        }
      };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-16 pb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">Registrieren</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* firstName Feld */}
                    <div>
                        <label 
                            htmlFor="firstName" 
                            className="block text-sm font-medium text-textPrimary mb-2"
                        >
                            Vorname
                        </label>
                        <input
                            type="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
                            placeholder="Vorname"
                            required
                        />
                    </div>
                    {/* lastName Feld */}
                    <div>
                        <label 
                            htmlFor="lastName" 
                            className="block text-sm font-medium text-textPrimary mb-2"
                        >
                            Nachname
                        </label>
                        <input
                            type="lastName"
                            id="laslastNamee"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
                            placeholder="Nachname"
                            required
                        />
                    </div>
                    {/* Telephone Feld */}
                    {/* no telefon field necessary
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
                    </div> */}
                    {/* mail Feld */}
                    <div>
                        <label 
                            htmlFor="mail" 
                            className="block text-sm font-medium text-textPrimary mb-2"
                        >
                            mail
                        </label>
                        <input
                            type="mail"
                            id="mail"
                            value={formData.mail}
                            onChange={(e) => setFormData({...formData, mail: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
                            placeholder="ihre@mail.com"
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