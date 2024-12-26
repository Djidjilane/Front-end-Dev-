import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { updateCountry } from '../../../../../api/context/api_service_countries';
import { getCurrencies } from '../../../../../api/context/api_service_currencies'; // Fonction pour récupérer les devises

const EditCountryModal = ({
  isModalOpen,
  closeModal,
  countryToEdit,
  loadFetchCountries
}) => {
  const [editedCountry, setEditedCountry] = useState({
    name: '',
    iso_code: '',
    flag: '',
    currency_id: '',
  });

  const [currencies, setCurrencies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (countryToEdit) {
      setEditedCountry({
        name: countryToEdit.name || '',
        iso_code: countryToEdit.iso_code || '',
        flag: countryToEdit.flag || '',
        currency_id: countryToEdit.currency_id || '',
      });
    }
  }, [countryToEdit]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await getCurrencies();
        setCurrencies(response); // Charger les devises
      } catch (error) {
        console.error("Erreur lors de la récupération des devises", error);
      }
    };

    fetchCurrencies(); // Charger les devises à l'initialisation
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCountry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Appel API pour mettre à jour le pays
      const response = await updateCountry(countryToEdit.id, editedCountry);

      // Message de succès depuis l'API ou message par défaut
      const successMessage = response?.message || "L'information du pays a été modifié avec succès !";

      // Recharger la liste des pays
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
      console.error("Erreur lors de la mise à jour :", error);

      // Message d'erreur depuis l'API ou message par défaut
      const errorMessage =
        error.response?.data?.message || "Une erreur est survenue lors de la mise à jour du pays.";

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
          <h2 className="text-xl font-semibold">Modifier le pays</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {submitError && <div className="mb-4 text-red-500">{submitError}</div>}

          {/* Nom du pays */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              value={editedCountry.name}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Code ISO */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Code ISO</label>
            <input
              type="text"
              name="iso_code"
              value={editedCountry.iso_code}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Emoji du drapeau */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Emoji du drapeau</label>
            <input
              type="text"
              name="flag"
              value={editedCountry.flag}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Devise */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Devise</label>
            <select
              name="currency_id"
              value={editedCountry.currency_id}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            >
              <option value="">Sélectionnez une devise</option>
              {currencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Boutons d'action */}
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

export default EditCountryModal;
