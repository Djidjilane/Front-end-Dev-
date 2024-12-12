import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mx-auto max-w-6xl items-center space-y-4 sm:flex-row sm:justify-between sm:items-center">
          {/* Copyright */}
          <p className="text-center sm:text-left">
            © 2024 <a href="/" className="text-white space-x-2 font-bold text-xl">
              <span>KOS</span><span className="text-[#15803D]">Gaming</span>
            </a> .Tous droits réservés.
          </p>

          {/* Footer Links */}
          <div className="flex space-x-6 text-sm">
            <a
              href="/privacy-policy"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Politique de confidentialité
            </a>
            <a
              href="/terms"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
