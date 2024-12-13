import React from 'react';

const Pagination = ({ gamesPerPage, totalGames, paginate, currentPage }) => {
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-6 flex justify-center space-x-4">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-[#15803D] text-white' : 'bg-gray-200 text-black'} hover:bg-[#15803D] hover:text-white`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
