import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DetailsOffre() {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/offres/${id}`) // adapte l’URL selon ton API
      .then((response) => {
        setOffre(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setErreur("Impossible de charger l'offre.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-10">Chargement...</p>;
  if (erreur) return <p className="text-center text-red-600">{erreur}</p>;
  if (!offre) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-md rounded-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{offre.titre}</h1>
        <p className="text-gray-600">{offre.description}</p>
      </div>

      <div className="space-y-2 text-gray-700 text-sm">
        <p><span className="font-semibold">Entreprise :</span> {offre.entreprise}</p>
        <p><span className="font-semibold">Lieu :</span> {offre.lieu}</p>
        <p><span className="font-semibold">Date limite :</span> {offre.date_limite}</p>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Postuler à cette offre</h2>
        {/* Formulaire de candidature à ajouter ici */}
      </div>
    </div>
  );
}
