
export default function DetailsOffre() {
  const offre = {
    id: 1,
    titre: "Développeur Web Full Stack",
    description: "Nous recherchons un développeur passionné maîtrisant Laravel et React. Vous serez amené(e) à concevoir et maintenir des applications performantes, sécurisées et évolutives.",
    entreprise: "TechSolutions Bénin",
    lieu: "Cotonou",
    date_limite: "2025-06-15",
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-md rounded-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{offre.titre}</h1>
        <p className="text-gray-600">{offre.description}</p>
      </div>

      <div className="space-y-2 text-gray-700 text-sm">
        <p><span className="font-semibold">Entreprise :</span> {offre.entreprise}</p>
        <p><span className="font-semibold">Lieu :</span> {offre.lieu}</p>
        <p><span className="font-semibold">Date limite :</span> {offre.date_limite}</p>
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Postuler à cette offre</h2>
      </div>
    </div>
  );
}
