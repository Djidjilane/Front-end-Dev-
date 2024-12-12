import React, { useState } from "react";
import OneClick from "./OneClick";
import ByNumberPhone from "./ByNumberPhone";
import BySocialNetwork from "./BySocialNetwork";
import ByEmail from "./ByEmail";
import { Phone, Mail, Users, MousePointer } from 'lucide-react';


const OptionAuth = () => {
  const [activeTab, setActiveTab] = useState("oneClick");



  // Définir le contenu dynamique en fonction de l'onglet sélectionné
  const renderTabContent = () => {
    if (activeTab === "oneClick") {
      return (
        <OneClick />
      );
    } else if (activeTab === "phone") {
      return (
        <ByNumberPhone />
      );
    } else if (activeTab === "email") {
      return (
        <ByEmail />
      );


    } else if (activeTab === "social") {
      return (
        <BySocialNetwork />
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl lg:p-6 p-2">
        {/* Titre */}
        <h2 className="text-xl font-semibold text-center text-[#15803D] mb-6">INSCRIPTION</h2>

        {/* ordinateur  d'inscription */}
        <div className="flex md:flex-row mb-6 space-y-2 md:space-y-0 bg-white">
          <button
            onClick={() => setActiveTab("oneClick")}
            className={`hidden md:flex items-center justify-center space-x-4 flex-1 py-2 text-sm font-bold rounded-sm ${activeTab === "oneClick" ? "bg-[#15803D] text-white" : "bg-gray-100 text-[#15803D]"}`}
          >
            <MousePointer size={20} className={activeTab === "oneClick" ? "text-white" : "text-[#15803D]"} />
            <span>En un clic</span>
          </button>

          <button
            onClick={() => setActiveTab("phone")}
            className={`hidden md:flex items-center justify-center space-x-2 flex-1 py-2 text-sm font-bold rounded-sm ${activeTab === "phone" ? "bg-[#15803D] text-white" : "bg-gray-100 text-[#15803D]"}`}
          >
            <Phone size={20} className={activeTab === "phone" ? "text-white" : "text-[#15803D]"} />
            <span>Par téléphone</span>
          </button>

          <button
            onClick={() => setActiveTab("email")}
            className={`hidden md:flex items-center justify-center space-x-2 flex-1 py-2 text-sm font-bold rounded-sm ${activeTab === "email" ? "bg-[#15803D] text-white" : "bg-gray-100 text-[#15803D]"}`}
          >
            <Mail size={20} className={activeTab === "email" ? "text-white" : "text-[#15803D]"} />
            <span>Par e-mail</span>
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={`hidden md:flex items-center justify-center space-x-2 flex-1 py-2 text-sm font-bold rounded-sm ${activeTab === "social" ? "bg-[#15803D] text-white" : "bg-gray-100 text-[#15803D]"}`}
          >
            <Users size={20} className={activeTab === "social" ? "text-white" : "text-[#15803D]"} />
            <span>Réseaux sociaux</span>
          </button>
        </div>


        {/* Mobile d'inscription */}
        <div className="flex md:hidden mb-6 bg-white">
          <button
            onClick={() => setActiveTab("oneClick")}
            className={`flex items-center justify-center space-x-4 w-full py-2 h-10 text-sm font-bold rounded-sm ${activeTab === "oneClick" ? "bg-[#15803D] text-white" : "bg-gray-100 text-[#15803D]"}`}
          >
            <MousePointer size={20} className={activeTab === "oneClick" ? "text-white" : "text-[#15803D]"} />
            <span className="flex items-center">En un clic</span>
          </button>

          <button
            onClick={() => setActiveTab("phone")}
            className={`flex items-center justify-center space-x-2 w-full py-2 h-10 text-sm font-bold rounded-sm ${activeTab === "phone" ? "bg-[#15803D] text-white" : "bg-gray-100 text-[#15803D]"}`}
          >
            <Phone size={20} className={activeTab === "phone" ? "text-white" : "text-[#15803D]"} />
            <span className="flex items-center">Par téléphone</span>
          </button>
        </div>

        {/* Affichage dynamique du contenu de l'onglet sélectionné */}
        {renderTabContent()}

        {/* Notes */}
        <div className="mt-4 text-sm text-center text-gray-600">
          Ce site est protégé par reCAPTCHA ;{' '}
          <a href="#" className="text-[#15803D] underline">la Politique de confidentialité</a>{' '}
          et{' '}
          <a href="#" className="text-[#15803D] underline">les Modalités d'utilisation</a> s'appliquent.
        </div>
        <div className="mt-2 text-sm text-center text-gray-600">
          En cliquant sur ce bouton, vous confirmez que vous avez lu et accepté les{' '}
          <a href="#" className="text-[#15803D] underline">Termes et Conditions</a>{' '}
          et la{' '}
          <a href="#" className="text-[#15803D] underline">Politique de Confidentialité</a> de la société et que vous avez atteint l'âge légal.
        </div>
      </div>
    </div>
  );
};
export default OptionAuth;
