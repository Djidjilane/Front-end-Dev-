import { useEffect, useState } from "react";
import axios from "axios";

export default function ListePartenaires() {
  const [partenaires, setPartenaires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/partenaires")
      .then((res) => {
        setPartenaires(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement partenaires :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Chargement en cours...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🤝 Nos Partenaires Commerciaux</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partenaires.map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4 space-y-2">
            <img src={p.logo} alt={p.secteur} className="h-20 object-contain mb-2" />
            <h2 className="text-xl font-semibold text-gray-700">{p.secteur}</h2>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="text-sm text-gray-500">📍 {p.adresse}</p>
            <p className="text-sm text-gray-500">📞 {p.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
