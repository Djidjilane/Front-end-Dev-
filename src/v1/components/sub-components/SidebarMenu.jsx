import React, { useState } from "react";
import { Home, Plane, Grid, Dice5, Gamepad2, Rocket, Award } from "lucide-react";

const SidebarMenu = ({ isOpen, toggleMenu, activeMenu, handleMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const games = [
    { id: "welcome", name: "Accueil", icon: <Home className="w-5 h-5" /> },
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

  return (
    <div
      className={`fixed lg:absolute  top-16 left-36 lg:w-1/5 w-full h-[70vh] bg-white text-black z-50 navbar-menu scrollbar-thin scrollbar-thumb-[#15803D] scrollbar-track-[#f1f1f1] p-4 overflow-y-auto border border-gray-300 rounded-md ${isOpen ? "block" : "hidden"
        }`}
    >
      <div className="h-full">
        {/* Barre de recherche avec bouton de fermeture */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#15803D] focus:outline-none"
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
        <nav className="flex flex-col space-y-4">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <a
                key={game.id}
                href={`/${game.id}`}
                className={`flex items-center space-x-2 ${activeMenu === game.id ? "text-[#15803D]" : "text-black/60"
                  }`}
                onClick={() => handleMenuClick(game.id)}
              >
                {game.icon && game.icon}
                <span>{game.name}</span>
              </a>
            ))
          ) : (
            <p className="text-gray-500">Aucun jeu trouvé.</p>
          )}
        </nav>
      </div>
    </div>
  );
};

export default SidebarMenu;
