import React, { useState } from "react";
import Flag from "react-world-flags";
import Select from "react-select"
import { FaGoogle, FaFacebook, FaTelegram } from 'react-icons/fa';

const BySocialNetwork = () => {
    const [country, setCountry] = useState({ value: "BJ", label: "Bénin" });
    const [promoCode, setPromoCode] = useState("");
    const [currency, setCurrency] = useState("Franc CFA d'Afrique de l'Ouest (XOF)");

    // Liste des pays avec leurs codes ISO et labels
    const countryOptions = [
        { value: "BJ", label: "Bénin" },
        { value: "CI", label: "Côte d'Ivoire" },
        { value: "SN", label: "Sénégal" },
        { value: "FR", label: "France" },
    ];


    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log({ country, currency, promoCode });
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


    // Liste des devises avec les codes de pays et labels
    const currencyOptions = [
        { value: "XOF", label: "Franc CFA d'Afrique de l'Ouest (XOF)", countryCode: "BF" },
        { value: "EUR", label: "Euro (EUR)", countryCode: "FR" },
        { value: "USD", label: "Dollar Américain (USD)", countryCode: "US" },
    ];


    return (

        <div className="p-6 bg-white rounded-lg shadow-lg">

            <div className="p-4">
                {/* Titre */}
                <h2 className="text-center text-black/60 text-xl font-semibold mb-4">Réseaux sociaux</h2>

                {/* Icones alignées horizontalement */}
                <div className="flex justify-center space-x-6">
                    <a
                        href="https://www.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                    >
                        <FaGoogle size={20} />
                    </a>
                    <a
                        href="https://www.x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 bg-gray-800 rounded-full text-white  transition"
                    >
                        <FaTelegram size={20} />
                    </a>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1  rounded-full text-white bg-blue-500 transition"
                    >
                        <FaFacebook size={20} />
                    </a>
                </div>
            </div>
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

export default BySocialNetwork;
