import React, { useState } from "react";
import Flag from "react-world-flags";
import Select from "react-select"
import { Eye, EyeOff, RefreshCw } from 'lucide-react';


const cityOptions = [
    { label: "Paris", countryCode: "FR" },
    { label: "New York", countryCode: "US" },
    { label: "Tokyo", countryCode: "JP" },
    { label: "Lagos", countryCode: "NG" },
    { label: "Lagos", countryCode: "NG" },
    { label: "Londres", countryCode: "GB" },
];

const ByEmail = () => {
    const [country, setCountry] = useState({ value: "BJ", label: "Bénin" });
    const [promoCode, setPromoCode] = useState("");
    const [city, setCity] = useState(null);
    const [currency, setCurrency] = useState("Franc CFA d'Afrique de l'Ouest (XOF)");
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);


    // Liste des pays avec leurs codes ISO et labels
    const countryOptions = [
        { value: "BJ", label: "Bénin" },
        { value: "CI", label: "Côte d'Ivoire" },
        { value: "SN", label: "Sénégal" },
        { value: "FR", label: "France" },
    ];

    // Liste des devises avec les codes de pays et labels
    const currencyOptions = [
        { value: "XOF", label: "Franc CFA d'Afrique de l'Ouest (XOF)", countryCode: "BF" },
        { value: "EUR", label: "Euro (EUR)", countryCode: "FR" },
        { value: "USD", label: "Dollar Américain (USD)", countryCode: "US" },
    ];



    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log({ country, currency, promoCode });
    };



    const handleDocumentNumberChange = (e) => {
        const input = e.target.value;
        // Permettre uniquement des lettres et des chiffres (supprime les caractères non valides)
        const validInput = input.replace(/[^a-zA-Z0-9]/g, '');
        setDocumentNumber(validInput);
    };


    // Fonction pour générer un mot de passe aléatoire
    const generatePassword = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let generatedPassword = '';
        for (let i = 0; i < 12; i++) {
            generatedPassword += chars[Math.floor(Math.random() * chars.length)];
        }
        setPassword(generatedPassword);
    };



  

   // Définition des styles personnalisés pour le Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#15803D", // Couleur de la bordure
      boxShadow: "none", // Supprime l'ombre par défaut
      "&:hover": {
        borderColor: "#15803D", // Couleur de la bordure au survol
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#15803D"
        : state.isFocused
          ? "#e0e7ff"
          : "#fff",
      color: state.isSelected ? "#fff" : "#15803D",
      "&:hover": {
        backgroundColor: "#e0e7ff", // Couleur au survol
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#15803D", // Couleur du texte sélectionné
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#15803D", // Couleur du placeholder
    }),
  };



    return (

        <div className="p-6 bg-white rounded-lg shadow-lg">
            {/* Le formulaire à afficher quand l'onglet "En un clic" est sélectionné */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Choisissez un pays */}
                    <div className="w-full">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                            Choisissez un pays
                        </label>
                        <Select
                            id="country"
                            value={country}
                            onChange={setCountry}
                            options={countryOptions}
                            getOptionLabel={(e) => (
                                <div className="flex items-center">
                                    <Flag code={e.value} alt={e.label} width={20} height={15} />
                                    <span className="ml-2">{e.label}</span>
                                </div>
                            )}
                            styles={customStyles}
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                            Sélectionnez une ville
                        </label>
                        <Select
                            id="city"
                            value={cityOptions.find((option) => option.label === city)}
                            onChange={(e) => setCity(e.label)}
                            options={cityOptions}
                            getOptionLabel={(e) => (
                                <div className="flex items-center">
                                    <Flag code={e.countryCode} alt={e.label} width={20} height={15} />
                                    <span className="ml-2">{e.label}</span>
                                </div>
                            )}
                            styles={customStyles}
                        />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {/* Sélectionnez la devise */}
                    <div className="w-full">
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                            Sélectionnez la devise
                        </label>
                        <Select
                            id="currency"
                            value={currencyOptions.find((option) => option.label === currency)}
                            onChange={(e) => setCurrency(e.label)}
                            options={currencyOptions}
                            getOptionLabel={(e) => (
                                <div className="flex items-center">
                                    <Flag code={e.countryCode} alt={e.label} width={20} height={15} />
                                    <span className="ml-2">{e.label}</span>
                                </div>
                            )}
                            styles={customStyles}
                        />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="w-full">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre adresse e-mail"
                            className="w-full p-2 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                        />
                    </div>

                    {/* Numéro de téléphone */}
                    <div className="w-full">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                            Numéro de téléphone
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+229 0197979700"
                                className="w-full p-2 pr-16 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="w-full">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nom
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Entrez votre Nom"
                            className="w-full p-2 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                        />
                    </div>

                    {/* Numéro de téléphone */}
                    <div className="w-full">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            Prenom
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="Entrez votre prenom"
                                className="w-full p-2 pr-16 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date de naissance */}
                    <div className="w-full">
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Date de naissance
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            placeholder="JJ/MM/AAAA"
                            className="w-full p-2 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                        />
                    </div>

                    {/* Date de délivrance */}
                    <div className="w-full">
                        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Date de délivrance
                        </label>
                        <input
                            type="date"
                            id="issueDate"
                            value={issueDate}
                            onChange={(e) => setIssueDate(e.target.value)}
                            placeholder="JJ/MM/AAAA"
                            className="w-full p-2 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {/* Numéro de document */}
                    <div className="w-full">
                        <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700 mb-2">
                            Numéro de document
                        </label>
                        <input
                            type="text"
                            id="documentNumber"
                            value={documentNumber}
                            onChange={(e) => handleDocumentNumberChange(e)}
                            placeholder="Entrez votre numéro de document"
                            className="w-full p-2 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mot de passe */}
                    <div className="w-full relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Entrez votre mot de passe"
                                className="w-full p-2 pr-20 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                            />
                            {/* Icône pour voir/masquer le mot de passe */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                            {/* Icône pour générer un mot de passe */}
                            <button
                                type="button"
                                onClick={generatePassword}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#15803D]"
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Confirmer le mot de passe */}
                    <div className="w-full relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Indiquez à nouveau votre mot de passe
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirmez votre mot de passe"
                                className="w-full p-2 pr-10 border text-black/60 border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                            />
                            {/* Icône pour voir/masquer le mot de passe */}
                            <button
                                type="button"
                                onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                    </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Code promo */}
                    <div>
                        <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">
                            Code promo (si vous en avez un)
                        </label>
                        <input
                            type="text"
                            id="promoCode"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Ex : WELCOME10"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                        />
                    </div>

                    {/* Bouton S'inscrire */}
                    <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                            Êtes-vous prêt(e) ?
                        </label>
                        <button
                            type="submit"
                            className="bg-[#15803D] text-white w-full py-2 rounded-md focus:outline-none hover:bg-green-600"
                        >
                            S'inscrire
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ByEmail;
