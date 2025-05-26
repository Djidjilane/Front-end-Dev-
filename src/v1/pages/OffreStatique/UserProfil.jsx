import React from "react";

const ProfilUtilisateur = () => {
  // Données statiques simulées
  const utilisateur = {
    nom: "Fatou",
    prenom: "Ali",
    email: "fatou.ali@example.com",
    sexe: "Féminin",
    telephone: "+229 97 00 11 22",
    pays: "Bénin",
    langue: "Français",
    date_naissance: "2005-08-12",
    date_creation: "2024-11-01",
    photo_profil: null, // toujours null pour afficher l'image par défaut
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-yellow-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="/avatar.jpg"
            alt="Profil"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">{utilisateur.nom} {utilisateur.prenom}</h2>
            <p className="text-sm text-gray-500">{utilisateur.email}</p>
          </div>
          <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded">Modifier</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Champ label="Nom" value={utilisateur.nom} />
          <Champ label="Prénom" value={utilisateur.prenom} />
          <Champ label="Sexe" value={utilisateur.sexe} />
          <Champ label="Téléphone" value={utilisateur.telephone} />
          <Champ label="Pays" value={utilisateur.pays} />
          <Champ label="Langue" value={utilisateur.langue} />
          <Champ label="Date de Naissance" value={utilisateur.date_naissance} />
          <Champ
            label="Date d'inscription"
            value={new Date(utilisateur.date_creation).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
};

const Champ = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      disabled
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default ProfilUtilisateur;
