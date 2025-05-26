import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditUserProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/user/profile')
      .then(response => {
        setUser(response.data);
        setForm(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur chargement profil', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/user/profile', form)
      .then(() => alert('Profil mis à jour'))
      .catch(error => console.error('Erreur mise à jour', error));
  };

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur non trouvé</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Modifier le profil</h2>

      <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" className="border p-2 w-full" />
      <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" className="border p-2 w-full" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
      <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="Téléphone" className="border p-2 w-full" />

      {user.type === 'entreprise' && form.entreprise && (
        <>
          <input name="entreprise.nom_entreprise" value={form.entreprise.nom_entreprise} onChange={handleChange} placeholder="Nom Entreprise" className="border p-2 w-full" />
          <input name="entreprise.domaine" value={form.entreprise.domaine} onChange={handleChange} placeholder="Domaine" className="border p-2 w-full" />
        </>
      )}

      {user.type === 'ouvrier' && form.ouvrier && (
        <>
          <input name="ouvrier.metier" value={form.ouvrier.metier} onChange={handleChange} placeholder="Métier" className="border p-2 w-full" />
          <input name="ouvrier.diplome" value={form.ouvrier.diplome} onChange={handleChange} placeholder="Diplôme" className="border p-2 w-full" />
        </>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Enregistrer</button>
    </form>
  );
}