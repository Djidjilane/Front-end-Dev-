import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SidebarEntreprise from '../../components/Dashboard/DashboardSidebar/SidebarEntreprise';
export default function MesOffresStage() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserType(user?.type);

        if (user?.type === 'entreprise') {

            const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/entreprise/mesOffreStage', {
          headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
        });

        setOffres(response.data.offre || []);
      } 
    }catch (error) {
        console.error('Erreur:', error);
        setError(error.response?.data?.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
   

  // Navigation
  const voirCandidatures = (offreId) => navigate(`/entreprise/candidatureStage/${offreId}`);
  const creerOffreStage = () => navigate('/offre/create/stage');

  /* Affichage hors ligne
  if (!isOnline && offres.length === 0) {
    return (
      <div className="flex h-screen bg-gray-50">
        <SidebarEntreprise />
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
            <h2 className="mt-4 text-xl font-bold text-gray-800">Pas de connexion Internet</h2>
            <p className="mt-2 text-gray-600">
              {error || 'Les données affichées peuvent ne pas être à jour.'}
            </p>
            <button
              onClick={reloadPage}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }
*/
  // États de chargement/erreur
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

  if (error) return (
    <div className="flex h-screen">
      <SidebarEntreprise />
      <div className="flex-1 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p>{error}</p>
      </div>
    </div>
  );

  if (userType !== 'entreprise') {
    return (
      <div className="flex h-screen">
        <SidebarEntreprise />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 max-w-md">
            <p className="text-yellow-700">Cette page est réservée aux entreprises.</p>
          </div>
        </div>
      </div>
    );
  }

  // Affichage principal
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarEntreprise />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Mes Offres de Stage</h1>
            <button
              onClick={creerOffreStage}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Créer une nouvelle offre
            </button>
          </div>


          {/* Liste des offres */}
          {offres.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune offre disponible</h3>
              <p className="mt-1 text-sm text-gray-500">
              </p>
              <button
                onClick={creerOffreStage}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center"
                >
                Créer une offre
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {offres.map((offre) => (
                <div key={offre.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{offre.domaine || 'Domaine non spécifié'}</h2>
                      <p className="text-gray-600 mt-1">{offre.description || 'Pas de description'}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {offre.lieu || 'Non précisé'}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                          {offre.niveau || 'Non spécifié'}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {offre.date_limite || 'Non précisée'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => voirCandidatures(offre.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center"

                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      Candidatures
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  
        );
  }