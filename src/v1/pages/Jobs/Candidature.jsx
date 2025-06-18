import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

export default function VoirCandidatures() {
  const { id } = useParams(); // ID de l'offre
  const [offre, setOffre] = useState(null);
  const [candidatures, setCandidatures] = useState([]);
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/entreprise/candidatureParOffreEmploi/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOffre(response.data.offre);
        setCandidatures(response.data.candidatures);
      } catch (error) {
        console.error("Erreur : ", error);
        setErreur("Impossible de charger les candidatures.");
      }
    };

    fetchCandidatures();
  }, [id]);

  if (erreur) return <p className="text-red-600">{erreur}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Candidatures pour : {offre}</h1>

      {candidatures.length === 0 ? (
        <p>Aucune candidature reçue pour cette offre.</p>
      ) : (
        <ul className="space-y-4">
          {candidatures.map((candidat, index) => (
            <li key={index} className="p-4 border rounded-md shadow-sm">
              <p><strong>Nom :</strong> {candidat.candidat_nom}</p>
              <p><strong>Prénom :</strong> {candidat.candidat_prenom}</p>
              <p><strong>Date :</strong> {new Date(candidat.date_candidature).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
        Retour
      </button>
    </div>
  );
}
