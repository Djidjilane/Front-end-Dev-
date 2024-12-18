// src/components/countries/sub-components/EditCountryModal.jsx

import React, { useState, useEffect } from 'react';

const EditCountryModal = ({ isModalOpen, closeModal, countryToEdit, handleEditCountry }) => {
  const [editedCountry, setEditedCountry] = useState(countryToEdit || {
    name: '',
    region: '',
    flag: '',
    currency: ''
  });

  useEffect(() => {
    if (countryToEdit) {
      setEditedCountry(countryToEdit);
    }
  }, [countryToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCountry({ ...editedCountry, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      editedCountry.name.trim() === '' ||
      editedCountry.region.trim() === '' ||
      editedCountry.flag.trim() === '' ||
      editedCountry.currency.trim() === ''
    ) return;

    handleEditCountry(editedCountry);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        {/* Header de la modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Éditer le pays</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Champs de saisie pour les informations du pays */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom du pays</label>
            <input
              type="text"
              name="name"
              value={editedCountry.name}
              onChange={handleInputChange}
              placeholder="Nom du pays"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Région</label>
            <input
              type="text"
              name="region"
              value={editedCountry.region}
              onChange={handleInputChange}
              placeholder="Région"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Flag Emoji</label>
            <input
              type="text"
              name="flag"
              value={editedCountry.flag}
              onChange={handleInputChange}
              placeholder="Emoji du drapeau"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Devise</label>
            <input
              type="text"
              name="currency"
              value={editedCountry.currency}
              onChange={handleInputChange}
              placeholder="Devise"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Boutons d'action */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-300 hover:bg-re-400 text-white py-2 px-4 rounded-md mr-2"
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

export default EditCountryModal;
