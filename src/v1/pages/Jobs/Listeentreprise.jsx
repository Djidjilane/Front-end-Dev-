import { useEffect, useState } from 'react';
import { BuildingOffice2Icon, MapPinIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import axiosInstance from "../../../api/axiosInstance";

const ListeEntreprises = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    axiosInstance.get('/entreprises')
      .then((response) => {
        console.log("Réponse brute :", response.data);  
        const data = response.data;

        // Vérifie si la réponse est bien un tableau
        if (Array.isArray(data)) {
          setEntreprises(data);
        } else if (Array.isArray(data.entreprises)) {
          // Support d'une réponse enveloppée { entreprises: [...] }
          setEntreprises(data.entreprises);
        }else if (Array.isArray(data.data)) {
          // Support d'une réponse enveloppée { entreprises: [...] }
          setEntreprises(data.data);
        }
         else {
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
    <div className="p-6 bg-gray-200">
      <div className="flex items-center gap-3 mb-2 mb-4">
        <BuildingOffice2Icon className="h-20 w-10 text-blue-500" />
        <h1 className="text-2xl font-bold text-blue-600  ">Liste des Entreprises</h1>
      </div>
      
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 ">
        {entreprises.map((entreprise) => (
          <div
            key={entreprise.id}
            className="w-full max-w-2xl mx-auto bg-white shadow rounded-lg p-4 hover:shadow-md transition flex flex-col items-center text-center "
          >
            <div className=" flex items-center  gap-3 mb-2">
              
                {entreprise.entreprise?.logo ? (
                  <img
                    src={`http://localhost:8000/${entreprise.entreprise.logo}`}
                    alt="Logo entreprise"
                    className="h-16 w-10O% rounded object-cover border border-gray-300"
                  />
                ) : (
                <BuildingOffice2Icon className="h-10 w-10 text-blue-500" />
                )}
             
              <h2 className="text-2xl font-bold text-blue-900">
                {entreprise.nom || "Nom inconnu"}
              </h2>
            </div>
            <p className="text-md text-gray-600 font-bold flex items-center gap-1">
              <MapPinIcon className="h-4 w-4 text-gray-400 "  />
              IFU : {entreprise.entreprise?.IFU || "IFU non renseigné"}
            </p>
            <p className="text-md text-gray-500 font-bold flex items-center gap-1 mt-1">
              <MapPinIcon className="h-4 w-4 text-gray-400 " />
               RCCM : {entreprise.entreprise?.RCCM || "Non renseigné"}
            </p>

            <button className="mt-4 bg-cyan-800 rounded-full p-1 hover:bg-sky-500 hover:translate-y-1">
              <Link
                to={`/projet/${entreprise.id}`}
                className="text-white  text-md font-bold"
              >
                Voir le profil
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeEntreprises;
