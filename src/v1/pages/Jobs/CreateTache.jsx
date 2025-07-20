import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

export default function CreerTacheSousTraitance() {
  const { projetId } = useParams();
  const [projet, setProjet] = useState(null);
  const [formData, setFormData] = useState({
    tache: "",
    date_debut: "",
    date_fin: "",
    mode: "appel",
    entreprise_sous_traitante_id: null
  });
  const [entreprises, setEntreprises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les détails du projet
        if (projetId) {
          const token = localStorage.getItem("token");

          const projetResponse = await axiosInstance.get(`/projet/detail/projet/${projetId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setProjet(projetResponse.data.data);
        }


        // Récupérer la liste des entreprises
        const entreprisesResponse = await axiosInstance.get("/entreprises");
        setEntreprises(entreprisesResponse.data.data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projetId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projet) {
      alert("Projet non chargé");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = {
        ...formData,
        projet_id: projet.id,
        entreprise_maitre_id: projet.entreprise_id
      };

      await axiosInstance.post("/entreprise/creer/tache", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowModal(true);
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Erreur lors de la création");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!projet) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center text-red-500">Projet introuvable</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-500">
        Créer une tâche de sous-traitance pour le projet de <span className="text-blue-500">{projet.titre}</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Description de la tâche" 
          name="tache" 
          value={formData.tache} 
          onChange={handleChange} 
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Date de début" 
            name="date_debut" 
            type="date" 
            value={formData.date_debut} 
            onChange={handleChange} 
          />
          <Input 
            label="Date de fin" 
            name="date_fin" 
            type="date" 
            value={formData.date_fin} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <SelectInput 
          label="Mode d'attribution"
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          options={[
            { value: "appel", label: "Appel d'offres" },
            { value: "assignation", label: "Assignation directe" }
          ]}
          required
        />
        
        <SelectInput 
          label="Sous-traitant (optionnel)"
          name="entreprise_sous_traitante_id"
          value={formData.entreprise_sous_traitante_id || ""}
          onChange={handleChange}
          options={entreprises.map(e => ({
            value: e.id,
            label: e.nom
          }))}
        />
        
        <button 
          type="submit" 
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Création en cours..." : "Créer la tâche"}
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Tâche créée avec succès !</h3>
            <p className="text-sm text-gray-600 mb-4">La tâche a bien été enregistrée.</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate(`/mesTaches`);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Composants Input et SelectInput inchangés
function Input({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-2 px-3 py-2 rounded-md"
      />
    </div>
  );
}

function SelectInput({ label, name, value, onChange, options, required = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-2 px-3 py-2 rounded-md"
      >
        <option value="">-- Sélectionner --</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}