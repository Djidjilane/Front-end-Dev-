import { useEffect, useState } from "react";
import axios from "axios";

export default function ListeCandidats() {
  const [candidats, setCandidats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchNom, setSearchNom] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterContrat, setFilterContrat] = useState("Tous");
  const [actions, setActions] = useState({});

  useEffect(() => {
    axios.get("/api/candidats")
      .then(res => setCandidats(res.data))
      .catch(err => console.error("Erreur API :", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = (id, action) => {
    axios.post(`/api/candidats/${id}/action`, { action })
      .then(() => {
        setActions(prev => ({ ...prev, [id]: action }));
      })
      .catch(err => console.error("Erreur action:", err));
  };

  const filtered = candidats.filter(c =>
    c.nom.toLowerCase().includes(searchNom.toLowerCase()) &&
    c.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
    (filterContrat === "Tous" || c.type_contrat === filterContrat)
  );

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchNom}
          onChange={e => setSearchNom(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <input
          type="email"
          placeholder="Rechercher par email"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        />
        <select
          value={filterContrat}
          onChange={e => setFilterContrat(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="Tous">Tous les contrats</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
        </select>
      </div>

      <div className="grid grid-cols-6 gap-x-4 font-semibold text-gray-700 px-2 text-sm">
        <div>Nom</div>
        <div>Email</div>
        <div>Contrat</div>
        <div>Date</div>
        <div>Documents</div>
        <div className="text-center">Action</div>
      </div>

      <div className="space-y-2">
        {filtered.map((c, index) => (
          <div
            key={c.id}
            className={`grid grid-cols-6 gap-x-4 items-center px-4 py-4 rounded-xl transition
              ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              hover:shadow-md hover:bg-gray-100`}
          >
            <div className="font-medium">{c.nom}</div>
            <div className="text-gray-600 break-all">{c.email}</div>
            <div className="text-sm">{c.type_contrat}</div>
            <div className="text-sm text-gray-500">{c.date_postulation}</div>
            <div className="space-x-2 text-sm">
              <a href={c.cv} target="_blank" className="text-blue-500 hover:underline">CV</a>
              <a href={c.lettre} target="_blank" className="text-blue-500 hover:underline">Lettre</a>
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
}
