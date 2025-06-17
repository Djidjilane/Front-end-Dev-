import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

export default function CreerProjet() {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    lieu: "",
    date_debut: "",
    date_fin: "",
    fichiers: []
  });

  const [userRole, setUserRole] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role"); // récupéré côté frontend lors de la connexion
    setUserRole(role);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        fichiers: Array.from(files)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté pour créer un projet.");
      navigate("/login");
      return;
    }

    const form = new FormData();
    form.append("titre", formData.titre);
    form.append("description", formData.description);
    form.append("lieu", formData.lieu);
    form.append("date_debut", formData.date_debut);
    form.append("date_fin", formData.date_fin);
    formData.fichiers.forEach((fichier) => {
      form.append("fichiers[]", fichier);
    });

    try {
      const response = await axiosInstance.post("/projet/creer", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      // axios parse automatiquement la réponse JSON
      console.log("Projet créé avec succès :", response.data);
      setShowModal(true);
    } catch (error) {
      if (error.response) {
        // Erreur renvoyée par le backend (ex: 401, 400, 500)
        console.error("Erreur backend :", error.response.data);
        alert(error.response.data.message || "Erreur lors de la création du projet.");
      } else if (error.request) {
        // Pas de réponse reçue
        console.error("Aucune réponse du serveur :", error.request);
        alert("Aucune réponse du serveur, veuillez réessayer plus tard.");
      } else {
        // Erreur côté client
        console.error("Erreur lors de la requête :", error.message);
        alert("Erreur inattendue : " + error.message);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Créer un projet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Titre du projet" name="titre" value={formData.titre} onChange={handleChange} />
        <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
        <Input label="Lieu d’exécution" name="lieu" value={formData.lieu} onChange={handleChange} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Date de début" name="date_debut" type="date" value={formData.date_debut} onChange={handleChange} />
          <Input label="Date de fin" name="date_fin" type="date" value={formData.date_fin} onChange={handleChange} />
        </div>
        <FileInput label="Fichiers à joindre" name="fichiers" onChange={handleChange} multiple />
        <button type="submit" className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Enregistrer
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Projet créé avec succès !</h3>
            <p className="text-sm text-gray-600 mb-4">Votre projet a bien été enregistré.</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/projet/liste");
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

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded-md"
      />
    </div>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded-md"
        rows={4}
      ></textarea>
    </div>
  );
}

function FileInput({ label, name, onChange, multiple = false }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="file"
        name={name}
        onChange={onChange}
        multiple={multiple}
        className="w-full border px-3 py-2 rounded-md"
      />
    </div>
  );
}
