import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { deleteCurrency } from '../../../../../api/context/api_service_currencies';

const DeleteCurrencyModal = ({ isOpen, closeModal, currency, loadfetchCurrencies }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // Appel API pour supprimer la devise
      const response = await deleteCurrency(currency.id);

      // Récupération du message de succès depuis l'API ou message par défaut
      const successMessage = response?.message || 'La devise a été supprimée avec succès !';

      // Recharger les devises après suppression
      await loadfetchCurrencies();

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
      console.error("Erreur lors de la suppression de la devise :", error);

      // Récupération du message d'erreur depuis l'API ou message générique
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la suppression de la devise.';

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

  if (!isOpen || !currency) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Supprimer la devise</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <p className="mb-6">
          Êtes-vous sûr de vouloir supprimer la devise <strong>{currency.name}</strong> ?
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
            className={`bg-red-600 text-white py-2 px-4 rounded-md ${
              isDeleting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isDeleting}
          >
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCurrencyModal;
