import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const TousOffre = () => {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  const isConnected = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axiosInstance.get("/offreEmploi");
        setOffres(response.data.offre);
      } catch (error) {
        console.error("Erreur :", error);
        setErreur("❌ Impossible de charger les offres.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffres();
  }, []);

  const handleClick = (id) => {
    if (!isConnected) {
      navigate("/login", { state: { from: `/formul/${id}` } });
    } else {
      navigate(`/formul/${id}`);
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 Offres d'emploi</h2>

      {loading && <p className="text-gray-600">Chargement...</p>}
      {erreur && <p className="text-red-500">{erreur}</p>}

      {!loading && !erreur && offres.length === 0 && (
        <p className="text-gray-500 italic">Aucune offre pour le moment.</p>
      )}

      <div className="space-y-4">
        {offres.map((offre) => (
          <div
            key={offre.id}
            className="border border-gray-200 p-4 rounded-md bg-white shadow-sm hover:shadow transition"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-medium text-blue-700">{offre.titre}</h3>
              <p className="text-sm text-gray-700">{offre.description}</p>
              <div className="text-xs text-gray-500">
                <span>📍 {offre.lieu} | </span>
                <span>📅 {new Date(offre.created_at).toLocaleDateString()} | </span>
                <span>⏳ Limite : {offre.date_limite}</span>
              </div>
            </div>

            <div className="mt-3">
              <button
                onClick={() => handleClick(offre.id)}
                className="text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isConnected ? "Postuler" : "Se connecter pour postuler"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TousOffre;
