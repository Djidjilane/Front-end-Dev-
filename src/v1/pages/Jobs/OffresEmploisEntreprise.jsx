// src/v1/pages/Jobs/OffresEmploisEntreprise.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const OffresEmploisEntreprise = () => {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/offres")
      .then((response) => {
        const emplois = response.data.filter(
          (offre) => offre.type === "Emploi" || offre.type === "Consultance"
        );
        setOffres(emplois);
      })
      .catch((error) => {
        console.error("Erreur de récupération des offres :", error);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Supprimer cette offre ?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8000/api/offres/${id}`)
        .then(() => {
          setOffres((prev) => prev.filter((offre) => offre.id !== id));
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression :", error);
        });
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">📄 Offres d'emploi & consultance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offres.map((offre) => (
          <div key={offre.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{offre.title}</h3>
            <p className="text-sm text-gray-600">{offre.company} - {offre.location}</p>
            <p className="mt-2 text-sm">{offre.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-green-600">{offre.salary}</span>
              <button
                onClick={() => handleDelete(offre.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffresEmploisEntreprise;
