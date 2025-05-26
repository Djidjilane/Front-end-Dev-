import { useEffect, useState } from "react";
import axios from "axios";

export default function ListeCandidats() {
  const [candidats, setCandidats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtres & tri
  const [searchNom, setSearchNom] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterContrat, setFilterContrat] = useState("Tous");
  const [sortField, setSortField] = useState("nom");
  const [sortOrder, setSortOrder] = useState("asc");

  // Récupération des données depuis l’API
  useEffect(() => {
    axios
      .get("/api/candidats") // Remplace par ton URL réelle
      .then((response) => setCandidats(response.data))
      .catch((err) => console.error("Erreur API :", err))
      .finally(() => setLoading(false));
  }, []);

  // Filtrage et tri
  const filtered = candidats
    .filter((c) =>
      c.nom.toLowerCase().includes(searchNom.toLowerCase()) &&
      c.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      (filterContrat === "Tous" || c.type_contrat === filterContrat)
    )
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "date_postulation") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-gray-50 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Liste des Candidatures</h1>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom"
          className="border rounded-lg px-4 py-2"
          value={searchNom}
          onChange={(e) => setSearchNom(e.target.value)}
        />
        <input
          type="email"
          placeholder="Rechercher par email"
          className="border rounded-lg px-4 py-2"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <select
          className="border rounded-lg px-4 py-2"
          value={filterContrat}
          onChange={(e) => setFilterContrat(e.target.value)}
        >
          <option value="Tous">Tous les contrats</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
        </select>
        <div className="flex gap-2">
          <select
            className="border rounded-lg px-2 py-2 w-full"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="nom">Trier par nom</option>
            <option value="date_postulation">Trier par date</option>
            <option value="type_contrat">Trier par contrat</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            title="Inverser l'ordre"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Résultats */}
      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : filtered.length > 0 ? (
        <div className="grid gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{c.nom}</h2>
                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">{c.type_contrat}</span>
              </div>
              <p className="text-sm text-gray-600">📧 {c.email}</p>
              <p className="text-sm text-gray-600">⏳ {new Date(c.date_postulation).toLocaleDateString()}</p>
              <div className="mt-3 text-sm text-gray-700">
                <p><strong>Lettre :</strong> {c.lettre}</p>
                <p><strong>CV :</strong> {c.cv}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucun candidat trouvé.</p>
      )}
    </div>
  );
}
