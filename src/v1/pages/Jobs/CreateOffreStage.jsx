import { useState } from "react";

export default function CreerOffreStage() {
  const [formData, setFormData] = useState({
    titre: "",
    entreprise: "",
    domaine: "",
    niveau: "",
    description: "",
    date_limite: "",
    pieces: "" // ✅ Ajout ici
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/offres-stage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("Offre de stage créée avec succès !");
      setFormData({
        titre: "",
        entreprise: "",
        domaine: "",
        niveau: "",
        description: "",
        date_limite: "",
        pieces: ""
      });
    } else {
      alert("Erreur lors de la création de l'offre.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer une offre de stage</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField label="Titre du stage" name="titre" value={formData.titre} onChange={handleChange} />
        <InputField label="Entreprise" name="entreprise" value={formData.entreprise} onChange={handleChange} />
        <InputField label="Domaine" name="domaine" value={formData.domaine} onChange={handleChange} />

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

        {/* ✅ Nouveau champ pour les pièces à fournir */}
        <TextAreaField label="Pièces à fournir" name="pieces" value={formData.pieces} onChange={handleChange} />

        <InputField label="Date limite" name="date_limite" value={formData.date_limite} onChange={handleChange} type="date" />

        <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200">
          Publier l’offre
        </button>
      </form>
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
