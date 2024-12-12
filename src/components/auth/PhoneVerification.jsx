import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Base de données locale pour les drapeaux et préfixes
const countryData = [
    { code: "FR", name: "France", flag: "🇫🇷", prefix: "+33" },
    { code: "US", name: "United States", flag: "🇺🇸", prefix: "+1" },
    { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", prefix: "+225" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬", prefix: "+234" },
];

const PhoneVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState("+225"); // Initialiser avec le préfixe de la Côte d'Ivoire
    const [selectedCountry, setSelectedCountry] = useState(countryData[2]); // Par défaut : Côte d'Ivoire

    const handlePhoneInput = (value) => {
        // Nettoyer l'entrée pour garder uniquement les chiffres et les "+"
        const cleanedValue = value.replace(/[^+\d]/g, "");
        setPhoneNumber(cleanedValue);

        // Identifier le pays correspondant au préfixe
        const country = countryData.find((c) =>
            cleanedValue.startsWith(c.prefix)
        );
        if (country) {
            setSelectedCountry(country); // Met à jour le drapeau si le préfixe est reconnu
        } else {
            setSelectedCountry({ flag: "🌐" }); // Réinitialise au globe si non reconnu
        }
    };


    const handleSendCode = () => {
        if (phoneNumber.length < 8) {
            toast.error("Veuillez entrer un numéro de téléphone valide.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return;
        }

        toast.success(`Un code a été envoyé au numéro ${phoneNumber}.`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };



    return (
        <div className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-md p-6">
            {/* Titre */}
            <h2 className="text-sm font-semibold text-center text-gray-700 mb-4">
                SAISISSEZ VOTRE NUMÉRO DE TÉLÉPHONE
            </h2>
            {/* Champ de saisie */}
            <div className="relative mb-4">
                {/* Drapeau dynamique */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-green-600">
                    {selectedCountry.flag}
                </div>
                {/* Input pour le numéro complet */}
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneInput(e.target.value)}
                    placeholder="90 01 12 34"
                    className="w-full border border-gray-300 rounded-md pl-16 pr-4 py-2 text-gray-700 focus:outline-none focus:border-green-500"
                />
            </div>
            {/* Bouton envoyer */}
            <button
                onClick={handleSendCode}
                className="w-full text-sm bg-green-600 text-white py-2 rounded-md text-center hover:bg-green-700 transition"
            >
                ENVOYER UN CODE
            </button>
            {/* Texte explicatif */}
            <p className="mt-4 text-sm text-gray-600 text-center">
                Le code sera envoyé sur ce numéro de téléphone. Veuillez le saisir afin
                de vous connecter au site internet.
            </p>
            {/* Bouton pour entrer via un autre formulaire */}
            <button
                className="w-full mt-4 bg-green-200 text-sm text-green-600 py-2 rounded-md text-center"
            >
                <a href="/auth/login">ENTREZ VIA LE FORMULAIRE</a>
            </button>
            {/* Toastify container */}
            <ToastContainer
                style={{ marginTop: "40px" }}
            />
        </div>
    );
};

export default PhoneVerification;
