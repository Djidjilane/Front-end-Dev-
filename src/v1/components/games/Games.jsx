import React, { useState, useEffect } from 'react';
import { ListFilter } from 'lucide-react';
import GameCard from '../sub-components/GameCard';
import Pagination from '../sub-components/Pagination';

const Games = () => {
  const categories = ["Aventure", "Arcade", "Stratégie", "Éducation", "Puzzle", "Sports", "Combat", "Simulation"];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  useEffect(() => {
    // Simuler la récupération des jeux (remplacer par API réelle)
    const fetchedGames = [
      { id: 1, title: "Jeu de Stratégie 1", description: "Un jeu palpitant...", category: "Stratégie", image: "/images/game1.jpg", link: "#" },
      { id: 2, title: "Jeu de Casino", description: "Les cartes sont entre tes mains...", category: "Casino", image: "/images/game2.jpg", link: "#" },
      { id: 3, title: "Jeu de Réflexion", description: "Teste ton esprit....", category: "Réflexion", image: "/images/game3.jpg", link: "#" },
      { id: 4, title: "Jeu d'Aventure", description: "Pars à l'aventure....", category: "Aventure", image: "/images/game4.jpg", link: "#" },
      { id: 5, title: "Jeu de Puzzle", description: "Des puzzles captivants....", category: "Puzzle", image: "/images/game5.jpg", link: "#" },
      { id: 6, title: "Jeu de Sports", description: "Affronte d'autres joueurs....", category: "Sports", image: "/images/game6.jpg", link: "#" },
      { id: 7, title: "Jeu de Combat", description: "Prépare-toi à des batailles....", category: "Combat", image: "/images/game7.jpg", link: "#" },
      { id: 8, title: "Jeu de Simulation", description: "Simule ta vie....", category: "Simulation", image: "/images/game8.jpg", link: "#" },
      { id: 9, title: "Jeu de Construction", description: "Construise tes propres structures....", category: "Construction", image: "/images/game9.jpg", link: "#" },
      { id: 10, title: "Jeu de Déplacement", description: "Déplace-toi sur un plateau....", category: "Déplacement", image: "/images/game10.jpg", link: "#" },
      { id: 11, title: "Jeu de Réussite", description: "Obtenez des récompenses....", category: "Réussite", image: "/images/game6.jpg", link: "#" },
      { id: 12, title: "Jeu de Résolution", description: "Résolvez des problèmes....", category: "Résolution", image: "/images/game10.jpg", link: "#" },
    ];
    setGames(fetchedGames);
    setFilteredGames(fetchedGames);
  }, []);

  // Mettre à jour les jeux filtrés en fonction des catégories sélectionnées
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => selectedCategories.includes(game.category)));
    }
  }, [selectedCategories, games]);

  // Pagination : découper la liste des jeux en pages
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Changer la page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Gérer les cases à cocher
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
    );
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* Composant de filtrage fixe */}
          <div className="w-full sm:w-1/4 mb-8 sm:mb-0 shadow-md h-fit bg-white rounded-lg  p-4 sticky top-10">
            <div className="flex space-x-2">
              <ListFilter className="text-[#15803D]" />
              <h3 className="text-xl font-semibold text-[#15803D] mb-4">Filtrer par catégorie</h3>
            </div>
            <div className="space-y-2 bg-white rounded-lg p-4 ">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 border-2 border-gray-300 rounded text-[#15803D] focus:ring-[#15803D] accent-[#15803D]"
                  />
                  <label htmlFor={category} className="ml-2 text-sm text-gray-700">{category}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Liste des jeux (scrollable) */}
          <div className="w-full sm:w-3/4 z-10 lg:p-0 p-4" style={{ maxHeight: '130vh' }}>
            {/* Afficher "Aucun résultat" ou le nombre de résultats */}
            <div>
              <span className="flex text-sm  z-20 font-semibold bg-gradient-to-r from-[#15803D] to-[#7bcd99] p-3 sticky top-0 justify-end text-white rounded-sm mb-4">
                {filteredGames.length > 0 ? `Résultats trouvés : ${filteredGames.length}` : 'Aucun résultat de jeux pour cette catégorie'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>

              {/* Pagination */}
              {filteredGames.length > 0 && (
                <Pagination
                  gamesPerPage={gamesPerPage}
                  totalGames={filteredGames.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Games;