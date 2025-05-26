import { useState } from "react";

export default function CreerProjet() {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    date_debut: "",
    date_fin: "",
    budget: "",
    client: "",
    etat: "en cours", // facultatif
    fichiers: []
  });

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

    const data = new FormData();
    for (const key in formData) {
      if (key === "fichiers") {
        formData.fichiers.forEach(file => data.append("fichiers[]", file));
      } else {
        data.append(key, formData[key]);
      }
    }

    const response = await fetch("/api/projets", {
      method: "POST",
      body: data
    });

    if (response.ok) {
      alert("Projet créé !");
      setFormData({
        nom: "",
        description: "",
        date_debut: "",
        date_fin: "",
        budget: "",
        client: "",
        etat: "en cours",
        fichiers: []
      });
    } else {
      alert("Erreur lors de la création.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Créer un nouveau projet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nom du projet" name="nom" value={formData.nom} onChange={handleChange} />
        <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Date de début" name="date_debut" type="date" value={formData.date_debut} onChange={handleChange} />
          <Input label="Date de fin" name="date_fin" type="date" value={formData.date_fin} onChange={handleChange} />
        </div>
        <Input label="Budget (FCFA)" name="budget" type="number" value={formData.budget} onChange={handleChange} />
        <Input label="Client" name="client" value={formData.client} onChange={handleChange} />
        <Select label="État" name="etat" value={formData.etat} onChange={handleChange} options={["en cours", "terminé", "en attente"]} />
        <FileInput label="Fichiers à joindre" name="fichiers" onChange={handleChange} multiple />
        <button type="submit" className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Enregistrer
        </button>
      </form>
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

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded-md"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
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
