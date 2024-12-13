import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="bg-white rounded-lg h-72  shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 active:scale-95">
      <img
        src={game.image}
        alt={game.title}
        className="w-full lg:h-24 h-24 object-cover"
      />
      <div className="p-2">
        <h3 className="text-xl font-semibold text-gray-800">{game.title}</h3>
        <p className="text-gray-600 text-sm mt-2">{game.description}</p>
        <div className="flex justify-end py-16 lg:py-11">
          <a
            href={game.link}
            className="mt-4 inline-block w-fit text-white py-1 px-2 rounded-md text-center bg-gradient-to-r from-[#15803D] to-green-600 hover:scale-105 transform transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 active:scale-95"
          >
            Jouer
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
