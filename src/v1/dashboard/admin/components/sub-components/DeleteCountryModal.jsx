// src/components/countries/sub-components/DeleteCountryModal.jsx

import React from 'react';

const DeleteCountryModal = ({ isOpen, closeModal, handleDelete, countryName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        {/* Contenu de la modal */}
        <h2 className="text-xl font-semibold mb-4">Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer le pays <strong>{countryName}</strong> ?</p>
        <div className="flex justify-end mt-6">
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md mr-2"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCountryModal;
