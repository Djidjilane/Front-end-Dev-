import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

export default function AssignerProjet() {
  const { id: projetId } = useParams();
  const [entreprises, setEntreprises] = useState([]);
  const [entrepriseId, setEntrepriseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [projet, setProjet] = useState(null); // ← pour stocker les détails du projet
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Charger les entreprises
    axiosInstance.get("/entreprises", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const data = res.data;
      setEntreprises(Array.isArray(data) ? data : data.data || []);
    })
    .catch(() => {
      setMessage("Erreur lors du chargement des entreprises.");
    });

    // Charger le projet
    axiosInstance.get(`/projet/${projetId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setProjet(res.data.data || null);
    })
    .catch(() => {
      setMessage("Erreur lors du chargement du projet.");
    })
    .finally(() => {
      setLoading(false);
    });

  }, [projetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entrepriseId) {
      alert("Veuillez sélectionner une entreprise.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.post("/projet/entrepriseProjet", {
        projet_id: projetId,
        entreprise_id: entrepriseId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("Projet assigné avec succès !");
      setTimeout(() => navigate("/client/projet"), 2000);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'assignation du projet.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        Assigner ce projet à une entreprise
      </h2>

      {projet && (
        <div className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold text-blue-700">{projet.titre}</h3>
        </div>
      )}

      {loading ? (
        <p>Chargement des entreprises...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Entreprise</label>
            <select
              value={entrepriseId}
              onChange={(e) => setEntrepriseId(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="">-- Sélectionnez une entreprise --</option>
              {entreprises.map((ent) => (
                <option key={ent.id} value={ent.id}>
                  {ent.entreprise?.nom_entreprise || ent.nom}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Assigner le projet
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-green-600 font-semibold text-center">{message}</p>}
    </div>
  );
}
