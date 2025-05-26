import { useState } from "react";
import OffreCard from "../../components/sub-components/OffreCard";

const OffresEmploisEntreprise = () => {
  const [offres] = useState([
    {
      id: 1,
      title: "Développeur Frontend React",
      company: "Tech Innov",
      location: "Cotonou",
      type: "Emploi",
      salary: "600 000 FCFA",
      deadline: "2025-06-10",
      projet: "Portail e-commerce",
      description: "Développement de l'interface client avec React.js, intégration des API REST, responsive design.",
    },
    {
      id: 2,
      title: "Ingénieur DevOps",
      company: "Green Cloud",
      location: "Porto-Novo",
      type: "Emploi",
      salary: "1 200 000 FCFA",
      deadline: "2025-06-30",
      projet: "Infrastructure cloud",
      description: "Mise en place de CI/CD avec GitHub Actions, surveillance avec Prometheus et déploiement Docker.",
    },
    {
      id: 4,
      title: "Architecte Logiciel",
      company: "BTP Digital",
      location: "Cotonou",
      type: "Consultance",
      salary: "2 500 000 FCFA",
      deadline: "2025-06-18",
      projet: "ERP Bâtiment R+3",
      description: "Conception de l'architecture logicielle, choix des technologies, encadrement des équipes techniques.",
    },
  ]);

  const handleDelete = (id) => {
    const confirmation = window.confirm("Supprimer cette offre ?");
    if (confirmation) {
      alert("Suppression simulée de l'offre " + id);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-semibold text-gray-800">💼 Emplois & Consultances</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
          + Nouvelle Offre
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offres.map((offre) => (
          <OffreCard key={offre.id} offre={offre} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default OffresEmploisEntreprise;
