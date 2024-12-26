import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { FaPen, FaTrashAlt, FaPlus } from 'react-icons/fa';
import AddCurrencyModal from './sub-components/AddCurrencyModal';
import EditCurrencyModal from './sub-components/EditCurrencyModal';
import DeleteCurrencyModal from './sub-components/DeleteCurrencyModal';
import { getCurrencies } from '../../../../api/context/api_service_currencies';



const CurrenciesManagement = () => {
  // États pour les devises
  const [currencies, setCurrencies] = useState([]);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);
  const [currencyError, setCurrencyError] = useState(null);

  // États pour les modals
  const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = useState(false);
  const [isEditCurrencyModalOpen, setIsEditCurrencyModalOpen] = useState(false);
  const [isDeleteCurrencyModalOpen, setIsDeleteCurrencyModalOpen] = useState(false);
  const [currencyToEdit, setCurrencyToEdit] = useState(null);
  const [currencyToDelete, setCurrencyToDelete] = useState(null);

  // Fonction pour récupérer les devises
  const fetchCurrencies = async () => {
    setIsLoadingCurrencies(true);
    setCurrencyError(null);
    try {
      const response = await getCurrencies();

      // Vérifier et assigner les données
      const fetchedCurrencies = Array.isArray(response)
        ? response
        : response?.data?.currencies || [];

      setCurrencies(fetchedCurrencies);
    } catch (error) {
      console.error("Erreur lors de la récupération des devises :", error);
      setCurrencyError("Erreur lors de la récupération des devises.");
    } finally {
      setIsLoadingCurrencies(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  // Fonctions pour ouvrir/fermer les modals
  const openAddCurrencyModal = () => setIsAddCurrencyModalOpen(true);
  const closeAddCurrencyModal = () => setIsAddCurrencyModalOpen(false);

  const openEditCurrencyModal = (currency) => {
    setCurrencyToEdit(currency);
    setIsEditCurrencyModalOpen(true);
  };
  const closeEditCurrencyModal = () => {
    setIsEditCurrencyModalOpen(false);
    setCurrencyToEdit(null);
  };

  const openDeleteCurrencyModal = (currency) => {
    setCurrencyToDelete(currency);
    setIsDeleteCurrencyModalOpen(true);
  };
  const closeDeleteCurrencyModal = () => {
    setIsDeleteCurrencyModalOpen(false);
    setCurrencyToDelete(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gestion des devises</h2>
        <button
          onClick={openAddCurrencyModal}
          className="px-2 py-2 bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white rounded-md"
        >
          <FaPlus className="inline-block mr-1" /> Ajouter une devise
        </button>
      </div>

      {/* Affichage des devises ou messages de chargement */}
      {isLoadingCurrencies ? (
        <div className="flex justify-center items-center h-40">
        <TailSpin
          height="50"
          width="50"
          color="#15803D"
          ariaLabel="loading"
        />
      </div>
      ) : currencyError ? (
        <div className="text-center text-red-500">{currencyError}</div>
      ) : currencies.length === 0 ? (
        <div className="text-center my-36 text-red-500 font-semibold">
          Aucune devise ajoutée pour le moment !
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Code ISO</th>
              <th className="px-6 py-3 text-left">Symbole</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency,index) => (
              <tr key={currency.iso_code} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{currency.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{currency.iso_code}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{currency.symbol}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => openEditCurrencyModal(currency)}
                    className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] rounded-md p-2 text-white mr-2"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => openDeleteCurrencyModal(currency)}
                    className="bg-red-600 p-2 text-white rounded-md"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modals */}
      <AddCurrencyModal
        isModalOpen={isAddCurrencyModalOpen}
        closeModal={closeAddCurrencyModal}
        loadfetchCurrencies={fetchCurrencies}
      />
      <EditCurrencyModal
        isModalOpen={isEditCurrencyModalOpen}
        closeModal={closeEditCurrencyModal}
        currencyToEdit={currencyToEdit}
        loadfetchCurrencies={fetchCurrencies}
      />
      <DeleteCurrencyModal
        isOpen={isDeleteCurrencyModalOpen}
        closeModal={closeDeleteCurrencyModal}
        currency={currencyToDelete}
        loadfetchCurrencies={fetchCurrencies}
      />
    </div>
  );
};

export default CurrenciesManagement;
