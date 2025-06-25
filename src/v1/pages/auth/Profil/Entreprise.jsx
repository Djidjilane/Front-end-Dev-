import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosInstance';
const EntrepriseProfilForm = () => {
  const [formData, setFormData] = useState({
    nom_entreprise: '',
    IFU: '',
    RCCM: '',
    logo: null,
  });
  const [previewLogo, setPreviewLogo] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      const file = files[0];
      setFormData({ ...formData, logo: file });
      setPreviewLogo(URL.createObjectURL(file));
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
    data.append('nom_entreprise', formData.nom_entreprise);
    data.append('IFU', formData.IFU);
    data.append('RCCM', formData.RCCM);
    if (formData.logo) {
      data.append('logo', formData.logo);
    }

    try {
      const response = await axiosInstance.post('/entreprise/completer', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setSuccessMsg(response.data.message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Compléter votre profil entreprise
        </h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm text-center mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Nom entreprise */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nom de l’entreprise</label>
            <input
              type="text"
              name="nom_entreprise"
              required
              value={formData.nom_entreprise}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Ex: BTP Connect SARL"
            />
          </div>

          {/* IFU */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">IFU</label>
            <input
              type="text"
              name="IFU"
              required
              value={formData.IFU}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Ex: 123456789"
            />
          </div>

          {/* RCCM */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">RCCM (optionnel)</label>
            <input
              type="text"
              name="RCCM"
              value={formData.RCCM}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Ex: RB/COT/22B999"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Logo de l’entreprise</label>
            <input
              type="file"
              name="logo"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
            />
            {previewLogo && (
              <img
                src={previewLogo}
                alt="Aperçu du logo"
                className="mt-4 h-24 object-contain rounded-md border"
              />
            )}
          </div>

          {/* Bouton */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntrepriseProfilForm;
