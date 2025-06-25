import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import LayoutComponent from "../../layouts/LayoutComponent";

export default function PostulerProjet() {
  const { id: projetId } = useParams();
  const [fichier, setFichier] = useState(null);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fichier) {
      setErreur("Veuillez sélectionner un fichier de motivation.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("motivation", fichier);

    setLoading(true);
    setErreur("");
    setMessage("");

    try {
      const response = await axiosInstance.post(`/projet/postuler/${projetId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Postulation envoyée avec succès !");
      setTimeout(() => navigate("/projets/ouverts"), 2000); // redirection facultative
    } catch (error) {
      console.error("Erreur lors de la postulation :", error);
      if (error.response) {
        setErreur(error.response.data.message || "Erreur lors de la postulation.");
      } else {
        setErreur("Erreur réseau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutComponent>
      <div className=" max-w-xl mx-auto mt-0 bg-white p-6 rounded-lg shadow-lg hover:border-2 border-blue-500 justify-items-center ">
        <h2 className="  flex text-2xl font-bold mb-10 text-blue-800 text-center">Postuler à ce projet</h2>

        <form onSubmit={handleSubmit} className="space-y-4 justify-items-center">
          <div>
            <label className="block text-sm font-medium mb-1 ">Fichier de motivation (.pdf, .jpg, .png)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.jfif"
              onChange={handleFileChange}
              className="w-full border-1 px-3 py-2 rounded-md hover:border-2 hover:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className=" flex w-full p-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-50 justify-center"
            disabled={loading}
          >
            {loading ? "Envoi en cours..." : "Postuler"}
          </button>
        </form>

        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
        {erreur && <p className="mt-4 text-red-600 text-center">{erreur}</p>}
      </div>
    </LayoutComponent>
  );
}
