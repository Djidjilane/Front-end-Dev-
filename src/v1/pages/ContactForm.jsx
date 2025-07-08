import React from 'react';
import { FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 md:py-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
          Contactez-nous
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nous sommes disponibles pour répondre à vos questions, suggestions ou demandes de partenariat.
        </p>
      </div>

      {/* Carte d'adresse avec effet 3D */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10 transform hover:scale-[1.01] transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <FaMapMarkerAlt className="text-2xl text-blue-600" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800">Notre adresse</h3>
            <p className="text-gray-600">Bénin, Cotonou, Quartier Zogbo</p>
          </div>
        </div>
      </div>

      {/* Grille de contacts modernes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte Facebook */}
        <a 
          href="https://facebook.com/tonprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
        >
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
              <FaFacebook className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Facebook</h3>
            <p className="text-blue-600 text-sm">Messagez-nous</p>
          </div>
        </a>

        {/* Carte WhatsApp */}
        <a 
          href="https://wa.me/22990000000"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-200 transition-all duration-300 group"
        >
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
              <FaWhatsapp className="text-3xl text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">WhatsApp</h3>
            <p className="text-green-600 text-sm">+229 90 00 00 00</p>
          </div>
        </a>

        {/* Carte Email */}
        <a 
          href="mailto:contact@tonsite.com"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-red-200 transition-all duration-300 group"
        >
          <div className="flex flex-col items-center">
            <div className="bg-red-100 p-4 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
              <FaEnvelope className="text-3xl text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Email</h3>
            <p className="text-red-500 text-sm">contact@tonsite.com</p>
          </div>
        </a>
      </div>

      {/* Section supplémentaire pour le téléphone */}
      <div className="mt-10 bg-blue-50 p-6 rounded-xl border border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaPhoneAlt className="text-xl text-blue-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">Service client</h3>
            <p className="text-blue-600 font-medium">Disponible 24h/24</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;