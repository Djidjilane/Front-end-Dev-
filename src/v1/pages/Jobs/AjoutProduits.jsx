import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AjouterProduit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prix: "",
    type: "",
    description: "",
    image: "",
    enStock: true,
  });

  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSuccess("");

    try {
      await axios.post("http://localhost:8000/api/produits", form);
      setSuccess("Produit ajouté avec succès !");
      setTimeout(() => navigate("/produits"), 1500);
    } catch (err) {
      setErreur("Erreur lors de l'ajout du produit.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un produit</h1>

      {erreur && <p className="text-red-600 mb-4">{erreur}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom du produit</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Prix</label>
          <input
            type="text"
            name="prix"
            value={form.prix}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">URL de l'image</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="enStock"
            checked={form.enStock}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Produit en stock</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Ajouter le produit
        </button>
      </form>
    </div>
  );
}
