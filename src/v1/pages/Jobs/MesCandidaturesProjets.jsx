import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import LayoutComponent from "../../layouts/LayoutComponent";

export default function MesCandidaturesProjets() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  
  const fetchCandidatures = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get("/projet/mesCandidatures/Projets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.candidatures;
      setCandidatures(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
      setErreur("Impossible de charger vos candidatures.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

  if (loading) return <p className="text-center p-4">Chargement...</p>;
  if (erreur) return <p className="text-center text-red-600 p-4">{erreur}</p>;

  return (
    <LayoutComponent>
      <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg mt-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Mes candidatures à des projets</h2>

        {candidatures.length === 0 ? (
          <p className="text-center text-gray-500">Aucune candidature soumise pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {candidatures.map((candidature) => (
              <div key={candidature.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold text-sky-700">
                  Projet : {candidature.projet?.titre || "Inconnu"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Lieu : {candidature.projet?.lieu || "N/A"} <br />
                  Début : {candidature.projet?.date_debut || "N/A"} - Fin : {candidature.projet?.date_fin || "N/A"}
                </p>
                <p className="text-gray-700">
                  Statut :{" "}
                  <span
                    className={`font-semibold bg-gray-300 p-1 rounded-lg ${
                      candidature.statut === "accepte"
                        ? "text-green-600"
                        : candidature.statut === "refuse"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {candidature.statut}
                  </span>
                </p>

                <div className="mt-2">
                  <a
                    href={`http://localhost:8000/${candidature.motivation}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    Voir la lettre de motivation
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutComponent>
  );
}
