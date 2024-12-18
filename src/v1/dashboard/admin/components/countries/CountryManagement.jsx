// src/components/countries/CountryManagement.jsx

import React, { useState } from 'react';
import { FaPen, FaTrashAlt, FaPlus, FaEye } from 'react-icons/fa';
import AddCountryModal from '../sub-components/AddCountryModal';
import EditCountryModal from '../sub-components/EditCountryModal';
import DeleteCountryModal from '../sub-components/DeleteCountryModal';
import ShowTown from '../sub-components/ShowTown';
import AddTownModal from '../sub-components/AddTownModal'; // Import du modal d'ajout de ville

const initialCountries = []; // Liste des pays initialisée vide

const CountryManagement = () => {
  const [countries, setCountries] = useState(initialCountries);
  const [isAddCountryModalOpen, setIsAddCountryModalOpen] = useState(false);
  const [isEditCountryModalOpen, setIsEditCountryModalOpen] = useState(false);
  const [isDeleteCountryModalOpen, setIsDeleteCountryModalOpen] = useState(false);
  const [countryToEdit, setCountryToEdit] = useState(null);
  const [countryToDelete, setCountryToDelete] = useState(null);
  const [isShowTownModalOpen, setIsShowTownModalOpen] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [isAddTownModalOpen, setIsAddTownModalOpen] = useState(false);
  const [countryIdForAddTown, setCountryIdForAddTown] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");

  // Ouvrir et fermer les modals de pays
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
    setIsDeleteCountryModalOpen(true);
  };
  const closeDeleteCountryModal = () => {
    setIsDeleteCountryModalOpen(false);
    setCountryToDelete(null);
  };

  // Ouvrir et fermer la modal de visualisation des villes
  const openShowTownModal = (countryId) => {
    setSelectedCountryId(countryId);
    setIsShowTownModalOpen(true);
  };
  const closeShowTownModal = () => {
    setIsShowTownModalOpen(false);
    setSelectedCountryId(null);
  };

  // Ouvrir et fermer la modal d'ajout de ville
  const openAddTownModal = (countryId) => {
    setCountryIdForAddTown(countryId);
    setIsAddTownModalOpen(true);
  };
  const closeAddTownModal = () => {
    setIsAddTownModalOpen(false);
    setCountryIdForAddTown(null);
  };

  // Gestion des pays
  const handleAddCountry = (newCountry) => {
    const newCountryWithId = { ...newCountry, id: Date.now(), towns: [] };
    setCountries([...countries, newCountryWithId]);
    closeAddCountryModal();
    setSuccessMessage(`Le pays ${newCountry.name} a été ajouté avec succès!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEditCountry = (updatedCountry) => {
    const updatedCountries = countries.map(country =>
      country.id === updatedCountry.id ? updatedCountry : country
    );
    setCountries(updatedCountries);
    closeEditCountryModal();
    setSuccessMessage(`Le pays ${updatedCountry.name} a été mis à jour avec succès!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteCountry = () => {
    if (countryToDelete) {
      const updatedCountries = countries.filter(country => country.id !== countryToDelete.id);
      setCountries(updatedCountries);
      closeDeleteCountryModal();
      setSuccessDeleteMessage(`Le pays ${countryToDelete.name} a été supprimé avec succès!`);
      setTimeout(() => setSuccessDeleteMessage(""), 3000);
    }
  };

  // Gestion des villes
  const handleAddTown = (countryId, newTown) => {
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        return { ...country, towns: [...country.towns, newTown] };
      }
      return country;
    });
    setCountries(updatedCountries);
  };

  const handleEditTown = (countryId, townId, newTownName) => {
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        const updatedTowns = country.towns.map(town =>
          town.id === townId ? { ...town, name: newTownName } : town
        );
        return { ...country, towns: updatedTowns };
      }
      return country;
    });
    setCountries(updatedCountries);
  };

  const handleDeleteTown = (countryId, townId) => {
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        const updatedTowns = country.towns.filter(town => town.id !== townId);
        return { ...country, towns: updatedTowns };
      }
      return country;
    });
    setCountries(updatedCountries);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gestion des pays</h2>
        <button
          onClick={openAddCountryModal}
          className="px-2 py-2 bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white rounded-md"
        >
          + Ajouter un pays
        </button>
      </div>

      {/* Messages de succès */}
      {successMessage && (
        <div className="bg-green-500 text-white py-3 px-6 rounded-lg mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-white mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage("")} className="text-white">
            &times;
          </button>
        </div>
      )}

      {successDeleteMessage && (
        <div className="bg-red-400 text-white py-3 px-6 rounded-lg mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-white mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successDeleteMessage}</span>
          </div>
          <button onClick={() => setSuccessDeleteMessage("")} className="text-white">
            &times;
          </button>
        </div>
      )}

      {/* Vérifier si la liste des pays est vide */}
      {countries.length === 0 ? (
        <div className="text-center text-red-400 font-semibold">
          Aucun pays ajouter pour le moment !
        </div>
      ) : (
        /* Tableau des pays */
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Région</th>
              <th className="px-6 py-3 text-left">Flag Emoji</th>
              <th className="px-6 py-3 text-left">Devise</th>
              <th className="px-6 py-3 text-left">Villes</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(country => (
              <tr key={country.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-700">{country.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{country.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{country.region}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{country.flag}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{country.currency}</td>
                <td className="px-6 py-4 text-sm">
                  {/* Boutons "Voir" et "Ajouter une ville" */}
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
                  {/* Bouton Editer */}
                  <button
                    onClick={() => openEditCountryModal(country)}
                    className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white mr-2 p-2 rounded-md"
                  >
                    <FaPen />
                  </button>
                  {/* Bouton Supprimer */}
                  <button
                    onClick={() => openDeleteCountryModal(country)}
                    className="bg-red-500 text-white p-2 rounded-md"
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
      <AddCountryModal
        isModalOpen={isAddCountryModalOpen}
        closeModal={closeAddCountryModal}
        handleAddCountry={handleAddCountry}
      />

      <EditCountryModal
        isModalOpen={isEditCountryModalOpen}
        closeModal={closeEditCountryModal}
        countryToEdit={countryToEdit}
        handleEditCountry={handleEditCountry}
      />

      <DeleteCountryModal
        isOpen={isDeleteCountryModalOpen}
        closeModal={closeDeleteCountryModal}
        handleDelete={handleDeleteCountry}
        countryName={countryToDelete ? countryToDelete.name : ""}
      />

      {isShowTownModalOpen && (
        <ShowTown
          countryId={selectedCountryId}
          towns={countries.find(country => country.id === selectedCountryId)?.towns || []}
          handleEditTown={handleEditTown}
          handleDeleteTown={handleDeleteTown}
          closeModal={closeShowTownModal}
        />
      )}

      {isAddTownModalOpen && (
        <AddTownModal
          isModalOpen={isAddTownModalOpen}
          closeModal={closeAddTownModal}
          countryId={countryIdForAddTown}
          handleAddTown={handleAddTown}
        />
      )}
    </div>
  );
};

export default CountryManagement;
