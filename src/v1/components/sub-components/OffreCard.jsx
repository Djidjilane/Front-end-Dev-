import { Trash2 } from "lucide-react"; // Assure-toi d’avoir installé lucide-react

const OffreCard = ({ offre, onDelete }) => (
  <div className="border border-gray-200 p-5 rounded-2xl shadow-md bg-white relative hover:shadow-lg transition-all duration-200">
    <div className="flex justify-between items-start mb-1">
      <h3 className="text-xl font-semibold text-gray-800">{offre.title}</h3>
      <span className="text-sm px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{offre.type}</span>
    </div>

    <p className="text-gray-500 text-sm mb-1">{offre.company} • {offre.location}</p>
    <p className="text-gray-600 text-sm mb-1 font-medium">{offre.projet || offre.domaine}</p>
    <p className="text-xs text-gray-500 mb-2">📅 Date limite : <span className="text-red-600">{offre.deadline}</span></p>

    <p className="text-sm text-gray-700 mb-3">{offre.description}</p>

    <div className="flex justify-between items-end">
      <p className="text-blue-600 font-bold text-base">{offre.salary}</p>
    </div>

    <button
      onClick={() => onDelete(offre.id)}
      className="absolute top-3 right-3 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
      title="Supprimer l'offre"
    >
      <Trash2 size={16} />
    </button>
  </div>
);

export default OffreCard;
