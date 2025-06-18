import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MesOffresStage() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/entreprise/mesOffreStage', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        setOffres(response.data.offre);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des offres :', error);
        setErreur('Erreur lors du chargement');
        setLoading(false);
      }
    };

    fetchOffres();
  }, []);

  if (loading) return <p>Chargement en cours...</p>;
  if (erreur) return <p>{erreur}</p>;

  const voirCandidatures = (offreId) => {
    navigate(`/entreprise/candidatures/${offreId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mes Offres de Stage</h1>
      {offres.length === 0 ? (
        <p>Aucune offre trouvée.</p>
      ) : (
        <ul className="space-y-3">
          {offres.map((offre) => (
            <li key={offre.id} className="p-4 border rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{offre.domaine || 'Titre non défini'}</h2>
              <p>{offre.description || 'Pas de description'}</p>
              <p className="text-sm text-gray-500">Lieu : {offre.description || 'Inconnu'}</p>
              <p className="text-sm text-gray-500">Niveau : {offre.niveau || 'Inconnu'}</p>

              <p className="text-sm text-gray-500">Date limite : {offre.date_limite || 'Non précisée'}</p>
              <button
                onClick={() => voirCandidatures(offre.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Voir les candidatures
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
