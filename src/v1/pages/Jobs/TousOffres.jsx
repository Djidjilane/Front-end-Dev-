import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Link } from "react-router-dom";

const TousOffre = () => {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axiosInstance.get("/offreEmploi");
        setOffres(response.data.offre);
      } catch (error) {
        console.error("Erreur lors du chargement des offres :", error);
        setErreur("❌ Une erreur est survenue lors du chargement des offres.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffres();
  }, []);

 

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-800">📄 Offres d'emploi</h2>
        {/*<Link
          to="/offres/nouveau"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow-md transition"
        >
          + Nouvelle Offre
        </Link>*/}
      </div>

      {loading && <p className="text-gray-600">⏳ Chargement des offres...</p>}
      {erreur && <p className="text-red-500">{erreur}</p>}

      {!loading && !erreur && offres.length === 0 && (
        <p className="text-gray-500">Aucune offre disponible pour le moment.</p>
      )}

      {!loading && !erreur && offres.length > 0 && (
        <div className="space-y-4">
          {offres.map((offre) => (
            <div key={offre.id} className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 rounded-lg shadow bg-white">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">{offre.titre}</h3>
                <p className="text-sm text-gray-700 mt-1">{offre.description}</p>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p>📍 Lieu : {offre.lieu}</p>
                  <p>📅 Publié le : {new Date(offre.created_at).toLocaleDateString()}</p>
                  <p>⏳ Date limite : {offre.date_limite}</p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex gap-3">
                <Link
                  to={`/formul/${offre.id}`}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded inline-block"
                >
                  ✅ Postuler
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TousOffre;
