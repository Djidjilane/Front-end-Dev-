import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MesCandidaturesOuvrier() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    {/** 
    if (!token) {
      // NE PAS appeler navigate directement → on le décale après le rendu
      setTimeout(() => {
        navigate('/login', { state: { from: location.pathname } });
      }, 0);
      return;
    }
*/}
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/ouvrier/mesCandidatures', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCandidatures(response.data.candidatures);
      } catch (error) {
        console.error("Erreur lors du chargement des candidatures :", error);

        if (error.response && [401, 403].includes(error.response.status)) {
          localStorage.removeItem('auth_token');
          setTimeout(() => {
            navigate('/login', { state: { from: location.pathname } });
          }, 0);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, location.pathname]); // ✅ pas de token ici

  if (loading) return <p>Chargement des candidatures...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Mes Candidatures</h2>
      {candidatures.length === 0 ? (
        <p className="text-gray-600 text-center">Aucune candidature trouvée.</p>
      ) : (
        <ul className="space-y-4">
          {candidatures.map(c => (
            <li key={c.id} className="p-4 border rounded-lg shadow-sm bg-white">
              <p><strong>Offre :</strong> {c.offre?.projet || 'Offre supprimée'}</p>
              <p><strong>Statut :</strong> {c.statut || 'Non précisé'}</p>
              <p><strong>Date :</strong> {new Date(c.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
