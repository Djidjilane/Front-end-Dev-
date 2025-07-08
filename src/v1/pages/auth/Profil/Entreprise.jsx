import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EntrepriseProfilForm = () => {
  const initialFormData = {
    secteur: '',
    description: '',
    adresse: '',
    contact: '',
    IFU: '',
    RCCM: '',
    logo: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: null, error: null });
  const [logoPreview, setLogoPreview] = useState(null);
  const navigate = useNavigate();

  // Vérification de l'authentification
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus({ error: "Veuillez vous connecter", success: null });
      navigate('/login');
    }
  }, [navigate]);

  // Gestion des changements
  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    if (files && name === 'logo') {
      const preview = URL.createObjectURL(files[0]);
      setLogoPreview(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return preview;
      });
    }
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    const requiredFields = ['secteur', 'description', 'adresse', 'contact', 'IFU', 'logo'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setStatus({
        error: `Les champs suivants sont requis: ${missingFields.join(', ')}`,
        success: null
      });
      return false;
    }

    if (!/^(\+)?[\d\s-]{8,}$/.test(formData.contact)) {
      setStatus({
        error: 'Le format du contact est invalide',
        success: null
      });
      return false;
    }

    return true;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus({ error: null, success: null });

    const token = localStorage.getItem("token");
    if (!token) {
      setStatus({ error: "Session expirée", success: null });
      navigate('/login');
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/entreprise/completer',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          },
          withCredentials: true
        }
      );

      setStatus({ success: data.message || "Profil enregistré avec succès", error: null });
      setTimeout(() => navigate('/dashboard/entreprise'), 2000);
    } catch (err) {
      console.error("Erreur complète:", err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setStatus({ 
          error: "Session expirée - Veuillez vous reconnecter", 
          success: null 
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorMsg = err.response?.data?.message || 
                        err.response?.data?.error || 
                        "Une erreur est survenue lors de l'enregistrement";
        setStatus({ error: errorMsg, success: null });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (le reste de votre JSX reste inchangé)
};

// Composant FormField (identique à votre version)
const FormField = ({ label, name, value, onChange, required, type = 'text', placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
      placeholder={placeholder}
    />
  </div>
);

export default EntrepriseProfilForm;