import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit, FaTimes } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { getCities } from '../../../../../api/context/api_service_cities';
import EditTownModal from './EditTownModal';
import DeleteTownModal from './DeleteTownModal';

const ShowTownModal = ({ countryId, handleEditTown, closeModal }) => {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditTownModalOpen, setIsEditTownModalOpen] = useState(false);
  const [townToEdit, setTownToEdit] = useState(null);
  const [isDeleteTownModalOpen, setIsDeleteTownModalOpen] = useState(false);
  const [townToDelete, setTownToDelete] = useState(null);

  // Fonction pour récupérer les villes
  const fetchTowns = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const allTowns = await getCities();
      const filteredTowns = allTowns.filter((town) => String(town.country_id) === String(countryId));

      setTowns(filteredTowns);
    } catch (err) {
      setError('Erreur lors de la récupération des villes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTowns();
  }, [countryId]);

  // Gestion de la suppression d'une ville
  const handleDeleteTown = (deletedTownId) => {
    setTowns((prevTowns) => prevTowns.filter((town) => town.id !== deletedTownId));
  };

  // Ouvrir la modal d'édition
  const openEditTownModal = (town) => {
    setTownToEdit(town);
    setIsEditTownModalOpen(true);
  };

  // Fermer la modal d'édition
  const closeEditTownModal = () => {
    setIsEditTownModalOpen(false);
    setTownToEdit(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Liste des villes</h2>
          <button onClick={closeModal} className="text-gray-500">
            <FaTimes size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Oval
              height={50}
              width={50}
              color="#15803D"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#15803D"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : towns.length === 0 ? (
          <div className="text-center text-red-500">Aucune ville ajoutée pour ce pays !</div>
        ) : (
          <table className="min-w-full bg-white border rounded-md">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Nom de la ville</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {towns.map((town, index) => (
                <tr key={town.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{town.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => openEditTownModal(town)}
                      className="bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white mr-2 p-2 rounded-md"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setTownToDelete(town);
                        setIsDeleteTownModalOpen(true);
                      }}
                      className="bg-red-500 text-white mr-2 p-2 rounded-md"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isEditTownModalOpen && (
          <EditTownModal
            isModalOpen={isEditTownModalOpen}
            closeModal={closeEditTownModal}
            town={townToEdit}
            handleEditTown={fetchTowns}
          />
        )}

        {isDeleteTownModalOpen && (
          <DeleteTownModal
            isModalOpen={isDeleteTownModalOpen}
            closeModal={() => setIsDeleteTownModalOpen(false)}
            town={townToDelete}
            handleDeleteTown={(deletedTownId) => {
              handleDeleteTown(deletedTownId);
              setIsDeleteTownModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ShowTownModal;
