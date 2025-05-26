import { BuildingOffice2Icon, MapPinIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // si tu utilises React Router

const ListeEntreprises = () => {
  const entreprises = [
    {
      id: 1,
      nom: 'BTP Services Plus',
      adresse: 'Cotonou, Bénin',
      secteur: 'Construction',
    },
    {
      id: 2,
      nom: 'Élite Béton',
      adresse: 'Parakou, Bénin',
      secteur: 'Béton & Matériaux',
    },
    {
      id: 3,
      nom: 'Génie Civil Pro',
      adresse: 'Abomey-Calavi',
      secteur: 'Génie Civil',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Liste des Entreprises</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entreprises.map((entreprise) => (
          <div
            key={entreprise.id}
            className="bg-white shadow rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <BuildingOffice2Icon className="h-6 w-6 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-700">{entreprise.nom}</h2>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPinIcon className="h-4 w-4 text-gray-400" />
              {entreprise.adresse}
            </p>
            <p className="text-sm text-gray-500 mt-1">Secteur : {entreprise.secteur}</p>

            <div className="mt-4">
              <Link
                to={`/entreprises/${entreprise.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Voir le profil
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeEntreprises;
