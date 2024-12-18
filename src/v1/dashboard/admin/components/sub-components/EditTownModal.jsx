// src/components/countries/sub-components/EditTownModal.jsx

import React, { useState, useEffect } from 'react';

const EditTownModal = ({ isModalOpen, closeModal, town, handleEditTown }) => {
  const [editedTown, setEditedTown] = useState(town || { name: '' });

  useEffect(() => {
    if (town) {
      setEditedTown(town);
    }
  }, [town]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTown({ ...editedTown, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedTown.name.trim() === '') return;
    handleEditTown(editedTown);
    closeModal();
  };

  if (!isModalOpen || !town) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        {/* Header de la modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Éditer la ville</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Champ de saisie pour le nom de la ville */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom de la ville</label>
            <input
              type="text"
              name="name"
              value={editedTown.name}
              onChange={handleInputChange}
              placeholder="Nom de la ville"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Boutons d'action */}
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
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTownModal;
