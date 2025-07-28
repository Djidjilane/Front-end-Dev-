import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';

export default function MesCandidatures() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('ouvrier/MesCandidatures')
      .then(response => {
        setCandidatures(response.data.candidatures);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError("Erreur lors du chargement des candidatures.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Mes candidatures</h2>
      {candidatures.length === 0 ? (
        <p>Vous n'avez soumis aucune candidature.</p>
      ) : (
        <ul className="list-group">
          {candidatures.map((candidature, index) => (
            <li key={index} className="list-group-item">
              <strong>ID :</strong> {candidature.id}<br />
              <strong>CV :</strong> {candidature.cv}<br />
              <strong>CIP :</strong> {candidature.cip}<br />
              <strong>Diplôme :</strong> {candidature.diplome}<br />
              <strong>ID Offre :</strong> {candidature.offre_emploi_id}<br />
              <strong>Statut :</strong> {candidature.statut}<br />
              <strong>Date :</strong> {new Date(candidature.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
