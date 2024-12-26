import React, { useState, useEffect } from "react";
import { User, Home, Gamepad2, UserCheck } from "lucide-react";
import SidebarMenu from "../components/sub-components/SidebarMenu";
import { Link } from 'react-router-dom';
const Navbar = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Etat pour la requête de recherche
  const [suggestions, setSuggestions] = useState([]); // Etat pour les suggestions

  // Liste des suggestions (peut provenir d'une API ou d'un tableau statique)
  const allSuggestions = [
    "Football",
    "Basketball",
    "Tennis",
    "Paris sportifs",
    "Résultats de matchs",
    "Cotes en direct",
    "Mises à jour sportives",
    "Matchs à venir"
  ];

  // const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuClick = (menu) => setActiveMenu(menu);


  // Filtrer les suggestions en fonction de la recherche
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };


  // Fonction pour gérer le clic sur une suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Remplir le champ de recherche avec la suggestion
    setSuggestions([]); // Fermer la liste des suggestions
    // Ici, vous pouvez aussi lancer la recherche automatiquement (par exemple, en filtrant les résultats)
    console.log("Recherche lancée pour:", suggestion); // Vous pouvez remplacer cette ligne par la logique de recherche réelle
  };

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
          <a href="/" className="text-white font-bold text-xl">
            <span>bet</span><span className="text-[#15803D]">kos</span>
          </a>
        </div>

        {/* Barre de recherche */}
        <div className="flex justify-center items-center z-50">
          <div className="bg-white rounded-md shadow-lg w-full lg:block hidden max-w-full p-1">
            <div className="relative flex items-center">
              <div className="absolute left-3 top-2.5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-600">
                  <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                  <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Faites vôtre recherche..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                className="rounded-md ml-2 bg-[#15803D] p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-slate-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Suggestions */}
            {searchQuery && suggestions.length > 0 && (
              <ul className="absolute left+56 w-56 top-14 mt-2 bg-white border border-slate-200 rounded-md shadow-md">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)} // Ajout du gestionnaire de clic
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Liens */}
         <div className="flex items-center space-x-6 relative lg:block hidden">
          <nav className="flex items-center space-x-4 ">
            <a href="/games/games-page" className="text-[#15803D] bg-white text-sm font-semibold px-4 py-2 rounded-md">
              GAMES
            </a>
            <a href="/auth/login" className="bg-[#15803D] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-green-600">
              SE CONNECTER
            </a>
            <a
              href="/dashboard/admin/home"
              className="text-white font-semibold text-sm flex items-center space-x-2 hover:text-gray-300"
            >
              <User className="w-6 h-6" />
              <span>COMPTE</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 inset-x-0 z-30 py-3 bg-gray-800 border-t border-gray-200 flex justify-around lg:hidden">
        <Link to="/" className="inline-flex flex-col items-center space-y-1 text-white">
          <span className="text-lg"><Home /></span>
          <span className="text-sm">Accueil</span>
        </Link>
        <Link to="/games/games-page" className="inline-flex flex-col items-center space-y-1 text-white">
          <span className="text-lg"><Gamepad2 /></span>
          <span className="text-sm">Games</span>
        </Link>
        <div className="text-center text-white">
          {/** Vérifiez si l'utilisateur est authentifié **/}
          {localStorage.getItem('authToken') ? (
            <Link to="/profile" className="inline-flex flex-col items-center space-y-1">
              <span className=" text-lg"><User /></span>
              <span className="text-sm">Mon Compte</span>
            </Link>
          ) : (
            <Link to="/auth/login" className="inline-flex flex-col items-center space-y-1">
              <span className=" text-xl"> <UserCheck /></span>
              <span className="text-sm">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* {localStorage.getItem('authToken') ? (
            <Link to="/profile" className="inline-flex flex-col items-center space-y-1">
              <span className="block text-lg">👤</span>
              <span className="text-xs">Mon Compte</span>
            </Link>
          ) : (
            <Link to="/login" className="inline-flex flex-col items-center space-y-1">
              <span className="block text-lg">🔓</span>
              <span className="text-xs">Login</span>
            </Link>
          )} */}


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
