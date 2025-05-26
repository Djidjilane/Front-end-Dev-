import { useEffect, useState } from "react";
import axios from "axios";

export default function ListeProjets() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    axios.get("http://192.168.1.20:8000/api/projets")
      .then(response => {
        console.log("Réponse reçue:", response.data);
  
        //  Utilise la bonne clé ici
        if (Array.isArray(response.data.projets)) {
          setProjets(response.data.projets);
        } else {
          throw new Error("Format de réponse inattendu");
        }
  
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur de chargement :", error);
        setErreur("Erreur de chargement : " + error.message);
        setLoading(false);
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
            {/*<p><strong>Budget :</strong> {projet.budget} FCFA</p>
            <p><strong>État :</strong> {projet.etat}</p>*/}
          </div>

         {/* {projet.pieces?.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-sm">📎 Pièces à fournir :</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {projet.pieces.map((piece, i) => (
                  <li key={i}>{piece}</li>
                ))}
              </ul>
            </div>
          )}

          {projet.equipe?.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-sm">👥 Équipe :</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {projet.equipe.map((membre, i) => (
                  <li key={i}>{membre.nom} ({membre.role})</li>
                ))}
              </ul>
            </div>
          )}*/}
        </div>
      ))}
    </div>
  );
}
