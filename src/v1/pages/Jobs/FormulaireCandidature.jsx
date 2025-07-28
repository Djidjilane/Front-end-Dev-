import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import SidebarOuvrier from '../../components/Dashboard/DashboardSidebar/SidebarOuvrier';

export default function FormulaireCandidature() {
  const { id: offreId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [filePreviews, setFilePreviews] = useState({
    cip: null,
    cv: null,
    diplome: null
  });

  const [form, setForm] = useState({
    cip: null,
    cv: null,
    diplome: null
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!token) {
      navigate("/login");
      return;
    }
    
    if (user?.type !== "ouvrier") {
      navigate("/login");
      return;
    }
    
    setAuthChecked(true);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    // Validation des fichiers
    if (name === "cv" && file?.type !== "application/pdf") {
      setErrors(prev => ({ ...prev, cv: "Le CV doit être un fichier PDF" }));
      return;
    }
    
    if (file?.size > 5 * 1024 * 1024) { // 5MB
      setErrors(prev => ({ ...prev, [name]: "Fichier trop volumineux (max 5MB)" }));
      return;
    }
    
    setForm(prev => ({ ...prev, [name]: file }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    
    // Prévisualisation
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreviews(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.cip) newErrors.cip = "Le CIP est requis";
    if (!form.cv) newErrors.cv = "Le CV est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append('cip', form.cip);
    formData.append('cv', form.cv);
    if (form.diplome) formData.append("diplome", form.diplome);

    try {
      await axiosInstance.post(
        `/ouvrier/postulerEmploi/${offreId}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setShowModal(true);
      setForm({ cip: null, cv: null, diplome: null });
      setFilePreviews({ cip: null, cv: null, diplome: null });
    } catch (error) {
      console.error(error);
      let errorMessage = "Erreur lors de l'envoi";
      if (error.response?.status === 401) {
        errorMessage = "Authentification requise";
        navigate("/login");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (name) => {
    setForm(prev => ({ ...prev, [name]: null }));
    setFilePreviews(prev => ({ ...prev, [name]: null }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarOuvrier />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md animate-fade-in">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">Candidature envoyée !</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Votre candidature a bien été soumise.</p>
                    <p>Vous recevrez une réponse prochainement.</p>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        navigate("/ouvrier/candidature");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Voir mes candidatures
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Postuler à une offre</h1>
          <p className="text-gray-600 mb-6">Veuillez fournir les documents requis</p>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FileUpload 
              label="Certificat Individuel de Prévention (CIP)*"
              name="cip"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              error={errors.cip}
              preview={filePreviews.cip}
              onRemove={() => removeFile("cip")}
              required
            />

            <FileUpload 
              label="Curriculum Vitae (CV)* (PDF uniquement)"
              name="cv"
              accept=".pdf"
              onChange={handleChange}
              error={errors.cv}
              preview={filePreviews.cv}
              onRemove={() => removeFile("cv")}
              required
            />

            <FileUpload 
              label="Diplôme (Optionnel)"
              name="diplome"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              preview={filePreviews.diplome}
              onRemove={() => removeFile("diplome")}
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-md font-medium text-white flex items-center justify-center ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : "Soumettre ma candidature"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FileUpload({ label, name, accept, onChange, error, preview, onRemove, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {preview ? (
        <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-600 truncate max-w-xs">
              {preview.name || "Fichier sélectionné"}
            </span>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-md ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
        } transition-colors`}>
          <label className="flex flex-col items-center justify-center w-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium text-blue-600">Cliquez pour téléverser</span> ou glissez-déposez
            </p>
            <p className="text-xs text-gray-500">{accept.split(',').join(', ')} (max 5MB)</p>
            <input
              type="file"
              name={name}
              accept={accept}
              onChange={onChange}
              className="hidden"
              required={required}
            />
          </label>
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}