import React, { useState } from 'react';
import axiosInstance from '../../../../api/axiosInstance';

export default function CompleteEntrepriseProfile() {
  const [formData, setFormData] = useState({
    nom_entreprise: '',
    IFU: '',
    RCCM: '',
    logo: null
  });
  const token = localStorage.getItem('token');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'logo') {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const data = new FormData();
    data.append('nom_entreprise', formData.nom_entreprise);
    data.append('IFU', formData.IFU);
    data.append('RCCM', formData.RCCM);
    if (formData.logo) data.append('logo', formData.logo);

    try {
      const response = await axiosInstance.post('/entreprise/completer', data, {
        headers: {
          Authorization: `Bearer ${token}`,

          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Erreur lors de l’envoi');
      } else {
        setError('Erreur inattendue');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Compléter votre profil d'entreprise</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Nom de l’entreprise</label>
          <input
            type="text"
            name="nom_entreprise"
            className="form-control"
            value={formData.nom_entreprise}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>IFU</label>
          <input
            type="text"
            name="IFU"
            className="form-control"
            value={formData.IFU}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>RCCM</label>
          <input
            type="text"
            name="RCCM"
            className="form-control"
            value={formData.RCCM}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-2">
          <label>Logo (jpg, jpeg, png)</label>
          <input
            type="file"
            name="logo"
            className="form-control"
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
