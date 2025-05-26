import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/user/profile')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur de chargement du profil', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur non trouvé</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Profil de l'utilisateur</h2>
      <p><strong>Nom:</strong> {user.nom}</p>
      <p><strong>Prénom:</strong> {user.prenom}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Téléphone:</strong> {user.telephone}</p>
      <p><strong>Type:</strong> {user.type}</p>

      {user.type === 'entreprise' && user.entreprise && (
        <div className="mt-4">
          <h3 className="font-semibold">Entreprise</h3>
          <p><strong>Nom:</strong> {user.entreprise.nom_entreprise}</p>
          <p><strong>Domaine:</strong> {user.entreprise.domaine}</p>
          <p><strong>IFU:</strong> {user.entreprise.IFU}</p>
          <p><strong>RCCM:</strong> {user.entreprise.RCCM}</p>
        </div>
      )}

      {user.type === 'ouvrier' && user.ouvrier && (
        <div className="mt-4">
          <h3 className="font-semibold">Ouvrier</h3>
          <p><strong>Métier:</strong> {user.ouvrier.metier}</p>
          <p><strong>CV:</strong> {user.ouvrier.cv}</p>
          <p><strong>Diplôme:</strong> {user.ouvrier.diplome}</p>
        </div>
      )}

      {/* Ajouter autres types ici... */}
    </div>
  );
}