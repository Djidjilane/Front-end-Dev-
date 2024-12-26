import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createCurrency } from '../../../../../api/context/api_service_currencies';
const AddCurrencyModal = ({ isModalOpen, closeModal, loadfetchCurrencies }) => {
  const [newCurrency, setNewCurrency] = useState({ name: '', iso_code: '', symbol: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCurrency((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    if (newCurrency.name || newCurrency.iso_code || newCurrency.symbol) {
      Swal.fire({
        title: 'Annuler l\'ajout ?',
        text: 'Toutes les données non sauvegardées seront perdues.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, fermer',
        cancelButtonText: 'Non, continuer',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#15803D',
      }).then((result) => {
        if (result.isConfirmed) {
          closeModal();
          setNewCurrency({ name: '', iso_code: '', symbol: '' });
        }
      });
    } else {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!newCurrency.name.trim() || !newCurrency.iso_code.trim() || !newCurrency.symbol.trim()) {
      setSubmitError('Tous les champs sont obligatoires.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createCurrency(newCurrency);
      // Récupération du message depuis l'API
      const successMessage = response?.message || 'La devise a été ajoutée avec succès !';
      await loadfetchCurrencies();
      setNewCurrency({ name: '', iso_code: '', symbol: '' });
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: successMessage,
        confirmButtonColor: '#15803D',
      });
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de l\'ajout de la devise.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setSubmitError(errorMessage);
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
          <h2 className="text-xl font-semibold">Ajouter une nouvelle devise</h2>
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
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
              value={newCurrency.name}
              onChange={handleInputChange}
              placeholder="Nom de la devise (e.g., Dollar américain)"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Code ISO</label>
            <input
              type="text"
              name="iso_code"
              value={newCurrency.iso_code}
              onChange={handleInputChange}
              placeholder="Code ISO (e.g., USD)"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Symbole</label>
            <input
              type="text"
              name="symbol"
              value={newCurrency.symbol}
              onChange={handleInputChange}
              placeholder="Symbole (e.g., $)"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-red-400 hover:bg-red-300 text-white py-2 px-4 rounded-md mr-2"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white py-2 px-4 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCurrencyModal;
