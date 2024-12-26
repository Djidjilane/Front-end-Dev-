import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { createCountry } from '../../../../../api/context/api_service_countries'; 
import { getCurrencies } from '../../../../../api/context/api_service_currencies'; 

const AddCountryModal = ({ isModalOpen, closeModal, loadFetchCountries }) => {
  const [newCountry, setNewCountry] = useState({ name: '', iso_code: '', flag: '', currency_id: '' });
  const [currencies, setCurrencies] = useState([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Charger les devises disponibles
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await getCurrencies(); // API pour récupérer les devises
        setCurrencies(response);
        setLoadingCurrencies(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des devises:', error);
        setLoadingCurrencies(false);
      }
    };

    fetchCurrencies();
  }, []);

  // Gestion des champs d'entrée
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCountry((prev) => ({ ...prev, [name]: value }));
  };

  // Validation et soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!newCountry.name.trim() || !newCountry.iso_code.trim() || !newCountry.flag.trim() || !newCountry.currency_id.trim()) {
      setSubmitError('Tous les champs sont obligatoires.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createCountry(newCountry); // API pour créer un pays
      console.log('Données envoyées:', newCountry);
      const successMessage = response?.message || 'Le pays a été ajouté avec succès !';

      await loadFetchCountries(); // Recharger les pays après ajout
      setNewCountry({ name: '', iso_code: '', flag: '', currency_id: '' }); // Réinitialisation des champs
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: successMessage,
        confirmButtonColor: '#15803D',
      });
    } catch (error) {
      console.error('Erreur lors de l’ajout du pays:', error);
      let errorMessage = 'Une erreur est survenue lors de l\'ajout du pays.';
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

  // Gestion de la fermeture de la modal
  const handleCloseModal = () => {
    if (newCountry.name || newCountry.iso_code || newCountry.flag || newCountry.currency_id) {
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
          setNewCountry({ name: '', iso_code: '', flag: '', currency_id: '' });
        }
      });
    } else {
      closeModal();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Ajouter un nouveau pays</h2>
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
              value={newCountry.name}
              onChange={handleInputChange}
              placeholder="Nom du pays (e.g., France)"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Code ISO</label>
            <input
              type="text"
              name="iso_code"
              value={newCountry.iso_code}
              onChange={handleInputChange}
              placeholder="Code ISO (e.g., FR)"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Drapeau</label>
            <input
              type="text"
              name="flag"
              value={newCountry.flag}
              onChange={handleInputChange}
              placeholder="Emoji du drapeau (e.g., 🇫🇷)"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Devise</label>
            {loadingCurrencies ? (
              <div>Chargement des devises...</div>
            ) : (
              <select
                name="currency_id"
                value={newCountry.currency_id}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                required
              >
                <option value="">Sélectionnez une devise</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name} {currency.symbol} ({currency.iso_code})
                  </option>
                ))}
              </select>
            )}
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
              className={`bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white py-2 px-4 rounded-md ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
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
export default AddCountryModal;
