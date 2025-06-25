import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import LayoutComponent from "../../layouts/LayoutComponent";

export default function ProjetsOuverts() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axiosInstance
      .get("/projet/projets/ouverts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Réponse complète :", res.data);
        const data = res.data.projets_ouverts; 
        setProjets(Array.isArray(data) ? data : []);
      })
      .catch((erro) => {
        console.error("Erreur API :", erro.response || erro.message || erro);
        setErreur("Impossible de charger les projets ouverts.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Chargement des projets...</div>;
  if (erreur) return <div className="p-6 text-red-600 text-center">{erreur}</div>;

  return (
    <LayoutComponent>
      <div className="bg-dark max-w-5xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-6 text-yellow-500">Les projets ouverts</h2>

        {projets.length === 0 ? (
          <p className="text-center text-gray-500">Aucun projet trouvé.</p>
        ) : (
          <div className="grid gap-4">
            {projets.map((projet) => (
              <div key={projet.id} className="bg-white shadow p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-1">{projet.titre}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Lieu : {projet.lieu} | Début : {projet.date_debut} | Fin : {projet.date_fin}
                </p>
                <p className="text-sm text-gray-500 mb-2">{projet.description}</p>

                {/* Bouton postuler */}
                <Link
                  to={`/postuler/projet/${projet.id}`}
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-2 text-sm"
                >
                  Postuler à ce projet
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutComponent>
  );
}
