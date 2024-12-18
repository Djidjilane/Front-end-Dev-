// src/components/countries/sub-components/ShowTown.jsx

import React, { useState } from 'react';
import { FaTrashAlt, FaEdit, FaTimes } from 'react-icons/fa';
import EditTownModal from './EditTownModal';

const ShowTown = ({
  countryId,
  towns,
  handleEditTown,
  handleDeleteTown,
  closeModal
}) => {
  const [isEditTownModalOpen, setIsEditTownModalOpen] = useState(false);
  const [townToEdit, setTownToEdit] = useState(null);

  const openEditTownModal = (town) => {
    setTownToEdit(town);
    setIsEditTownModalOpen(true);
  };

  const closeEditTownModal = () => {
    setIsEditTownModalOpen(false);
    setTownToEdit(null);
  };

  const handleEditSubmit = (updatedTown) => {
    handleEditTown(countryId, updatedTown.id, updatedTown.name);
    closeEditTownModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl">
        {/* Header de la modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Liste des villes</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Vérifier si la liste des villes est vide */}
        {towns.length === 0 ? (
          <div className="text-center text-red-500">
            Aucune ville ajouter pour le moment !
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Nom de la ville</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {towns.map(town => (
                <tr key={town.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-700">{town.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{town.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => openEditTownModal(town)}
                      className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white mr-2 p-2 rounded-md"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTown(countryId, town.id)}
                      className="bg-red-500 text-white mr-2 p-2 rounded-md"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal pour éditer une ville */}
        {isEditTownModalOpen && (
          <EditTownModal
            isModalOpen={isEditTownModalOpen}
            closeModal={closeEditTownModal}
            town={townToEdit}
            handleEditTown={handleEditSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ShowTown;
