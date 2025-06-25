import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

export default function ProjetsAssignes() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const fetchProjets = () => {
    const token = localStorage.getItem("token");

    axiosInstance
      .get("/projet/projets/assignes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setProjets(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setErreur("Impossible de charger les projets assignés.");
      })
      .finally(() => setLoading(false));
  };

  const handleDecision = async (projetId, action) => {
    const token = localStorage.getItem("token");
    const route =
      action === "accepter"
        ? `/projet/accepterProjet/${projetId}`
        : `/projet/refuserProjet/${projetId}`;

    try {
      await axiosInstance.patch(route, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(`Projet ${action === "accepter" ? "accepté" : "refusé"} avec succès.`);
      fetchProjets(); // Recharge les projets
    } catch (error) {
      console.error("Erreur lors de la décision :", error);
      setMessage("Une erreur est survenue.");
    }
  };

  useEffect(() => {
    fetchProjets();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Projets assignés</h2>

      {loading && <p className="text-center">Chargement des projets...</p>}
      {erreur && <p className="text-center text-red-600">{erreur}</p>}
      {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}

      {!loading && projets.length === 0 ? (
        <p className="text-center text-gray-500">Aucun projet assigné pour le moment.</p>
      ) : (
        projets.map((projet) => (
          <div key={projet.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-bold text-blue-700">{projet.projet.titre}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {projet.projet.lieu} | {projet.projet.date_debut} - {projet.projet.date_fin}
            </p>
            <p className="text-gray-700 mb-2">{projet.projet.description}</p>

            {projet?.statut === "en_attente" && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleDecision(projet.id, "accepter")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleDecision(projet.id, "refuser")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Refuser
                </button>
              </div>
            )}

            {projet?.statut === "accepte" && (
              <p className="text-green-600 font-semibold mt-2">Projet accepté</p>
            )}

            {projet?.statut === "refuse" && (
              <p className="text-red-600 font-semibold mt-2">Projet refusé</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
