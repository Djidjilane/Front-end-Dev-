import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

export default function VoirCandidaturesStage() {
  const { id } = useParams();
  const [offre, setOffre] = useState(null);
  const [candidatures, setCandidatures] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [modal, setModal] = useState({ show: false, action: "", idCandidature: null });
  const navigate = useNavigate();

  const fetchCandidatures = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/entreprise/candidatureParOffreStage/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffre(response.data.offre);
      setCandidatures(response.data.candidatures);
    } catch (error) {
      console.error("Erreur chargement candidatures :", error);
      setErreur("Impossible de charger les candidatures.");
    }
  };

  useEffect(() => { fetchCandidatures(); }, [id]);

  const confirmAction = (idCandidature, action) => {
    setModal({ show: true, action, idCandidature });
  };

  const handleAction = async () => {
    const { idCandidature, action } = modal;
    try {
      const token = localStorage.getItem("token");
      const url = `/entreprise/candidature_stage/${action}/${idCandidature}`;
      const response = await axiosInstance.patch(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(response.data.message);
      setCandidatures((prev) =>
        prev.map((c) =>
          c.id === idCandidature ? { ...c, statut: action === "accepter" ? "acceptee" : "rejettee" } : c
        )
      );
    } catch (error) {
      console.error(`Erreur ${action} :`, error);
      alert("Une erreur est survenue.");
    } finally {
      setModal({ show: false, action: "", idCandidature: null });
    }
  };

  if (erreur) return <p className="text-red-600">{erreur}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Candidatures pour : {offre}</h1>

      {candidatures.length === 0 ? (
        <p>Aucune candidature reçue pour cette offre.</p>
      ) : (
        <ul className="space-y-4">
          {candidatures.map((candidat, index) => (
            <li key={index} className="p-4 border rounded-md shadow-sm bg-white">
              <p><strong>Nom :</strong> {candidat.candidat_nom}</p>
              <p><strong>Prénom :</strong> {candidat.candidat_prenom}</p>
              <p><strong>Date :</strong> {new Date(candidat.date_candidature).toLocaleString()}</p>
               <p><strong>Statut :</strong> <span className="uppercase">{candidat.statut || "en attente"}</span></p>

              <div className="mt-3 space-x-2">
                <button
                  onClick={() => confirmAction(candidat.id, "accepter")}
                  disabled={["acceptee", "rejettee"].includes(candidat.statut)}
                  className={`px-4 py-2 rounded text-white ${
                    candidat.statut === "acceptee" || candidat.statut === "rejettee"
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Accepter
                </button>

                <button
                  onClick={() => confirmAction(candidat.id, "rejeter")}
                  disabled={["acceptee", "rejettee"].includes(candidat.statut)}
                  className={`px-4 py-2 rounded text-white ${
                    candidat.statut === "rejettee" || candidat.statut === "acceptee"
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Refuser
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* MODAL */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p>Voulez-vous vraiment <strong>{modal.action === "accepter" ? "accepter" : "refuser"}</strong> cette candidature ?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setModal({ show: false, action: "", idCandidature: null })}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleAction}
                className={`px-4 py-2 rounded text-white ${
                  modal.action === "accepter" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
