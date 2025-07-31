import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { FiFilter, FiEdit2, FiEye, FiUsers, FiClock, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";

export default function MesTaches() {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState("toutes");
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer les tâches de l'entreprise
  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/entreprise/mesTaches", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        setTaches(response.data);
        
        // Surligner la tâche nouvellement créée
        if (location.state?.highlightedTask) {
          setTimeout(() => {
            const element = document.getElementById(`tache-${location.state.highlightedTask}`);
            element?.scrollIntoView({ behavior: "smooth", block: "center" });
            element?.classList.add("animate-pulse", "bg-yellow-50");
            setTimeout(() => element?.classList.remove("animate-pulse", "bg-yellow-50"), 3000);
          }, 500);
        }
      } catch (error) {
        toast.error("Erreur lors du chargement des tâches");
      } finally {
        setLoading(false);
      }
    };

    fetchTaches();

    // Afficher notification si redirection après création
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

  // Filtrer les tâches
  const tachesFiltrees = taches.filter(tache => {
    if (filtre === "toutes") return true;
    if (filtre === "offres") return tache.mode === "appel" && !tache.entreprise_sous_traitante_id;
    if (filtre === "assignees") return tache.entreprise_sous_traitante_id;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mes tâches de sous-traitance</h1>
        <button 
          onClick={() => navigate("/entreprise/projet")}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center gap-2"
        >
          <FiEdit2 /> Nouvelle tâche
        </button>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
        <button 
          onClick={() => setFiltre("toutes")}
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${filtre === "toutes" ? "bg-yellow-600 text-white" : "bg-white border"}`}
        >
          <FiFilter /> Toutes ({taches.length})
        </button>
        <button 
          onClick={() => setFiltre("offres")}
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${filtre === "offres" ? "bg-yellow-600 text-white" : "bg-white border"}`}
        >
          <FiUsers /> Offres publiées ({taches.filter(t => t.mode === "appel" && !t.entreprise_sous_traitante_id).length})
        </button>
        <button 
          onClick={() => setFiltre("assignees")}
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${filtre === "assignees" ? "bg-yellow-600 text-white" : "bg-white border"}`}
        >
          <FiCheckCircle /> Assignées ({taches.filter(t => t.entreprise_sous_traitante_id).length})
        </button>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-600"></div>
        </div>
      ) : tachesFiltrees.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <FiClock className="mx-auto text-4xl text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">
            {filtre === "toutes" 
              ? "Aucune tâche créée" 
              : filtre === "offres" 
                ? "Aucune offre publiée" 
                : "Aucune tâche assignée"}
          </h3>
          <button 
            onClick={() => navigate("/sous-traitance/creer")}
            className="mt-4 text-yellow-600 hover:underline"
          >
            Créer votre première tâche
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tachesFiltrees.map(tache => (
            <div 
              key={tache.id}
              id={`tache-${tache.id}`}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:border-yellow-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{tache.tache}</h3>
                  <p className="text-gray-600 text-sm mt-1">{tache.description}</p>
                  
                  <div className="flex gap-2 mt-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tache.entreprise_sous_traitante_id 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {tache.entreprise_sous_traitante_id ? "Assignée" : "En attente"}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                      {tache.mode === "appel" ? "Appel d'offres" : "Directe"}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(tache.date_debut).toLocaleDateString('fr-FR')} - {new Date(tache.date_fin).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-sm mt-1">{tache.projet?.titre}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                {tache.mode === "appel" && !tache.entreprise_sous_traitante_id && (
                  <button 
                    onClick={() => navigate(`/tache/${tache.id}/candidatures`)}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center gap-1"
                  >
                    <FiEye /> Voir candidatures
                  </button>
                )}
                <button 
                  onClick={() => navigate(`/sous-traitance/editer/${tache.id}`)}
                  className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 flex items-center gap-1"
                >
                  <FiEdit2 /> Modifier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}