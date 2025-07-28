import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosInstance';

const OuvrierProfilForm = () => {
  const [formData, setFormData] = useState({
    metier: '',
    cv: null,
    diplome: null,
    certifications: null,
  });
  const token = localStorage.getItem('token');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsSubmitting(true);

    const data = new FormData();
    data.append('metier', formData.metier);
    data.append('cv', formData.cv);
    if (formData.diplome) data.append('diplome', formData.diplome);
    if (formData.certifications) data.append('certifications', formData.certifications);

    try {
      const response = await axiosInstance.post('/ouvrier/completer', data, {
        headers: {
          Authorization: `Bearer ${token}`,

          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMsg(response.data.message);
      setTimeout(() => navigate('/login'), 1500); // ou toute autre page
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'enregistrement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Compléter votre profil ouvrier
        </h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm text-center mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Métier */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Métier</label>
            <input
              type="text"
              name="metier"
              required
              value={formData.metier}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-300"
              placeholder="Ex: Maçon, électricien..."
            />
          </div>

          {/* CV */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">CV (obligatoire)</label>
            <input
              type="file"
              name="cv"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 file:bg-green-600 file:text-white file:rounded file:px-4 file:py-2 hover:file:bg-green-700 transition"
            />
          </div>

          {/* Diplôme */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Diplôme (optionnel)</label>
            <input
              type="file"
              name="diplome"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 file:bg-green-600 file:text-white file:rounded file:px-4 file:py-2 hover:file:bg-green-700 transition"
            />
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Certifications (optionnel)</label>
            <input
              type="file"
              name="certifications"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 file:bg-green-600 file:text-white file:rounded file:px-4 file:py-2 hover:file:bg-green-700 transition"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Valider le profil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OuvrierProfilForm;
