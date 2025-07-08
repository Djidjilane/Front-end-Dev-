import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
/*<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======*/
import ModalAlert from "./ModalAlert";
import { toast } from "react-toastify";
import { 
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const TousOffre = () => {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
/*<<<<<<< HEAD
  const navigate = useNavigate();

  const isConnected = !!localStorage.getItem("token");
=======*/
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await axiosInstance.get("/offreEmploi");
        setOffres(response.data.offre);
      } catch (error) {
/*<<<<<<< HEAD
        console.error("Erreur :", error);
        setErreur("❌ Impossible de charger les offres.");
=======
        */console.error("Erreur lors du chargement des offres :", error);
        setErreur("Une erreur est survenue lors du chargement des offres.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffres();
  }, []);

/*
  const handleClick = (id) => {
    if (!isConnected) {
      navigate("/login", { state: { from: `/formul/${id}` } });
    } else {
      navigate(`/formul/${id}`);
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 Offres d'emploi</h2>

      {loading && <p className="text-gray-600">Chargement...</p>}
      {erreur && <p className="text-red-500">{erreur}</p>}

      {!loading && !erreur && offres.length === 0 && (
        <p className="text-gray-500 italic">Aucune offre pour le moment.</p>
      )}

      <div className="space-y-4">
        {offres.map((offre) => (
          <div
            key={offre.id}
            className="border border-gray-200 p-4 rounded-md bg-white shadow-sm hover:shadow transition"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-medium text-blue-700">{offre.titre}</h3>
              <p className="text-sm text-gray-700">{offre.description}</p>
              <div className="text-xs text-gray-500">
                <span>📍 {offre.lieu} | </span>
                <span>📅 {new Date(offre.created_at).toLocaleDateString()} | </span>
                <span>⏳ Limite : {offre.date_limite}</span>
              </div>
            </div>

            <div className="mt-3">
              <button
                onClick={() => handleClick(offre.id)}
                className="text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isConnected ? "Postuler" : "Se connecter pour postuler"}
              </button>
            </div>
          </div>
        ))}
      </div>
=======*/
  const handlePostuler = (idOffre) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token)
     {
      setShowModal(true);
      return;
    }
    if (user?.type !==  "ouvrier") {
      toast.error("Seuls les ouvriers peuvent postuler à une offre !");
      console.log('Seuls les ouvriers peuvent postuler à une offre');
      return;
    }
    navigate(`/formul/${idOffre}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* En-tête 8033573996*/}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Offres d'emploi disponibles</h1>
        <p className="text-gray-600">
          {!loading && !erreur && offres.length > 0 
            ? `${offres.length} opportunités pour votre carrière`
            : "Trouvez l'emploi qui vous correspond"}
        </p>
      </div>

      {/* État de chargement */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Erreur */}
      {erreur && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <p className="text-red-700 font-medium">{erreur}</p>
        </div>
      )}

      {/* Aucune offre */}
      {!loading && !erreur && offres.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucune offre disponible</h3>
          <p className="text-gray-500 mt-1">Revenez plus tard pour découvrir de nouvelles opportunités.</p>
        </div>
      )}

      {/* Liste des offres */}
      {!loading && !erreur && offres.length > 0 && (
        <div className="space-y-4">
          {offres.map((offre) => (
            <div
              key={offre.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-100"
            >
              <div className="p-3">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {offre.titre}
                      </h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Actif
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {offre.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{offre.lieu}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Publié le {new Date(offre.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Date limite: {offre.date_limite}</span>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Profil: Ouvrier</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-4 flex md:flex-col justify-end">
                    <button
                      onClick={() => handlePostuler(offre.id)}
                      className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out shadow-sm hover:shadow-md text-sm"
                    >
                      Postuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ModalAlert
          message="Connectez-vous pour postuler à une offre."
          onConfirm={() => {
            setShowModal(false);
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default TousOffre;