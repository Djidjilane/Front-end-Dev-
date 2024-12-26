import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { deleteCountry } from '../../../../../api/context/api_service_countries';

const DeleteCountryModal = ({ isOpen, closeModal, country, loadFetchCountries }) => {
  const [isDeleting, setIsDeleting] = useState(false);

 
  const handleDelete = async () => {
    setIsDeleting(true);
    console.log("ID du pays à supprimer:", country.id);

    try {
      // Appel API pour supprimer le pays
      const response = await deleteCountry(country.id);

      // Récupération du message de succès depuis l'API ou message par défaut
      const successMessage = response?.message || 'Le pays a été supprimé avec succès !';

      // Recharger les pays après suppression
      await loadFetchCountries();

      // Fermer la modal
      closeModal();

      // Afficher une alerte de succès
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: successMessage,
        confirmButtonColor: '#15803D',
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du pays :", error);

      // Récupération du message d'erreur depuis l'API ou message générique
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la suppression du pays.';

      // Afficher une alerte d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !country) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Supprimer le pays</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <p className="mb-6">
          Êtes-vous sûr de vouloir supprimer le pays <strong>{country.name}</strong> ?
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-400 text-white py-2 px-4 rounded-md mr-2"
            disabled={isDeleting}
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`bg-red-600 text-white py-2 px-4 rounded-md ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isDeleting}
          >
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCountryModal;
