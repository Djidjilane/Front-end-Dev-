import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell,LogOut,UserPen } from 'lucide-react';

const Navbar = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  const logout = () => {
    // Logique de déconnexion ici
    console.log('Déconnexion');
  };

  return (
    <header className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] shadow-md py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Barre de recherche */}
        <div className="hidden lg:flex items-center relative w-2/3">
          <input
            type="text"
            placeholder="Rechercher dans le dashboard..."
            className="w-full px-4 py-2 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search size={20} className="text-gray-400" />
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-full bg-white text-[#15803D] hover:bg-[#7bcd99] transition duration-200">
            <Bell size={22} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span> {/* Notification badge */}
          </button>
        </div>

        {/* Menu de Profil */}
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="p-2 rounded-full bg-white hover:bg-[#7bcd99] transition duration-200"
          >
            <img
              className="w-10 h-10 rounded-full border-2 border-white"
              src={`https://ui-avatars.com/api/?name=YourName`}
              alt="Profile"
            />
          </button>
          {profileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-200">
                <span className="block font-semibold text-sm text-[#0A2463]">Sègnélogni</span>
                <span className="block text-sm text-gray-600">kadindje@gmail.com</span>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3  px-4 py-2 text-[#0A2463] hover:bg-gray-100 rounded-lg transition duration-200"
                  >
                  <UserPen/> Mon Profil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg transition duration-200"
                  >
                    <LogOut/> Se déconnecter
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
