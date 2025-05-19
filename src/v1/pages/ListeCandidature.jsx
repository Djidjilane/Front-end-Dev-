import { useState } from 'react';

export default function ListeCandidatures() {
  const [candidatures, setCandidatures] = useState([
    {
      id: 1,
      type: 'emploi',
      offre: { titre: 'Développeur Fullstack' },
      statut: 'en attente',
    },
    {
      id: 2,
      type: 'stage',
      offre: { titre: 'Stage en cybersécurité' },
      statut: 'acceptée',
    },
    {
      id: 3,
      type: 'emploi',
      offre: { titre: 'Chef de projet junior' },
      statut: 'en attente',
    },
  ]);

  const updateStatut = (id, nouveauStatut) => {
    setCandidatures(prev =>
      prev.map(c =>
        c.id === id ? { ...c, statut: nouveauStatut } : c
      )
    );
  };

  const renderActions = (c) => {
    if (c.statut !== 'en attente') {
      return <span className="italic text-sm text-gray-500">{c.statut}</span>;
    }

    return (
      <div className="flex gap-2">
        <button
          onClick={() => updateStatut(c.id, 'acceptée')}
          className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
        >
          Accepter
        </button>
        <button
          onClick={() => updateStatut(c.id, 'refusée')}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Refuser
        </button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des candidatures</h2>
      <ul className="space-y-3">
        {candidatures.map((c) => (
          <li key={c.id} className="border p-4 rounded shadow">
            <div><strong>Type :</strong> {c.type}</div>
            <div><strong>Offre :</strong> {c.offre.titre}</div>
            <div><strong>Statut :</strong> {renderActions(c)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
