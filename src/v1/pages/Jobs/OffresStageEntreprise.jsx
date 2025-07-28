import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import ModalAlert from "./ModalAlert";
import { toast } from "react-toastify";

import {
  BuildingOfficeIcon,
  ClipboardDocumentIcon,
  AcademicCapIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const OffresStageEntreprise = () => {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [pendingId, setPendingId] = useState(null);

  const [filters, setFilters] = useState({
    domaine: '',
    lieu: '',
    niveau: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axiosInstance.get("/offreStage");
        setOffres(response.data.offre);
      } catch (error) {
        console.error("Erreur lors du chargement des offres :", error);
        setErreur("Une erreur est survenue lors du chargement des offres.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffres();
  }, []);

  const handlePostuler = async (idOffre) => {
    console.log("handlePostuler appelé avec idOffre:", idOffre); // Debug
    setPendingId(idOffre);
    
    try {
      console.log("Vérification de l'utilisateur..."); // Debug
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      console.log("User from localStorage:", user); // Debug
      
      if (!token) {
        console.log("Utilisateur non connecté - affichage modale"); // Debug
        setShowModal(true);
        return;
      }
  
      if (user?.type !== "stagiaire") {
        console.log("Rôle incorrect:", user.role); // Debug
        toast.error("Accès réservé aux ouvriers");
        return;
      }
  
      console.log("Redirection vers /formul/", idOffre); // Debug
      navigate(`/candidature/stage/${idOffre}`);
     
    } catch (error) {
      console.error("ERREUR dans handlePostuler:", error); // Debug
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setPendingId(null);
    }
  };    // Filtrer les offres
  const filteredOffres = offres.filter(offre => {
    return (
      (filters.domaine === '' || offre.domaine.includes(filters.domaine)) &&
      (filters.lieu === '' || offre.lieu.includes(filters.lieu)) &&
      (filters.niveau === '' || offre.niveau.includes(filters.niveau))
    );
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOffres = filteredOffres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOffres.length / itemsPerPage);

  // Options uniques pour les filtres
  const domaines = [...new Set(offres.map(offre => offre.domaine))];
  const lieux = [...new Set(offres.map(offre => offre.lieu))];
  const niveaux = [...new Set(offres.map(offre => offre.niveau))];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Header compact */}
      {!loading && !erreur && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Offres de stage</h1>
          <p className="text-sm text-gray-500 mt-1">
            {offres.length} opportunités disponibles
          </p>
        </div>
      )}

      {/* Filtres compacts 
      {!loading && offres.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center text-sm text-gray-600">
              <FunnelIcon className="h-4 w-4 mr-1" />
              <span>Filtrer :</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
              <select
                value={filters.domaine}
                onChange={(e) => setFilters({...filters, domaine: e.target.value})}
                className="block w-full rounded border-gray-300 py-1 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Tous domaines</option>
                {domaines.map((domaine, index) => (
                  <option key={index} value={domaine}>{domaine}</option>
                ))}
              </select>

              <select
                value={filters.lieu}
                onChange={(e) => setFilters({...filters, lieu: e.target.value})}
                className="block w-full rounded border-gray-300 py-1 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Tous lieux</option>
                {lieux.map((lieu, index) => (
                  <option key={index} value={lieu}>{lieu}</option>
                ))}
              </select>

              <select
                value={filters.niveau}
                onChange={(e) => setFilters({...filters, niveau: e.target.value})}
                className="block w-full rounded border-gray-300 py-1 text-xs shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Tous niveaux</option>
                {niveaux.map((niveau, index) => (
                  <option key={index} value={niveau}>{niveau}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
     */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 border-solid"></div>
        </div>
      )}

      {erreur && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">{erreur}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !erreur && filteredOffres.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <ClipboardDocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune offre correspondante</h3>
          <p className="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
          <button 
            onClick={() => setFilters({ domaine: '', lieu: '', niveau: '' })}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

{!loading && !erreur && filteredOffres.length > 0 && (
        <>
          <div className="space-y-4"> {/* Réduit l'espace entre les offres */}
            {currentOffres.map((offre) => (
              <div
                key={offre.id}
                className="bg-white border border-gray-200 rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 ease-in-out"
              >
                <div className="p-4 sm:p-5"> {/* Padding réduit */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1 space-y-2"> {/* Espacement réduit */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                          {offre.domaine}
                        </span>
                        <span className="text-xs text-gray-500">
                          Publié le {new Date(offre.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {offre.titre || `Stage en ${offre.domaine}`}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {offre.description}
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-4 w-4 mr-1" />
                          <span>{offre.niveau}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{offre.lieu}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>Limite: {offre.date_limite}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-0 4:w-28 flex-shrink-0">
                    <button
                                className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out shadow-sm hover:shadow-md text-sm"

                      onClick={() => {
                          console.log("Bouton cliqué, appel de handlePostuler");
                          handlePostuler(offre.id);

                                }}
                              disabled={pendingId === offre.id}
                              //className={`... ${pendingId === offre.id ? 'animate-pulse' : ''}`}
                              >
                          {pendingId === offre.id ? 'Chargement...' : 'Postuler'}
</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Affichage <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredOffres.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredOffres.length}</span> résultats
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {showModal && (
        <ModalAlert
          message="Connectez-vous pour postuler à une offre."
          onConfirm={() => {
            setShowModal(false);
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default OffresStageEntreprise;