import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarOuvrier from '../../components/Dashboard/DashboardSidebar/SidebarOuvrier';

export default function MesCandidaturesOuvrier() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotConnectedModal, setShowNotConnectedModal] = useState(false);
  const [showRoleErrorModal, setShowRoleErrorModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      setShowNotConnectedModal(true);
      setLoading(false);
      return;
    }

    if (user?.type !== "ouvrier") {
      setShowRoleErrorModal(true);
      setLoading(false);
      return;
    }

    axios.get('http://localhost:8000/api/ouvrier/mesCandidatures', {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    .then(response => {
      // Transformation des données pour le frontend
      const formattedData = response.data.candidatures.map(c => ({
        id: c.id,
        statut: c.statut || 'en_attente',
        created_at: c.created_at || new Date().toISOString(),
        // Gestion des données manquantes
        offre: {
          domaine: c.offre?.domaine || 'Domaine non spécifié',
          titre: c.offre?.titre || 'Titre non disponible'
        }
      }));
      setCandidatures(formattedData);
      setLoading(false);
    })
    .catch(error => {
      console.error("Erreur:", error);
      setError("Erreur lors du chargement des candidatures");
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
      setLoading(false);
    });
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { state: { from: location.pathname } });
  };

  const handleCloseNotConnectedModal = () => {
    setShowNotConnectedModal(false);
    navigate('/login', { state: { from: location.pathname } });
  };

  const handleCloseRoleErrorModal = () => {
    setShowRoleErrorModal(false);
    handleLogout();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
    <SidebarOuvrier />
    
    <div className="flex-1 overflow-y-auto p-6">


      <h1 className="text-2xl font-bold mb-6 text-center">Mes Candidatures d'Emploi</h1>

      {/* Liste des candidatures */}
      <div className="space-y-4">
        {candidatures.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune candidature</h3>
            <p className="mt-1 text-sm text-gray-500">Vous n'avez postulé à aucune offre pour le moment.</p>
          </div>
        ) : (
          candidatures.map(candidature => (
            <div key={candidature.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{candidature.offre.titre}</h3>
                  <p className="text-gray-600">{candidature.offre.domaine}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  candidature.statut === 'acceptee' ? 'bg-green-100 text-green-800' :
                  candidature.statut === 'rejettee' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {candidature.statut.replace('_', ' ')}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Postulé le {new Date(candidature.created_at).toLocaleDateString('fr-FR')}
                </p>
                <button 
                  onClick={() => navigate(`/candidature/${candidature.id}`)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Voir détails →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
</div>
      {/* Modal Non Connecté */}
      {showNotConnectedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Connexion requise</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>Vous devez être connecté pour accéder à cette page.</p>
              </div>
              <div className="mt-5 flex justify-center space-x-3">
                <button
                  onClick={handleCloseNotConnectedModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Mauvais Rôle */}
      {showRoleErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Accès restreint</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>Cette page est réservée aux ouvriers.</p>
              </div>
              <div className="mt-5 flex justify-center space-x-3">
                <button
                  onClick={handleCloseRoleErrorModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Compris
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}