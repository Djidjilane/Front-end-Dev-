import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import LayoutComponent from "../../layouts/LayoutComponent";

const formatDateToFrench = (dateString) => {
  if (!dateString) return "Date non définie";
  
  const options = { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  };
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  } catch (e) {
    console.error("Erreur de formatage de date", e);
    return dateString;
  }
};

export default function ListeProjetsEntreprise() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axiosInstance.get("/projet/entreprise/projets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setProjets(Array.isArray(res.data.projets) ? res.data.projets : []);
    })
    .catch((error) => {
      console.error("Erreur API :", error.response || error.message || error);
      setErreur("Impossible de charger les projets.");
    })
    .finally(() => {
      setLoading(false);  
    });
  }, [navigate]);
  
  if (loading) return (
    <LayoutComponent>
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    </LayoutComponent>
  );

  if (erreur) return (
    <LayoutComponent>
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Erreur</p>
          <p>{erreur}</p>
        </div>
      </div>
    </LayoutComponent>
  );

  return (
    <LayoutComponent>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-2xl font-bold text-gray-800">Mes projets</h2>
            <p className="mt-1 text-sm text-gray-600">
              Liste de tous vos projets (créés, assignés ou acceptés)
            </p>
          </div>
          
          {projets.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun projet disponible</h3>
              <p className="mt-1 text-sm text-gray-500">
                Vous n'avez pas encore de projets actifs.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {projets.map((projet) => (
                <div key={projet.id} className="px-6 py-5 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{projet.titre}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {projet.lieu}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {formatDateToFrench(projet.date_debut)} - {formatDateToFrench(projet.date_fin)}
                        </span>
                        {projet.entreprise_id && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Créé par vous
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{projet.description}</p>

                      <div className="mt-4 flex space-x-3">
                        <Link
                          to={`/projets/${projet.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Détails du projet
                        </Link>

                        <Link
                          to={`/creer/tache/${projet.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                          </svg>
                          Sous-traiter une tâche
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LayoutComponent>
  );
}