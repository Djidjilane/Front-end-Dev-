import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

export default function CandidaterTache() {
  const { tacheId } = useParams();
  const navigate = useNavigate();
  const [motivationFile, setMotivationFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setMotivationFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('motivation', motivationFile);

      const response = await axiosInstance.post(
        `/entreprise/candidater/${tacheId}`,
        formData,
        {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajout crucial
            }
        }
        );

      setSuccess(true);
      setTimeout(() => navigate('/mes-candidatures'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Postuler à cette tâche
      </h2>

      {success ? (
        <div className="p-4 mb-4 bg-green-100 text-green-700 rounded">
          Candidature envoyée avec succès ! Redirection en cours...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fichier de motivation (PDF, JPG, PNG - max 2MB)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || !motivationFile}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                loading || !motivationFile
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Envoi en cours...' : 'Postuler'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}