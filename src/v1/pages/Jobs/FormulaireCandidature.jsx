// src/components/FormulaireCandidature.jsx
import { useState } from 'react';
import axios from 'axios';

export default function FormulaireCandidature({ offreId }) {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    lettre_motivation: '',
    cv: null,
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('offre_id', offreId);
    formData.append('nom', form.nom);
    formData.append('email', form.email);
    formData.append('lettre_motivation', form.lettre_motivation);
    formData.append('cv', form.cv);

    try {
      await axios.post('/api/candidatures', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Candidature envoyée avec succès !');
      setForm({
        nom: '',
        email: '',
        lettre_motivation: '',
        cv: null,
      });
    } catch (error) {
      setMessage("❌ Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Soumettre une candidature</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Nom complet
        </label>
        <input
          type="text"
          name="nom"
          value={form.nom}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Adresse email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Lettre de motivation
        </label>
        <input
          type="file"
          name="lettre de motivation"
          accept=".pdf"
          onChange={handleChange}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          CV (PDF uniquement)
        </label>
        <input
          type="file"
          name="cv"
          accept=".pdf"
          onChange={handleChange}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-60"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer la candidature'}
      </button>

      {message && (
        <div className={`text-sm font-medium text-center ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
    </form>
  );
}
