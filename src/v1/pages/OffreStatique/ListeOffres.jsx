export default function ListeOffres() {
    const offresEmploi = [
      {
        id: 1,
        description: "Développeur Full Stack Laravel",
        lieu: "Cotonou",
        projet: "Plateforme de gestion documentaire",
        date_limite: "2025-06-15"
      },
      {
        id: 2,
        description: "Administrateur Systèmes et Réseaux",
        lieu: "Parakou",
        projet: "Infrastructure BTP",
        date_limite: "2025-07-01"
      }
    ];
  
    const offresStage = [
      {
        id: 1,
        description: "Stage en développement mobile Flutter",
        domaine: "Développement mobile",
        niveau: "Licence 3",
        date_limite: "2025-06-30"
      },
      {
        id: 2,
        description: "Stage en cybersécurité",
        domaine: "Sécurité informatique",
        niveau: "Master 1",
        date_limite: "2025-07-10"
      }
    ];
  
    return (
      <div className="max-w-5xl mx-auto p-6 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Offres disponibles</h1>
  
        {/* Offres d'emploi */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Offres d'emploi</h2>
          <div className="grid gap-6">
            {offresEmploi.map((offre) => (
              <div key={offre.id} className="border rounded-2xl p-6 shadow hover:shadow-md transition bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{offre.description}</h3>
                <p className="text-sm text-gray-600 mb-2">📍 {offre.lieu}</p>
                <p className="text-sm text-gray-600 mb-2">Projet : {offre.projet}</p>
                <p className="text-sm text-gray-500">⏳ Date limite : {new Date(offre.date_limite).toLocaleDateString()}</p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Voir les détails
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Offres de stage */}
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Offres de stage</h2>
          <div className="grid gap-6">
            {offresStage.map((offre) => (
              <div key={offre.id} className="border rounded-2xl p-6 shadow hover:shadow-md transition bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{offre.description}</h3>
                <p className="text-sm text-gray-600 mb-2">Domaine : {offre.domaine}</p>
                <p className="text-sm text-gray-600 mb-2">Niveau : {offre.niveau}</p>
                <p className="text-sm text-gray-500">⏳ Date limite : {new Date(offre.date_limite).toLocaleDateString()}</p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Voir les détails
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  