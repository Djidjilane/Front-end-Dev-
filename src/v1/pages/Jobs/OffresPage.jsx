import { useEffect, useState } from "react";
import axios from "axios";

export default function ListeOffres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/offres")
      .then(res => setOffres(res.data))
      .catch(err => console.error("Erreur de chargement des offres :", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-700">Chargement des offres...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Offres d'emploi disponibles</h1>

      <div className="grid gap-6">
        {offres.map((offre) => (
          <div key={offre.id} className="border rounded-2xl p-6 shadow hover:shadow-md transition bg-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">{offre.titre}</h2>
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{offre.type_contrat}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Entreprise : <strong>{offre.entreprise}</strong>
            </p>
            <p className="text-gray-700 mb-3">
              {offre.description.slice(0, 150)}...
            </p>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>📍 {offre.lieu}</span>
              <span>⏳ Jusqu’au : {new Date(offre.date_limite).toLocaleDateString()}</span>
            </div>

            <div className="mt-4">
              <a
                href={`/offres/${offre.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Voir les détails
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
