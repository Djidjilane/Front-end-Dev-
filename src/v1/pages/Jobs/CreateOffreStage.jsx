import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

export default function CreerOffreStage() {
  const [formData, setFormData] = useState({
    domaine: "",
    entreprise: "",
    lieu: "",
    niveau: "",
    description: "",
    date_limite: ""
  });
    const [userRole, setUserRole] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const role = localStorage.getItem("role"); // stocké côté frontend lors de la connexion
      setUserRole(role);
    }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token =localStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté pour créer un domaine.");
      navigate("/login");
      return;
    }
//
   /* if (!["entreprise"].includes(userRole)) {
      alert("Seuls les clients et entreprises peuvent créer un domaine.");
      return;
    }*/
    const form = new FormData();    
    form.append("domaine", formData.domaine);
   // form.append("lieu", formData.lieu);
    form.append("niveau", formData.niveau);
    form.append("description", formData.description);
    form.append("date_limite", formData.date_limite);
   // form.append("pieces", formData.pieces);

//


try{

    const response = await axiosInstance.post("/entreprise/creer/offreStage", form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer une offre de stage</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField label="Domaine" name="domaine" value={formData.domaine} onChange={handleChange} />
        {/*<InputField label="Lieu" name="lieu" value={formData.lieu} onChange={handleChange} />*/}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niveau requis</label>
          <select
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner un niveau</option>
            <option value="Licence">Licence</option>
            <option value="Master">Master</option>
            <option value="Doctorat">Doctorat</option>
          </select>
        </div>

        <TextAreaField label="Description" name="description" value={formData.description} onChange={handleChange} />

        {/*<TextAreaField label="Pièces à fournir" name="pieces" value={formData.pieces} onChange={handleChange} />*/}

        <InputField label="Date limite" name="date_limite" value={formData.date_limite} onChange={handleChange} type="date" />

        <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200">
          Publier l’offre
        </button>
      </form>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Offre de stage créé avec succès !</h3>
            <p className="text-sm text-gray-600 mb-4">Votre offre a bien été enregistré.</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/offre/stage");
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

// Composants
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
    </div>
  );
}
