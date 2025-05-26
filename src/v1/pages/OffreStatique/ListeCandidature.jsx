import { useState } from "react";

export default function ListeCandidats() {
  const [searchNom, setSearchNom] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [sortField, setSortField] = useState("nom");
  const [sortOrder, setSortOrder] = useState("asc");
  const [actions, setActions] = useState({});

  const candidats = [
    {
      id: 1,
      nom: "Jean Dupont",
      email: "jean.dupont@example.com",
      type_contrat: "CDI",
      date_postulation: "2025-05-10",
      cv: "/cv/jean_cv.pdf",
      lettre: "/lettres/jean_lettre.pdf"
    },
    {
      id: 2,
      nom: "Marie Claire",
      email: "marie.claire@example.com",
      type_contrat: "Stage",
      date_postulation: "2025-05-14",
      cv: "/cv/marie_cv.pdf",
      lettre: "/lettres/marie_lettre.pdf"
    },
    {
      id: 3,
      nom: "Ali Bamba",
      email: "ali.bamba@example.com",
      type_contrat: "CDD",
      date_postulation: "2025-05-18",
      cv: "/cv/ali_cv.pdf",
      lettre: "/lettres/ali_lettre.pdf"
    }
  ];

  const filtrerEtTrier = (type) => {
    return candidats
      .filter(c =>
        c.nom.toLowerCase().includes(searchNom.toLowerCase()) &&
        c.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
        (type === "Stage" ? c.type_contrat === "Stage" : c.type_contrat !== "Stage")
      )
      .sort((a, b) => {
        const aVal = a[sortField].toLowerCase();
        const bVal = b[sortField].toLowerCase();
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
  };

  const handleAction = (id, action) => {
    setActions({ ...actions, [id]: action });
    console.log(`Candidat ${id} ${action}`);
  };

  const renderSection = (titre, liste) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{titre}</h2>

      <div className="grid grid-cols-6 font-semibold text-gray-700 px-2 text-sm">
        <div>Nom</div>
        <div>Email</div>
        <div>Contrat</div>
        <div>Date</div>
        <div>Documents</div>
        <div className="text-center">Action</div>
      </div>

      <div className="space-y-2">
        {liste.map((c, index) => (
          <div
            key={c.id}
            className={`grid grid-cols-6 items-center px-4 py-4 rounded-xl transition duration-200
              ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              hover:shadow-md hover:bg-gray-100`}
          >
            <div className="font-medium">{c.nom}</div>
            <div className="text-gray-600">{c.email}</div>
            <div className="text-sm">{c.type_contrat}</div>
            <div className="text-sm text-gray-500">{c.date_postulation}</div>
            <div className="space-x-2 text-sm">
              <a href={c.cv} className="text-blue-500 hover:underline" target="_blank">CV</a>
              <a href={c.lettre} className="text-blue-500 hover:underline" target="_blank">Lettre</a>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleAction(c.id, "accepté")}
                className={`px-3 py-1 rounded-full text-xs text-white transition
                  ${actions[c.id] === "accepté" ? "bg-green-700" : "bg-green-500 hover:bg-green-600"}`}
              >
                Accepter
              </button>
              <button
                onClick={() => handleAction(c.id, "rejeté")}
                className={`px-3 py-1 rounded-full text-xs text-white transition
                  ${actions[c.id] === "rejeté" ? "bg-red-700" : "bg-red-500 hover:bg-red-600"}`}
              >
                Rejeter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-10">
      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchNom}
          onChange={e => setSearchNom(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="email"
          placeholder="Rechercher par email"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={sortField}
          onChange={e => setSortField(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="nom">Trier par nom</option>
          <option value="date_postulation">Trier par date</option>
        </select>
      </div>

      {/* Sections */}
      {renderSection("Candidatures Emploi (CDI / CDD)", filtrerEtTrier("Emploi"))}
      {renderSection("Candidatures Stage", filtrerEtTrier("Stage"))}
    </div>
  );
}
