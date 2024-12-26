import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { updateCity } from '../../../../../api/context/api_service_cities';
const EditTownModal = ({ isModalOpen, closeModal, town, handleEditTown }) => {
  const [editedTown, setEditedTown] = useState({ name: '' });

  useEffect(() => {
    if (town) {
      setEditedTown(town); // Met à jour l'état quand 'town' change
    }
  }, [town]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTown({ ...editedTown, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données à envoyer à l'API : ", editedTown);

    if (editedTown.name.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le nom de la ville ne peut pas être vide',
      });
      return;
    }

    try {
      console.log("Données envoyées à l'API:", { id: editedTown.id, name: editedTown.name });
      // const updatedTown = await updateCity(editedTown); 
      const updatedTown = await updateCity(editedTown.id, { name: editedTown.name });

      if (updatedTown) {
        handleEditTown(updatedTown); // Met à jour la liste des villes
        closeModal();
        // Affichage du message de succès depuis la réponse de l'API
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: updatedTown.message || 'La ville a été mise à jour avec succès.',
          customClass: {
            confirmButton: 'bg-green-500 hover:bg-green-600',
            icon: 'text-green-600',
          },
        });
      } else {
        throw new Error('La mise à jour a échoué.');
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la ville : ", error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour de la ville.',
      });
    }
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
              className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-md mr-2"
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
