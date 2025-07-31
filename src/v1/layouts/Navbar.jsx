import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BuildingOfficeIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [offresOpen, setOffresOpen] = useState(false);
  const [mobileOffresOpen, setMobileOffresOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fermer le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOffresOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleOffresMenu = () => {
    setOffresOpen(!offresOpen);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setOffresOpen(false);
    setMobileOffresOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
          <Link to="/" className="text-xl font-bold text-gray-800">BTPConnect</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-blue-600 font-medium">Accueil</Link>

          {/* Menu Offres - Version Desktop améliorée */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center text-gray-600 hover:text-blue-600 transition font-medium"
              onClick={toggleOffresMenu}
              onMouseEnter={() => setOffresOpen(true)}
            >
              Offres 
              <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${offresOpen ? 'rotate-180' : ''}`} />
            </button>

            {offresOpen && (
              <div 
                className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                onMouseLeave={() => setOffresOpen(false)}
              >
                <Link
                  to="/offre/emploi"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={closeAllMenus}
                >
                  Offres d'emploi
                </Link>
                <Link
                  to="/offre/stage"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  onClick={closeAllMenus}
                >
                  Offres de stage
                </Link>
              </div>
            )}
          </div>

          <Link to="/entreprise" className="text-gray-600 hover:text-blue-600 transition">Entreprises</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</Link>

          {localStorage.getItem('token') ? (
            <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
              Déconnexion
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
            >
              Connexion
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-blue-600 font-medium" onClick={closeAllMenus}>Accueil</Link>

            {/* Menu Offres - Version Mobile */}
            <div className="border-b pb-2">
              <button
                onClick={() => setMobileOffresOpen(!mobileOffresOpen)}
                className="flex items-center justify-between w-full text-gray-600 font-medium"
              >
                Offres
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${mobileOffresOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileOffresOpen && (
                <div className="mt-2 ml-4 flex flex-col space-y-3">
                  <Link 
                    to="/offre/emploi"
                    className="text-gray-600 hover:text-blue-600 pl-2 py-1 border-l-2 border-blue-200"
                    onClick={closeAllMenus}
                  >
                    Offres d'emploi
                  </Link>
                  <Link 
                    to="/offre/stage"
                    className="text-gray-600 hover:text-blue-600 pl-2 py-1 border-l-2 border-blue-200"
                    onClick={closeAllMenus}
                  >
                    Offres de stage
                  </Link>
                </div>
              )}
            </div>

            <Link to="/materiaux" className="text-gray-600" onClick={closeAllMenus}>Matériaux</Link>
            <Link to="/entreprise" className="text-gray-600" onClick={closeAllMenus}>Entreprises</Link>
            <Link to="/contact" className="text-gray-600" onClick={closeAllMenus}>Contact</Link>

            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
              {localStorage.getItem('token') ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    closeAllMenus();
                  }} 
                  className="w-full py-2 text-red-600 text-left"
                >
                  Déconnexion
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full py-2 bg-blue-600 text-white rounded-md text-center"
                  onClick={closeAllMenus}
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;