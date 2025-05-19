
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BuildingOfficeIcon, UserGroupIcon, ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">BTPConnect</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="#"  className="text-blue-600 font-medium">Accueil</Link>
          <Link to="#"  className="text-gray-600 hover:text-blue-600 transition">Recrutement</Link>
          <Link to="#"  className="text-gray-600 hover:text-blue-600 transition">Matériaux</Link>
          <Link to="#"  className="text-gray-600 hover:text-blue-600 transition">Entreprises</Link>
          <Link to="#"  className="text-gray-600 hover:text-blue-600 transition">Contact</Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">

          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Connexion
          </Link>

        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="#"  className="text-blue-600 font-medium">Accueil</Link>
            <Link to="#"  className="text-gray-600">Recrutement</Link>
            <Link to="#"  className="text-gray-600">Matériaux</Link>
            <Link to="#"  className="text-gray-600">Entreprises</Link>
            <Link to="#"  className="text-gray-600">Contact</Link>
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
              <button className="px-3 w-fit  py-2 text-gray-600 border border-gray-200 rounded-md">Connexion</button>
              <button className="w-fit py-2 bg-blue-600 text-white rounded-md">
                Se connecter
              </button>
            </div>
          </div>
        </div>
      )}
   </header>
  );
};

export default Navbar;
