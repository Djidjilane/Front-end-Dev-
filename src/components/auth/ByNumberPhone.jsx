import React, { useState } from "react";
import Flag from "react-world-flags";
import Select from "react-select"
const ByNumberPhone = () => {
  const [country, setCountry] = useState({ value: "BJ", label: "Bénin" });
  const [currency, setCurrency] = useState("Franc CFA d'Afrique de l'Ouest (XOF)");
  const [promoCode, setPromoCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState('BJ');
  const [confirmCode, setConfirmCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    console.log({ country, currency, promoCode });
  };

  const handleConfirmCode = () => {
    // Logique de confirmation du code ici
    console.log("Code de confirmation : ", confirmCode);
    // Vous pouvez ajouter un appel API ou toute autre logique nécessaire
  };

  // Fonction pour détecter le code pays en fonction du numéro
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    setphoneNumber(phoneNumber);

    // Logique pour détecter l'indicatif du pays
    if (phoneNumber.startsWith('+229')) {
      setCountryCode('BJ');
    } else if (phoneNumber.startsWith('+33')) {
      setCountryCode('FR');
    } else if (phoneNumber.startsWith('+1')) {
      setCountryCode('US');
    } else {
      setCountryCode('BJ');
    }
  };

  // Liste des pays avec leurs codes ISO et labels
  const countryOptions = [
    { value: "BJ", label: "Bénin" },
    { value: "CI", label: "Côte d'Ivoire" },
    { value: "SN", label: "Sénégal" },
    { value: "FR", label: "France" },
  ];





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
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {/* Le formulaire à afficher quand l'onglet "Par un Téléphone" est sélectionné */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Envoie de SMS */}
          <div className="w-full">
            <label htmlFor="confirmCode" className="block text-sm font-medium text-gray-700 mb-2">
              Votre numéro de téléphone
            </label>
            <div className="relative">
              {/* Input pour le numéro de téléphone */}
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="+229 0197979700"
                className="w-full pl-10 pr-24 py-2 border text-black/60 border-gray-300 rounded-md focus:outline-none"
              />

              <Flag
                code={countryCode}
                alt="Country flag"
                width={24}
                height={16}
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
              />

              <button
                onClick={handleConfirmCode}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-[#15803D] text-white  focus:outline-none"
              >
                Envoyer un SMS
              </button>
            </div>
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

          {/* Bouton Confirmation */}
          <div className="w-full">
            <label htmlFor="confirmCode" className="block text-sm font-medium text-gray-700 mb-2">
              Code de confirmation
            </label>
            <div className="relative">
              <input
                type="text"
                id="confirmCode"
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
                placeholder="Entrez votre code de confirmation"
                className="w-full p-2 pr-16 border text-black/60 border-gray-300 rounded-md  focus:outline-none"
              />
              <button
                onClick={() => handleConfirmCode()}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2  bg-[#15803D] text-white rounded-sm  focus:outline-none"
              >
                Confirmer
              </button>
            </div>
          </div>

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
        </div>
          {/* Bouton S'inscrire */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
      </form>
    </div>
  );
};

export default ByNumberPhone;
