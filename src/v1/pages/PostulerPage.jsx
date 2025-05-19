import { useParams } from "react-router-dom";
import { useState } from "react";

export default function PostulerPage() {
  const { type, id } = useParams(); // type = emploi ou stage

  const [formData, setFormData] = useState({
    cv: null,
    diplome: null,
    lettre_motivation: null,
    certifications: null
  });

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0] || null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }
    await fetch(`/api/candidature/${type}/${id}`, {
      method: "POST",
      body: form,
    });
    alert("Candidature envoyée !");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold">Postuler à {type === "emploi" ? "une offre d'emploi" : "un stage"}</h2>

      <div>
        <label className="block">Diplôme (fichier)</label>
        <input type="file" name="diplome" onChange={handleChange} className="file-input file-input-bordered w-full" />
      </div>

      {type === "stage" && (
        <div>
          <label className="block">Lettre de motivation (fichier)</label>
          <input type="file" name="lettre_motivation" onChange={handleChange} className="file-input file-input-bordered w-full" />
        </div>
      )}

      <div>
        <label className="block">CV (fichier)</label>
        <input type="file" name="cv" onChange={handleChange} className="file-input file-input-bordered w-full" />
      </div>

      <div>
        <label className="block">Certifications (fichier)</label>
        <input type="file" name="certifications" onChange={handleChange} className="file-input file-input-bordered w-full" />
      </div>

      <button type="submit" className="btn btn-primary w-full">Envoyer la candidature</button>
    </form>
  );
}
