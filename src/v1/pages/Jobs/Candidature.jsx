import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import SidebarEntreprise from "../../components/Dashboard/DashboardSidebar/SidebarEntreprise";

export default function VoirCandidatures() {
  const { id } = useParams();
  const [offre, setOffre] = useState(null);
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ 
    show: false, 
    action: "", 
    idCandidature: null,
    candidatName: "" 
  });
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  // Vérification de la connexion et du rôle
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }

    if (user?.type !== "entreprise") {
      setError("Accès réservé aux entreprises");
      return;
    }

    setUserType(user.type);
    fetchCandidatures();
  }, [id, navigate]);

  const fetchCandidatures = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        `/entreprise/candidatureParOffreEmploi/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOffre(response.data.offre);
      setCandidatures(response.data.candidatures);
    } catch (error) {
      console.error("Erreur chargement candidatures:", error);
      setError(error.response?.data?.message || "Erreur lors du chargement des candidatures");
    } finally {
      setLoading(false);
    }
  };

  const confirmAction = (idCandidature, action, candidatName) => {
    setModal({ 
      show: true, 
      action, 
      idCandidature,
      candidatName 
    });
  };

  const handleAction = async () => {
    const { idCandidature, action } = modal;
    try {
      const token = localStorage.getItem("token");
      const url = `/entreprise/candidature_emploi/${action}/${idCandidature}`;
      const response = await axiosInstance.patch(
        url, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mise à jour optimiste de l'état
      setCandidatures(prev =>
        prev.map(c =>
          c.id === idCandidature 
            ? { ...c, statut: action === "accepter" ? "acceptee" : "rejettee" } 
            : c
        )
      );
    } catch (error) {
      console.error(`Erreur ${action}:`, error);
      setError("Une erreur est survenue lors de la mise à jour");
    } finally {
      setModal({ show: false, action: "", idCandidature: null, candidatName: "" });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <SidebarEntreprise />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <SidebarEntreprise />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarEntreprise />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Candidatures pour : <span className="text-blue-600">{offre?.projet || "Offre #" + id}</span>
            </h1>
            <p className="text-gray-600 mt-1">
              {candidatures.length} candidature(s) reçue(s)
            </p>
          </div>

          {candidatures.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune candidature disponible</h3>
              <p className="mt-1 text-sm text-gray-500">Aucun candidat n'a postulé à cette offre pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {candidatures.map((candidat) => (
                <div key={candidat.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {candidat.candidat_prenom} {candidat.candidat_nom}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Postulé le {new Date(candidat.date_candidature).toLocaleDateString()}
                        </span>
                        <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          candidat.statut === "acceptee" 
                            ? "bg-green-100 text-green-800" 
                            : candidat.statut === "rejettee" 
                              ? "bg-red-100 text-red-800" 
                              : "bg-blue-100 text-blue-800"
                        }`}>
                          {candidat.statut === "acceptee" 
                            ? "Accepté" 
                            : candidat.statut === "rejettee" 
                              ? "Refusé" 
                              : "En attente"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => confirmAction(
                          candidat.id, 
                          "accepter", 
                          `${candidat.candidat_prenom} ${candidat.candidat_nom}`
                        )}
                        disabled={candidat.statut === "acceptee"}
                        className={`px-3 py-1 rounded-md text-sm flex items-center ${
                          candidat.statut === "acceptee"
                            ? "bg-green-100 text-green-700 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Accepter
                      </button>
                      
                      <button
                        onClick={() => confirmAction(
                          candidat.id, 
                          "rejeter", 
                          `${candidat.candidat_prenom} ${candidat.candidat_nom}`
                        )}
                        disabled={candidat.statut === "rejettee"}
                        className={`px-3 py-1 rounded-md text-sm flex items-center ${
                          candidat.statut === "rejettee"
                            ? "bg-red-100 text-red-700 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Refuser
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmation */}
      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-fade-in">
            <div className="text-center">
              <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                modal.action === "accepter" ? "bg-green-100" : "bg-red-100"
              }`}>
                <svg 
                  className={`h-6 w-6 ${modal.action === "accepter" ? "text-green-600" : "text-red-600"}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={modal.action === "accepter" ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} 
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">
                Confirmer {modal.action === "accepter" ? "l'acceptation" : "le refus"}
              </h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  Voulez-vous vraiment {modal.action === "accepter" ? "accepter" : "refuser"} la candidature de{" "}
                  <span className="font-semibold">{modal.candidatName}</span> ?
                </p>
              </div>
              <div className="mt-5 flex justify-center space-x-3">
                <button
                  onClick={() => setModal({ show: false, action: "", idCandidature: null, candidatName: "" })}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAction}
                  className={`px-4 py-2 rounded-md text-white ${
                    modal.action === "accepter" 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-red-600 hover:bg-red-700"
                  } transition-colors`}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}