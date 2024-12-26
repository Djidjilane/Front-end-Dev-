import React from 'react';
import Swal from 'sweetalert2';
import { deleteCity } from '../../../../../api/context/api_service_cities';
const DeleteTownModal = ({ isModalOpen, closeModal, town, handleDeleteTown }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteCity(town.id);
      if (response.success) {
        handleDeleteTown(town.id); 
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: response.message || 'La ville a été supprimée avec succès.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error(response.message || 'Échec de la suppression.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message || 'Impossible de supprimer la ville.',
      });
    } finally {
      closeModal();
    }
  };
  

  if (!isModalOpen || !town) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Supprimer la ville</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mb-4">
          <p>
            Êtes-vous sûr de vouloir supprimer la ville <strong>{town.name}</strong> ? Cette action
            est irréversible.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-md mr-2"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            className="bg-gradient-to-r from-red-600 to-red-500 text-white py-2 px-4 rounded-md"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTownModal;
