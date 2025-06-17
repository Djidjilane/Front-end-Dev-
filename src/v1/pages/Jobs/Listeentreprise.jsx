import { useEffect, useState } from 'react';
import { BuildingOffice2Icon, MapPinIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import axiosInstance from "../../../api/axiosInstance";

const ListeEntreprises = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    axiosInstance.get('/list')
      .then((response) => {
        const data = response.data;

        // Vérifie si la réponse est bien un tableau
        if (Array.isArray(data)) {
          setEntreprises(data);
        } else if (Array.isArray(data.entreprises)) {
          // Support d'une réponse enveloppée { entreprises: [...] }
          setEntreprises(data.entreprises);
        } else {
          throw new Error("Format de données inattendu.");
        }
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des entreprises :', error);
        setErreur("Impossible de charger les entreprises.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Chargement en cours...</div>;
  if (erreur) return <div className="p-6 text-red-600 text-center">{erreur}</div>;
  if (entreprises.length === 0) return <div className="p-6 text-center text-gray-500">Aucune entreprise trouvée.</div>;

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
              <h2 className="text-lg font-semibold text-gray-700">
                {entreprise.nom_entreprise || "Nom inconnu"}
              </h2>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPinIcon className="h-4 w-4 text-gray-400" />
              {entreprise.IFU || "IFU non renseigné"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              RCCM : {entreprise.RCCM || "Non renseigné"}
            </p>

            <div className="mt-4">
              <Link
                to={`/projet/${entreprise.id}`}
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
