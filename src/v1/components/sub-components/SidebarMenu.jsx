import React, { useState, useEffect } from "react";
import {Plane, Grid, Dice5, Gamepad2, Rocket, Award } from "lucide-react";

const SidebarMenu = ({ isOpen, toggleMenu, activeMenu, handleMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const games = [
    // { id: "welcome", name: "Accueil", icon: <Home className="w-5 h-5" /> },
    { id: "aviator", name: "Jeu Aviator", icon: <Plane className="w-5 h-5" /> },
    { id: "memory-game", name: "Jeu de Mémoire", icon: <Grid className="w-5 h-5" /> },
    { id: "dice-game", name: "Jeu de Dés", icon: <Dice5 className="w-5 h-5" /> },
    { id: "arcade", name: "Jeux d'Arcade", icon: <Gamepad2 className="w-5 h-5" /> },
    { id: "space-adventure", name: "Aventure Spatiale", icon: <Rocket className="w-5 h-5" /> },
    { id: "chess", name: "Échecs en Ligne", icon: <Award className="w-5 h-5" /> },
    
  ];

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Empêcher le défilement du body lorsque le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Nettoyage : réinitialiser lorsque le modal est fermé
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Fond semi-transparent */}
      {isOpen && (
        <div
          onClick={toggleMenu} // Ferme le menu en cliquant sur l'arrière-plan
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}

      <div
        className={`fixed lg:absolute lg:top-0 top-0 lg:left-0 left:0 lg:w-1/5 w-full h-[100vh] bg-white text-black z-50 navbar-menu scrollbar-thin scrollbar-thumb-[#15803D] scrollbar-track-[#f1f1f1] p-4 overflow-y-auto border border-gray-300 rounded-md ${isOpen ? "block" : "hidden"}`}
      >
        <div className="h-full">
          {/* Barre de recherche avec bouton de fermeture */}
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Rechercher un jeu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md  focus:outline-none"
            />
            <button onClick={toggleMenu} className="ml-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Liste des jeux */}
          <nav className="flex flex-col space-y-4 h-[90vh]">
          <a href="/" className="bg-[#15803D] lg:hidden block text-white w-fit text-sm font-semibold px-4 py-2 rounded-md hover:bg-green-600">
             Accueil
            </a>
            <a href="/auth/login" className="bg-[#15803D] lg:hidden block text-white w-fit text-sm font-semibold px-4 py-2 rounded-md hover:bg-green-600">
              SE CONNECTER
            </a>
            <a href="/games/games-page" className=" text-white bg-[#15803D] lg:hidden block w-fit text-sm font-semibold px-4 py-2 rounded-md ">
              GAMES
            </a>
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <a
                  key={game.id}
                  href={`/${game.id}`}
                  className={`flex items-center rounded-md bg-white hover:bg-gray-100 p-3 space-x-2 ${activeMenu === game.id ? "text-[#15803D]" : "text-black/60"}`}
                  onClick={() => handleMenuClick(game.id)}
                >
                  {game.icon && game.icon}
                  <span>{game.name}</span>
                </a>
              ))
            ) : (
              <p className="text-red-400">Aucun jeu trouvé.</p>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
