import React, { useState } from 'react';
import { createCity } from '../../../../../api/context/api_service_cities';
import Swal from 'sweetalert2';

const AddTownModal = ({ isModalOpen, closeModal, countryId, onTownAdded }) => {
  const [newTownName, setNewTownName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newTownName.trim() === '') return;

    setIsLoading(true);
    setError(null);

    try {
      // Appel de la fonction createCity pour ajouter la ville
      const newTown = await createCity({
        name: newTownName.trim(),
        country_id: countryId, // Envoi de l'ID du pays dans les données
      });

      // Réinitialisation du champ et fermeture de la modal
      setNewTownName('');
      closeModal();

      // Afficher une alerte de succès
      Swal.fire({
        icon: 'success',
        title: 'Ville ajoutée',
        text: `La ville ${newTownName.trim()} a été ajoutée avec succès !`,
        customClass: {
          confirmButton: 'bg-green-500 hover:bg-green-600',
          icon: 'text-green-600',
        },
      });

      // Informer le parent de la nouvelle ville ajoutée
      if (onTownAdded) {
        onTownAdded(newTown);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’ajout de la ville.');
    } finally {
      setIsLoading(false);
    }
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
              disabled={isLoading}
            >
              {isLoading ? 'Ajout...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTownModal;
