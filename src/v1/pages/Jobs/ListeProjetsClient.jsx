import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import LayoutComponent from "../../layouts/LayoutComponent";

// Fonction utilitaire pour formater les dates
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

export default function ListeProjetsClient() {
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

    axiosInstance.get("/projet/client/projets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("Réponse complète :", res.data); 
      const data = res.data.data;   
      setProjets(Array.isArray(data) ? data : []);
    })
    .catch((erro) => {
        console.error("Erreur API :", erro.response || erro.message || erro);
        setErreur("Impossible de charger les projets.");
    })
    .finally(() => {
      setLoading(false);  
    });
  }, []);
  
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
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <h2 className="text-2xl font-bold text-gray-800">Mes projets</h2>
            <p className="mt-1 text-sm text-gray-600">Liste de tous vos projets</p>
          </div>
          
          {projets.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun projet</h3>
              <p className="mt-1 text-sm text-gray-500">Vous n'avez pas encore créé de projet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {projets.map((projet) => {
                const entrepriseProjet = projet.entreprise_projet;
                const entreprise = entrepriseProjet?.entreprise;

                return (
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
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{projet.description}</p>

                        {entrepriseProjet ? (
                          <div className="mt-2">
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                              <span className="mr-1">Assigné à :</span>
                              <span className="font-medium text-indigo-600">{entreprise?.nom_entreprise || "Entreprise inconnue"}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 mr-1">Statut :</span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                entrepriseProjet.statut === "accepte" ? "bg-green-100 text-green-800" :
                                entrepriseProjet.statut === "refuse" ? "bg-red-100 text-red-800" :
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                                {entrepriseProjet.statut}
                              </span>
                            </div>

                            {entrepriseProjet.statut === "refuse" && (
                              <div className="mt-3">
                                <Link
                                  to={`/assigner/projet/${projet.id}`}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                >
                                  Assigner à une autre entreprise
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-4 flex space-x-3">
                            <Link
                              to={`/candidatures/projet/${projet.id}`}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                              </svg>
                              Voir candidatures
                            </Link>

                            <Link
                              to={`/assigner/projet/${projet.id}`}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                              Assigner à une entreprise
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </LayoutComponent>
  );
}