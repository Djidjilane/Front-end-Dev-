import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import SidebarEntreprise from "../../components/Dashboard/DashboardSidebar/SidebarEntreprise";

export default function CreerOffreStage() {
  const [formData, setFormData] = useState({
    domaine: "",
    niveau: "",
    description: "",
    date_limite: "",
    lieu: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserType(user?.type);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.domaine) newErrors.domaine = "Le domaine est requis";
    if (!formData.niveau) newErrors.niveau = "Le niveau est requis";
    if (!formData.description) newErrors.description = "La description est requise";
    if (!formData.date_limite) newErrors.date_limite = "La date limite est requise";
    if (!formData.lieu) newErrors.lieu = "Le lieu est requis";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté pour créer une offre.");
      navigate("/login");
      return;
    }

    if (userType !== 'entreprise') {
      setErrors({ submit: "Seules les entreprises peuvent créer des offres de stage" });
      setIsSubmitting(false);
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      await axiosInstance.post("/entreprise/creer/offreStage", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });
      setShowSuccessModal(true);
    } catch (error) {
      let errorMessage = "Erreur lors de la création de l'offre";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarEntreprise />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Créer une offre de stage</h1>
            <p className="text-gray-600 mt-2">Remplissez les détails de votre offre de stage</p>
          </div>

          {errors.submit && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Domaine*"
              name="domaine"
              value={formData.domaine}
              onChange={handleChange}
              error={errors.domaine}
              placeholder="Ex: Développement Web, Marketing Digital"
            />
            
            <FormField
              label="Lieu*"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              error={errors.lieu}
              placeholder="Ex: Paris, Télétravail, Hybride"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau requis*</label>
              <select
                name="niveau"
                value={formData.niveau}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.niveau ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un niveau</option>
                <option value="Licence">Licence</option>
                <option value="Master">Master</option>
                <option value="Doctorat">Doctorat</option>
                <option value="BTS">BTS</option>
                <option value="DUT">DUT</option>
              </select>
              {errors.niveau && (
                <p className="mt-1 text-sm text-red-600">{errors.niveau}</p>
              )}
            </div>
            
            <FormField
              label="Description du stage*"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              isTextArea
              placeholder="Décrivez les missions, compétences requises, avantages..."
            />
            
            <FormField
              label="Date limite de candidature*"
              name="date_limite"
              type="date"
              value={formData.date_limite}
              onChange={handleChange}
              error={errors.date_limite}
              min={new Date().toISOString().split('T')[0]}
            />

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium text-white flex items-center justify-center ${
                  isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publication en cours...
                  </>
                ) : (
                  "Publier l'offre de stage"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-fade-in">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Offre de stage publiée !</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>Votre offre est maintenant visible par les candidats.</p>
              </div>
              <div className="mt-5 flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/entreprise/offreStage");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Voir mes offres
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setFormData({
                      domaine: "",
                      niveau: "",
                      description: "",
                      date_limite: "",
                      lieu: ""
                    });
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Créer une autre offre
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({ label, name, value, onChange, error, type = "text", isTextArea = false, placeholder, min }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}