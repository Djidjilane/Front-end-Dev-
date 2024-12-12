import React, { useState } from "react";
import { Eye, EyeOff, Phone, Mail } from "lucide-react";
import { FaGoogle, FaFacebook, FaTelegram } from "react-icons/fa";

// Base de données locale pour les drapeaux et préfixes
const countryData = [
  { code: "FR", name: "France", flag: "🇫🇷", prefix: "+33" },
  { code: "US", name: "United States", flag: "🇺🇸", prefix: "+1" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", prefix: "+225" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", prefix: "+234" },
];

const LoginForm = () => {
  const [inputType, setInputType] = useState("email"); // email ou phone
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState("🌐"); // Drapeau par défaut

  // Détecter le pays à partir du préfixe
  const handlePhoneInput = (value) => {
    // Nettoyer l'entrée pour ne garder que les chiffres et les "+"
    const cleanedValue = value.replace(/[^+\d]/g, "");
    setInputValue(cleanedValue);

    // Rechercher le préfixe correspondant (le plus long d'abord)
    const country = countryData
      .sort((a, b) => b.prefix.length - a.prefix.length) // Trier par longueur du préfixe
      .find((c) => cleanedValue.startsWith(c.prefix));

    // Mettre à jour le drapeau
    setSelectedFlag(country ? country.flag : "🌐");
  };

  const toggleInputType = () => {
    setInputType(inputType === "email" ? "phone" : "email");
    setInputValue(""); // Réinitialiser le champ
    setSelectedFlag("🌐"); // Réinitialiser le drapeau
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${inputType === "email" ? "Email" : "Téléphone"}:`, inputValue);
    console.log("Mot de passe:", password);
    console.log("Se souvenir:", rememberMe);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-md p-6">
      <h2 className="text-sm font-semibold text-center text-gray-700 mb-4">SE CONNECTER</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ e-mail ou téléphone */}
        <div className="mb-4">
          <label htmlFor="input" className="block text-sm text-gray-600 mb-1">
            {inputType === "email" ? "E-mail ou ID" : "Numéro de téléphone"}
          </label>
          <div className="relative">
            <input
              type="text"
              id="input"
              value={inputValue}
              onChange={(e) =>
                inputType === "phone"
                  ? handlePhoneInput(e.target.value)
                  : setInputValue(e.target.value)
              }
              placeholder={inputType === "email" ? "E-mail ou ID" : "+3304384344547"}
              className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
            />
            {/* Drapeau ou icône à gauche */}
            <span className="absolute text-black/60 left-3 top-1/2 transform -translate-y-1/2 text-xl">
              {inputType === "phone" ? selectedFlag : <Mail size={20} className="text-black/60" />}
            </span>
            {/* Icône pour basculer à droite */}
            <span
              onClick={toggleInputType}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {inputType === "email" ? <Phone size={20} /> : <Mail size={20} />}
            </span>
          </div>
        </div>

        {/* Mot de passe */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>
        </div>

        {/* Se souvenir */}
        <div className="mb-4 flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 text-green-500"
            />
            Se souvenir
          </label>
          <a href="/auth/option-forget-password" className="text-sm text-green-500 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        {/* Bouton Se connecter */}
        <button
          type="submit"
          className="w-full bg-green-500 text-sm text-white py-2 rounded-md text-center hover:bg-green-600 transition"
        >
          <a href="#">
            SE CONNECTER
          </a>
        </button>
        <div className="flex justify-between mt-6 text-black/60 space-x-3">
          <span>Avez vous déjà un compte ?</span>
          <a href="/auth/option-auth" className="text-green-500 hover:underline">S'inscrire</a>
        </div>
      </form>

      {/* Connexion via d'autres options */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Vous pouvez vous connecter à votre compte via :
        </p>
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
      {/* Connexion par SMS */}
      <div className="mt-6">
        <button
          type="button"
          className="w-full bg-green-200 text-sm text-green-600 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-green-300 transition"
        >
          <Mail size={24} />
          <a href="/auth/phone-verification">SE CONNECTER PAR SMS</a>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;







