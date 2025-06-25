import { useEffect, useState } from "react";
import axios from "axios";

export default function ListeProjets() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
  axios.get('http://127.0.0.1:8000/api/projets')
    .then((response) => {
      const data = response.data.projets;

      if (Array.isArray(data)) {
        setProjets(data);
      } else if (typeof data === 'object' && data !== null) {
        setProjets([data]);
      } else {
        console.error("Réponse inattendue :", response.data);
        throw new Error("Format de réponse inattendu");
      }
    })
    .catch((error) => {
      console.error("Erreur de chargement :", error);
      setErreur("Erreur lors du chargement des projets.");
    })
    .finally(() => {
      setLoading(false); // ✅ on arrête le chargement UNIQUEMENT à la fin
    });
}, []);

      
     

    
  if (loading) return <p>Chargement...</p>;
  if (erreur) return <p className="text-red-600">{erreur}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Liste des projets</h2>
      {projets.map(projet => (
        <div key={projet.id} className="bg-white shadow rounded-xl p-5 space-y-2 border">
          <h3 className="text-xl font-semibold text-blue-700">{projet.titre}</h3>
          <p className="text-gray-600 text-sm italic">{projet.lieu}</p>
          <p className="text-gray-800 text-sm">{projet.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
            <p><strong>Date début :</strong> {projet.date_debut}</p>
            <p><strong>Date fin :</strong> {projet.date_fin}</p>
            
          </div>

         
        </div>
      ))}
    </div>
  );
}
