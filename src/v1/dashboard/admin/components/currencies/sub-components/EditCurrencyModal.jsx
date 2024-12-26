import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { updateCurrency } from '../../../../../api/context/api_service_currencies';

const EditCurrencyModal = ({ isModalOpen, closeModal, currencyToEdit, loadfetchCurrencies }) => {
  const [editedCurrency, setEditedCurrency] = useState({
    name: '',
    iso_code: '',
    symbol: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (currencyToEdit) {
      setEditedCurrency({
        name: currencyToEdit.name || '',
        iso_code: currencyToEdit.iso_code || '',
        symbol: currencyToEdit.symbol || '',
      });
    }
  }, [currencyToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCurrency((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    console.log("Identifiant transmis :", currencyToEdit.id);
    console.log("Données envoyées :", editedCurrency);

    try {
      // Appel API pour mettre à jour la devise
      const response = await updateCurrency(currencyToEdit.id, editedCurrency);

      // Récupération du message de succès depuis l'API ou utilisation d'un message par défaut
      const successMessage = response?.message || 'La devise a été modifiée avec succès !';

      // Recharger les devises
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
      console.error("Erreur lors de la mise à jour :", error);

      // Récupération du message d'erreur depuis l'API ou utilisation d'un message par défaut
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour de la devise.';

      setSubmitError(errorMessage);

      // Afficher une alerte d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modifier la devise</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {submitError && <div className="mb-4 text-red-500">{submitError}</div>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              value={editedCurrency.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Code ISO</label>
            <input
              type="text"
              name="iso_code"
              value={editedCurrency.iso_code}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Symbole</label>
            <input
              type="text"
              name="symbol"
              value={editedCurrency.symbol}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-400 text-white py-2 px-4 rounded-md mr-2"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`bg-green-600 text-white py-2 px-4 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Modification en cours...' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCurrencyModal;
