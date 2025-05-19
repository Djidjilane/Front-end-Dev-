export default function ListeOffres() {
  const offres = [
    {
      id: 1,
      titre: "Développeur Full Stack",
      entreprise: "TechBénin",
      description: "Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe dynamique...",
      lieu: "Cotonou",
      date_limite: "2025-06-30",
      type_contrat: "CDI",
    },
    {
      id: 2,
      titre: "Assistant RH",
      entreprise: "Groupe SIBA",
      description: "Le Groupe SIBA recrute un assistant ressources humaines pour ses activités régionales...",
      lieu: "Parakou",
      date_limite: "2025-06-15",
      type_contrat: "CDD",
    },
    {
      id: 3,
      titre: "Stagiaire en Marketing Digital",
      entreprise: "DigitalPro",
      description: "Une entreprise innovante dans le marketing digital recrute un stagiaire pour une durée de 3 mois...",
      lieu: "Abomey-Calavi",
      date_limite: "2025-06-10",
      type_contrat: "Stage",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Offres d'emploi disponibles</h1>

      <div className="grid gap-6">
        {offres.map((offre) => (
          <div key={offre.id} className="border rounded-2xl p-6 shadow hover:shadow-md transition bg-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">{offre.titre}</h2>
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{offre.type_contrat}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Entreprise : <strong>{offre.entreprise}</strong></p>
            <p className="text-gray-700 mb-3">{offre.description.slice(0, 150)}...</p>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>📍 {offre.lieu}</span>
              <span>⏳ Jusqu’au : {new Date(offre.date_limite).toLocaleDateString()}</span>
            </div>

            <div className="mt-4">
              <a
                href={`/offres/${offre.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Voir les détails
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
