import React from 'react';
import { FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg text-gray-800">
      <h2 className="text-3xl font-bold mb-4 text-center">Contactez-nous</h2>
      
      <p className="text-lg text-center mb-6">
        Vous pouvez nous contacter pour toutes vos suggestions, questions ou remarques. 
        Nous sommes à votre écoute !
      </p>

      <div className="flex items-center justify-center mb-6 space-x-4 text-blue-600">
        <FaMapMarkerAlt className="text-xl" />
        <span className="text-base">Bénin, Cotonou, Quartier Zogbo</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <a 
          href="https://facebook.com/tonprofil"
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center text-blue-600 hover:underline"
        >
          <FaFacebook className="text-3xl mb-2" />
          Facebook
        </a>

        <a 
          href="https://wa.me/22990000000"
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center text-green-600 hover:underline"
        >
          <FaWhatsapp className="text-3xl mb-2" />
          WhatsApp
        </a>

        <a 
          href="mailto:contact@tonsite.com"
          className="flex flex-col items-center text-red-500 hover:underline"
        >
          <FaEnvelope className="text-3xl mb-2" />
          contact@tonsite.com
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
