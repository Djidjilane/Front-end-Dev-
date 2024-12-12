import React, { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import SidebarMenu from "../components/sub-components/SidebarMenu";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Barre de recherche
  const [activeMenu, setActiveMenu] = useState(null); // Menu actif
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu hamburger (mobile)

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen); // Ouvrir/Fermer la recherche
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Ouvrir/Fermer le menu mobile
  const handleMenuClick = (menu) => setActiveMenu(menu); // Gérer le menu actif

  // Fermer le menu au clic à l'extérieur
  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".navbar-menu") && !e.target.closest(".navbar-button")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <header className="bg-gray-800 py-3">
      <div className="container mx-auto max-w-6xl flex items-center justify-between px-4">
        {/* Logo et Hamburger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none navbar-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <a href="/" className="text-white space-x-2 font-bold text-xl">
            <span>KOS</span><span className="text-[#15803D]">Gaming</span>
          </a>
        </div>

        {/* Barre de recherche et Liens */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Recherche */}
          <div className="relative">
            <button className="text-white focus:outline-none" onClick={toggleSearch}>
              <Search className="w-6 h-6" />
            </button>
            {isSearchOpen && (
              <div className="absolute top-12 left-0 bg-white w-full z-50 p-2 flex items-center">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D]"
                />
                <button className="ml-2 bg-[#15803D] text-white p-2 rounded-md hover:bg-green-600">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Liens */}
          <nav className="flex items-center space-x-4">
            <a href="/auth/login" className="bg-[#15803D] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-green-600">
              SE CONNECTER
            </a>
            {/* <a
              href="/auth/option-auth"
              className="bg-[#15803D] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-green-600"
            >
              S'INSCRIRE
            </a> */}
            <a
              href="/account"
              className="text-white font-semibold text-sm flex items-center space-x-2 hover:text-gray-300"
            >
              <User className="w-6 h-6" />
              <span>COMPTE</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Menu Mobile */}
      <SidebarMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        activeMenu={activeMenu}
        handleMenuClick={handleMenuClick}
      />
    </header>
  );
};

export default Navbar;
