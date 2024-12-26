import React, { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { FaPen, FaTrashAlt, FaPlus, FaEye } from 'react-icons/fa';
import AddCountryModal from './sub-components/AddCountryModal';
import EditCountryModal from './sub-components/EditCountryModal';
import DeleteCountryModal from './sub-components/DeleteCountryModal';
import AddTownModal from './sub-components/AddTownModal';
import ShowTownModal from './sub-components/ShowTownModal';
import { getCountries, deleteCountry } from '../../../../api/context/api_service_countries';
const CountryManagement = ({handleEditTown, handleDeleteTown }) => {
  // États pour les pays
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [countryError, setCountryError] = useState(null);

  // États pour les modals des pays 
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false);
  const [isEditCountryModalOpen, setIsEditCountryModalOpen] = useState(false);
  const [isDeleteCountryModalOpen, setIsDeleteCountryModalOpen] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState(null);
  const [countryToEdit, setCountryToEdit] = useState(null);


  //Etats pour les modals des villes 
  const [isShowTownModalOpen, setIsShowTownModalOpen] = useState(false);
  const [isAddTownModalOpen, setIsAddTownModalOpen] = useState(false);
  const [countryToShowTowns, setCountryToShowTowns] = useState(null);
  const [countryToAddTown, setCountryToAddTown] = useState(null);

  // Fonction pour récupérer les pays
  const fetchCountries = async () => {
    setIsLoadingCountries(true);
    setCountryError(null);
    try {
      const response = await getCountries();

      // Vérifier et assigner les données
      const fetchedCountries = Array.isArray(response)
        ? response
        : response?.data?.countries || [];

      setCountries(fetchedCountries);
    } catch (error) {
      console.error("Erreur lors de la récupération des pays :", error);
      setCountryError("Erreur lors de la récupération des pays.");
    } finally {
      setIsLoadingCountries(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Fonctions pour ouvrir/fermer les modals
  const openAddCountryModal = () => setIsAddCountryModalOpen(true);
  const closeAddCountryModal = () => setIsAddCountryModalOpen(false);

  const openEditCountryModal = (country) => {
    setCountryToEdit(country);
    setIsEditCountryModalOpen(true);
  };
  const closeEditCountryModal = () => {
    setIsEditCountryModalOpen(false);
    setCountryToEdit(null);
  };

  const openDeleteCountryModal = (country) => {
    setCountryToDelete(country);
    setIsDeleteCountryModalOpen(true);  // Ouverture du modal de suppression
  };
  const closeDeleteCountryModal = () => {
    setIsDeleteCountryModalOpen(false);  // Fermeture du modal de suppression
    setCountryToDelete(null);  // Réinitialisation du pays à supprimer
  };


  const openShowTownModal = (countryId) => {
    setCountryToShowTowns(countryId);
    setIsShowTownModalOpen(true);
  };
  const closeShowTownModal = () => {
    setIsShowTownModalOpen(false);
    setCountryToShowTowns(null);
  };

  const openAddTownModal = (countryId) => {
    setCountryToAddTown(countryId);
    setIsAddTownModalOpen(true);
  };
  const closeAddTownModal = () => {
    setIsAddTownModalOpen(false);
    setCountryToAddTown(null);
  };

  // Fonctions pour ajouter et modifier les pays
  const handleAddCountry = (newCountry) => {
    setCountries((prevCountries) => [...prevCountries, newCountry]);
  };

  const handleEditCountry = (updatedCountry) => {
    setCountries((prevCountries) =>
      prevCountries.map((country) =>
        country.id === updatedCountry.id ? updatedCountry : country
      )
    );
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      await deleteCountry(countryId);
      setCountries(countries.filter((country) => country.id !== countryId)); // Retirer le pays de la liste après suppression
      closeDeleteCountryModal(); // Fermer la modal
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Le pays a été supprimé avec succès.',
        confirmButtonColor: '#15803D',
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du pays :", error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la suppression du pays.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gestion des pays</h2>
        <button
          onClick={openAddCountryModal}
          className="px-2 py-2 bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white rounded-md"
        >
          <FaPlus className="inline-block mr-1" /> Ajouter un pays
        </button>
      </div>

      {/* Affichage des pays ou messages de chargement */}
      {isLoadingCountries ? (
        <div className="flex justify-center items-center h-40">
          <TailSpin height="50" width="50" color="#15803D" ariaLabel="loading" />
        </div>
      ) : countryError ? (
        <div className="text-center text-red-500">{countryError}</div>
      ) : countries.length === 0 ? (
        <div className="text-center my-36 text-red-500 font-semibold">
          Aucun pays ajouté pour le moment !
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Code ISO</th>
              <th className="px-6 py-3 text-left">Drapeau</th>
              <th className="px-6 py-3 text-left">Devise</th>
              <th className="px-6 py-3 text-left">Villes</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={country.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{country.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{country.iso_code}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{country.flag}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {country.currency ? `${country.currency.name} (${country.currency.symbol})` : 'Non définie'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openShowTownModal(country.id)}
                      className="bg-gray-300 hover:bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white p-2 rounded-md"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => openAddTownModal(country.id)}
                      className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white p-2 rounded-md"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => openEditCountryModal(country)}
                      className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] rounded-md p-2 text-white"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => openDeleteCountryModal(country)}

                      className="bg-red-600 p-2 text-white rounded-md"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modals */}
      <AddCountryModal
        isModalOpen={isAddCountryModalOpen}
        closeModal={closeAddCountryModal}
        loadFetchCountries={fetchCountries}
        handleAddCountry={handleAddCountry}
      />
      <EditCountryModal
        isModalOpen={isEditCountryModalOpen}
        closeModal={closeEditCountryModal}
        countryToEdit={countryToEdit}
        loadFetchCountries={fetchCountries}
        handleEditCountry={handleEditCountry}
      />
      <DeleteCountryModal
        isOpen={isDeleteCountryModalOpen}
        closeModal={closeDeleteCountryModal}
        country={countryToDelete}
        handleDelete={handleDeleteCountry}
        loadFetchCountries={fetchCountries}
      />
      <AddTownModal
        isModalOpen={isAddTownModalOpen}
        closeModal={closeAddTownModal}
        countryId={countryToAddTown}
        handleAddTown={() => { }}
      />

      {isShowTownModalOpen && (
        <ShowTownModal
          countryId={countryToShowTowns} 
          handleEditTown={handleEditTown}
          handleDeleteTown={handleDeleteTown}
          closeModal={closeShowTownModal}
        />
        
      )}
    </div>
  );
};

export default CountryManagement;
