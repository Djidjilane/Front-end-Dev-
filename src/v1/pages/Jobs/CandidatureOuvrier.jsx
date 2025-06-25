import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MesCandidaturesOuvrier() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false); // Pour éviter un rendu prématuré

  // Exemple simple : récupérer un token dans localStorage (à adapter selon ton système)
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirection forcée
    } else {
      setAuthChecked(true); // On peut afficher le formulaire
    }
  }, [navigate]);
{/** 
  useEffect(() => {
    if (!token) {
      // Pas connecté, on redirige vers login avec retour sur cette page après connexion
      navigate('/login', {/*{ state: { from: location.pathname } });
      return;
    }*/}

    // Configure axios pour envoyer le token dans le header Authorization
    axios.get('/api/ouvrier/mesCandidatures', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setCandidatures(response.data.candidatures);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des candidatures :", error);
        //alert ("Erreur lors du chargement des candidatures");
        // Si erreur 401 ou 403 =  autorisé, on déconnecte et redirige vers login
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('auth_token');
          navigate('/login', { state: { from: location.pathname } });
        } else {
          setLoading(false);
        }
      });
  // [token, navigate, location]);

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
              <p><strong>Offre :</strong> {c.id || 'Offre supprimée'}</p>
              <p><strong>Statut :</strong> {c.statut || 'Non précisé'}</p>
              <p><strong>Date :</strong> {new Date(c.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
