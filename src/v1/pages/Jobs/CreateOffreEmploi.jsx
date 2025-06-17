import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

export default function CreateOffreEmploi() {
  const [formData, setFormData] = useState({
    projet: "",
    description: "",
    lieu: "",
    date_limite: "",
   
  });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté.");
      navigate("/login");
      return;
    }
    const form = new FormData();
    form.append("projet", formData.projet);
    form.append("description", formData.description);
    form.append("lieu", formData.lieu);
    form.append("date_limite", formData.date_limite);
    

    try {
      const response = await axiosInstance.post("/entreprise/creer/offreEmploi", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"

        },
      });

      console.log("Offre créée avec succès :", response.data);
      setShowModal(true);
    } catch (error) {
      if (error.response) {
        console.error("Erreur backend :", error.response.data);
        alert(error.response.data.message || "Erreur lors de la création de l'offre.");
      } else if (error.request) {
        console.error("Aucune réponse du serveur :", error.request);
        alert("Aucune réponse du serveur.");
      } else {
        console.error("Erreur : ", error.message);
        alert("Erreur inattendue : " + error.message);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Créer une offre d’emploi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Titre du projet" name="projet" value={formData.projet} onChange={handleChange} />
        <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
        <Input label="Lieu" name="lieu" value={formData.lieu} onChange={handleChange} />
        <Input label="Date limite de candidature" name="date_limite" type="date" value={formData.date_limite} onChange={handleChange} />
        <button type="submit" className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Enregistrer l’offre
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Offre créée avec succès !</h3>
            <p className="text-sm text-gray-600 mb-4">Votre offre d’emploi a bien été enregistrée.</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/entreprise/offres");
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
