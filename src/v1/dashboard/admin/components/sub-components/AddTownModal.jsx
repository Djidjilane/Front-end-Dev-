// src/components/countries/sub-components/AddTownModal.jsx

import React, { useState } from 'react';

const AddTownModal = ({ isModalOpen, closeModal, countryId, handleAddTown }) => {
  const [newTownName, setNewTownName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTownName.trim() === '') return;

    const newTown = {
      id: Date.now(), // Génère un ID unique
      name: newTownName.trim(),
    };

    handleAddTown(countryId, newTown);
    setNewTownName('');
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Ajouter une nouvelle ville</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom de la ville</label>
            <input
              type="text"
              value={newTownName}
              onChange={(e) => setNewTownName(e.target.value)}
              placeholder="Nom de la ville"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-300 hover:bg-red-400 text-gray-700 py-2 px-4 rounded-md mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white py-2 px-4 rounded-md"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTownModal;
