import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">BTPConnect</span>
            </div>
            <p className="text-gray-400 mb-4">
              La plateforme premium pour les professionnels du BTP.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF className="h-6 w-6" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter className="h-6 w-6" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedinIn className="h-6 w-6" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Accueil</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">À propos</Link></li>
              <li><Link to="/offre/entreprise" className="text-gray-400 hover:text-white transition">Offres d'emploi</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Recrutement</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Publicité</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Marketplace</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Formations</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Analytics</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>Atlantique</p>
              <p>Abomey Calavi, Bénin</p>
              <p>Email: contact@btpconnect.com</p>
              <p>Tél: +229 01 40 00 15 50</p>
            </address>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2023 BTPConnect. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-400 hover:text-white transition">Mentions légales</Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">Politique de confidentialité</Link>
            <Link to="#" className="text-gray-400 hover:text-white transition">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
