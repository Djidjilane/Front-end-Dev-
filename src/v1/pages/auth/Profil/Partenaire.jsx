import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

const PartenaireProfilForm = () => {
  const [formData, setFormData] = useState({
    secteur: '',
    description: '',
    adresse: '',
    contact: '',
    IFU: '',
    RCCM: '',
    logo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      if (name === 'logo') {
        setLogoPreview(URL.createObjectURL(files[0]));
      }
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
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      const res = await axiosInstance.post('/partenaire/completer', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMsg(res.data.message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-yellow-700 text-center mb-6">
          Compléter votre profil partenaire
        </h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm text-center mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          {/* Secteur */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Secteur</label>
            <input
              type="text"
              name="secteur"
              value={formData.secteur}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:outline-none"
              placeholder="Ex: Génie civil, Équipements BTP..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:outline-none"
              placeholder="Décrivez votre entreprise"
            />
          </div>

          {/* Adresse */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Adresse</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Cotonou, Bénin"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="+229 90 00 00 00"
            />
          </div>

          {/* IFU */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">IFU</label>
            <input
              type="text"
              name="IFU"
              value={formData.IFU}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Ex: 123456789"
            />
          </div>

          {/* RCCM */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">RCCM (optionnel)</label>
            <input
              type="text"
              name="RCCM"
              value={formData.RCCM}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Logo</label>
            <input
              type="file"
              name="logo"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full file:bg-yellow-500 file:text-white file:rounded file:px-4 file:py-2 hover:file:bg-yellow-600 border border-gray-300 rounded-md"
            />
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Aperçu logo"
                className="mt-4 h-20 object-contain border rounded"
              />
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-bold text-white transition ${
                isSubmitting
                  ? 'bg-yellow-300 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              {isSubmitting ? 'Enregistrement...' : 'Valider le profil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartenaireProfilForm;
