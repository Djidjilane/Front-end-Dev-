import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';


export default function FormulaireCandidature() {

  const [cip, setCip] = useState(null);
  const [cv, setCv] = useState(null);
 
  const { id: offreId } = useParams();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);


  const [form, setForm] = useState({
    cip: null,
    cv: null,
    diplome:null,
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // Pour éviter un rendu prématuré

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirection forcée
    } else {
      setAuthChecked(true); // On peut afficher le formulaire
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    setLoading(true);
    setMessage('');
    if (!token) {
      alert("Vous devez être connecté.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append('cip', form.cip);
    formData.append('cv', form.cv);
    if (form.diplome) formData.append("diplome", form.diplome);

   // formData.append('offre_id', offreId);

    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(
        `/ouvrier/postulerEmploi/${offreId}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      //setMessage(response.data.message || '✅ Candidature envoyée avec succès !');
      setForm({ cip: null, cv: null });
      setShowModal(true);

    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setMessage('❌ Vous devez être connecté(e) avec le rôle "ouvrier" pour postuler.');
        navigate("/login"); // rediriger à nouveau au cas où le token est invalide
      } else {
        setMessage(`❌ ${error.response?.data?.message || "Erreur lors de l'envoi."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Ne rien afficher tant que l'authentification n'est pas vérifiée
  if (!authChecked) return null;

  return (
    <>
      {showModal && <ModalConfirmation onClose={() => setShowModal(false)} />}
  
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Soumettre une candidature
        </h2>
  
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            CIP (PDF, JPG, PNG)
          </label>
          <input
            type="file"
            name="cip"
            accept=".pdf, .jpg, .png"
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
  
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Diplome (PDF, JPG, PNG)
          </label>
          <input
            type="file"
            name="diplome"
            accept=".pdf, .jpg, .png"
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
          <div
            className={`text-sm font-medium text-center ${
              message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </>
  );
}
function ModalConfirmation({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-4">🎉 Candidature envoyée</h3>
        <p className="text-gray-700 mb-6">Votre candidature a bien été soumise. Vous recevrez une réponse prochainement.</p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

