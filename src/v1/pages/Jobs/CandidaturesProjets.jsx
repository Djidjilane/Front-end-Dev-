import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

export default function CandidaturesProjets() {
  const { id: projetId } = useParams();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const fetchCandidatures = () => {
    const token = localStorage.getItem("token");

    axiosInstance
      .get(`/projet/candidatureParProjet/${projetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.candidatures;
        setCandidatures(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setErreur("Impossible de charger les candidatures.");
      })
      .finally(() => setLoading(false));
  };

  const handleDecision = async (candidatureId, action) => {
    const token = localStorage.getItem("token");
    const route =
      action === "accepter"
        ? `/projet/candidature_projet/accepter/${candidatureId}`
        : `/projet/candidature_projet/rejeter/${candidatureId}`;

    try {
      await axiosInstance.patch(route, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(`Candidature ${action === "accepter" ? "acceptée" : "refusée"} avec succès.`);
      fetchCandidatures(); // Recharge les candidatures
    } catch (error) {
      console.error("Erreur lors de la décision :", error);
      setMessage("Une erreur est survenue.");
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Candidatures pour ce projet</h2>

      {loading && <p className="text-center">Chargement...</p>}
      {erreur && <p className="text-center text-red-600">{erreur}</p>}
      {message && <p className="text-center text-green-600 font-semibold mb-4">{message}</p>}

      {!loading && candidatures.length === 0 ? (
        <p className="text-center text-gray-500">Aucune candidature reçue pour ce projet.</p>
      ) : (
        candidatures.map((candidature) => {
            console.log("Candidature reçue :", candidature);
            return(
                <div key={candidature.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-bold text-sky-700">
              Entreprise : {candidature.entreprise.nom_entreprise || "Inconnu"}
            </h3>

            <p className="text-gray-700 mb-2">
              Motivation :{" "}
              <a
                href={`http://localhost:8000/${candidature.motivation}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Voir le document
              </a>
            </p>

            {candidature.statut === "en_attente" && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleDecision(candidature.id, "accepter")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleDecision(candidature.id, "refuser")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Refuser
                </button>
              </div>
            )}

            {candidature?.statut === "accepte" && (
              <p className="text-green-600 font-semibold mt-2">Candidature acceptée</p>
            )}

            {candidature.statut === "refuse" && (
              <p className="text-red-600 font-semibold mt-2">Candidature refusée</p>
            )}
          </div>
            );
          
        })
      )}
    </div>
  );
}
