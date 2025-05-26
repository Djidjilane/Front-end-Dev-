import { useState, useEffect } from "react";
// InputField.js
const InputField = ({ label, name, value, onChange, type = "text" }) => (
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

// TextAreaField.js
const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required
      rows={4}
      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
  </div>
);


export default function CreerOffreEmploi() {
  const [formData, setFormData] = useState({
    titre: "",
    projet_id: "",
    description: "",
    lieu: "",
    date_limite: "",
  });

  const [pieces, setPieces] = useState(null);
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetch("/api/projets")
      .then(res => res.json())
      .then(data => setProjets(data))
      .catch(() => alert("Erreur lors du chargement des projets"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPieces(e.target.files[0]); // un seul fichier pour l’exemple
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   /* // InputField.js
const InputField = ({ label, name, value, onChange, type = "text" }) => (
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
);*/

// TextAreaField.js
/*const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required
      rows={4}
      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
  </div>
);*/


    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }
    if (pieces) {
      dataToSend.append("pieces", pieces);
    }

    const response = await fetch("/api/creer/offreEmploi", {
      method: "POST",
      body: dataToSend
    });

    if (response.ok) {
      alert("Offre d'emploi créée avec succès !");
      setFormData({
        titre: "",
        projet_id: "",
        description: "",
        lieu: "",
        date_limite: "",
      });
      setPieces(null);
    } else {
      alert("Erreur lors de la création de l'offre.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer une offre d’emploi</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <InputField label="Titre du poste" name="titre" value={formData.titre} onChange={handleChange} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Projet concerné</label>
          <select
            name="projet_id"
            value={formData.projet_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner un projet</option>
            {projets.map((projet) => (
              <option key={projet.id} value={projet.id}>
                {projet.nom}
              </option>
            ))}
          </select>
        </div>

        <TextAreaField label="Description" name="description" value={formData.description} onChange={handleChange} />

        

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Lieu" name="lieu" value={formData.lieu} onChange={handleChange} />
          <InputField label="Date limite" name="date_limite" value={formData.date_limite} onChange={handleChange} type="date" />
        </div>

        <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200">
          Publier l’offre
        </button>
      </form>
    </div>
  );
}
