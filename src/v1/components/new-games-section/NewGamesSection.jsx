import React from 'react';

const NewGamesSection = () => {
  const newGames = [
    { title: 'Jeu X', description: 'Un jeu passionnant de stratégie.', link: '#' },
    { title: 'Jeu Y', description: 'Un jeu de réflexion avec de nouveaux défis.', link: '#' },
    { title: 'Jeu Z', description: 'Un jeu de hasard avec des récompenses exceptionnelles.', link: '#' },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[#15803D] mb-8">Nouveaux Jeux / À venir</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:p-0 p-4">
          {newGames.map((game, index) => (
            <div key={index} className="bg-white shadow-lg rounded-md p-6 hover:scale-105 transform transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 active:scale-95">
              <h3 className="text-xl font-bold text-[#15803D]">{game.title}</h3>
              <p className="text-gray-700 mt-4">{game.description}</p>
              <div className="flex justify-end">
              <a href={game.link} className="mt-6 text-[#15803D] underline">Découvrir</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewGamesSection;
