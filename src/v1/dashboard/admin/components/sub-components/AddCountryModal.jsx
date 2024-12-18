// src/components/countries/sub-components/AddCountryModal.jsx

import React, { useState } from 'react';

const AddCountryModal = ({ isModalOpen, closeModal, handleAddCountry }) => {
  const [newCountry, setNewCountry] = useState({
    name: '',
    region: '',
    flag: '',
    currency: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCountry({ ...newCountry, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newCountry.name.trim() === '' ||
      newCountry.region.trim() === '' ||
      newCountry.flag.trim() === '' ||
      newCountry.currency.trim() === ''
    ) return;

    handleAddCountry(newCountry);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        {/* Header de la modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Ajouter un nouveau pays</h2>
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
              value={newCountry.name}
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
              value={newCountry.region}
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
              value={newCountry.flag}
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
              value={newCountry.currency}
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
              className="bg-red-400 hover:bg-red-300 text-white py-2 px-4 rounded-md mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#15803D] to-[#7bcd99]  text-white py-2 px-4 rounded-md"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCountryModal;
