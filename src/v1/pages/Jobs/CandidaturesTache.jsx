import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import LayoutComponent from "../../layouts/LayoutComponent";
import { Building2, Mail, Calendar, CheckCircle, XCircle, Clock, Users, Briefcase, Award } from "lucide-react";
import { message, Modal } from 'antd';

export default function CandidaturesTache() {
  const { id } = useParams();
  const [candidatures, setCandidatures] = useState([]);
  const [tache, setTache] = useState("");
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [filter, setFilter] = useState(null); // Nouvel état pour le filtre

  // Fonction pour charger les candidatures
  const fetchCandidatures = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/entreprise/candidatureTache/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Données reçues:", response.data);
      setTache(response.data.tache);
      setCandidatures(response.data.candidatures || []);
    } catch (error) {
      console.error("Erreur de chargement :", error);
      setErreur("Impossible de récupérer les candidatures.");
      message.error("Erreur lors du chargement des candidatures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, [id]);

  // Filtrer les candidatures en fonction de l'état du filtre
  const filteredCandidatures = candidatures.filter(c => {
    if (!filter) return true;
    if (filter === 'acceptee') return c.statut === "acceptee";
    if (filter === 'en_attente') return c.statut !== "acceptee" && c.statut !== "refusee";
    return true;
  });

  // Fonction pour gérer l'acceptation/rejet
  const handleAction = async (candidatureId, action) => {
    try {
      setProcessingId(candidatureId);
      const token = localStorage.getItem("token");
      const endpoint = action === 'accept' 
        ? `/entreprise/candidature_tache/accepter/${candidatureId}`
        : `/entreprise/candidature_tache/rejeter/${candidatureId}`;

      await axiosInstance.patch(endpoint, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success(`Candidature ${action === 'accept' ? 'acceptée' : 'rejetée'} avec succès`);
      
      // Mise à jour locale de l'état
      setCandidatures(prev => prev.map(c => 
        c.id === candidatureId 
          ? { ...c, statut: action === 'accept' ? 'acceptee' : 'refusee' } 
          : c
      ));
    } catch (error) {
      console.error("Erreur:", error);
      message.error(`Échec de ${action === 'accept' ? 'l\'acceptation' : 'du rejet'}`);
    } finally {
      setProcessingId(null);
    }
  };

  // Fonction de confirmation avant action
  const confirmAction = (candidatureId, action) => {
    
    Modal.confirm({
      title: `Confirmer ${action === 'accept' ? 'l\'acceptation' : 'le rejet'}`,
      content: `Êtes-vous sûr de vouloir ${action === 'accept' ? 'accepter' : 'rejeter'} cette candidature ?`,
      okText: 'Confirmer',
      cancelText: 'Annuler',
      onOk: () => handleAction(candidatureId, action),
    });
  };

  // Fonctions utilitaires pour l'affichage du statut
  const getStatutIcon = (statut) => {
    switch (statut) {
      case "acceptee": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "refusee": return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatutStyle = (statut) => {
    switch (statut) {
      case "acceptee": return "bg-green-100 text-green-800 border-green-200";
      case "refusee": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  const getStatutText = (statut) => {
    switch (statut) {
      case "acceptee": return "Acceptée";
      case "refusee": return "Rejetée";
      default: return "En attente";
    }
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <LayoutComponent>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-orange-600 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-2">Chargement des candidatures</h2>
              <p className="text-slate-500">Récupération des données en cours...</p>
            </div>
          </div>
        </div>
      </LayoutComponent>
    );
  }

  // Affichage en cas d'erreur
  if (erreur) {
    return (
      <LayoutComponent>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-red-700 mb-2">Erreur de chargement</h2>
              <p className="text-red-600">{erreur}</p>
            </div>
          </div>
        </div>
      </LayoutComponent>
    );
  }

  // Affichage principal
  return (
    <LayoutComponent>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* En-tête */}
          <div className="bg-gradient-to-l from-sky-500 to-green-700 rounded-xl shadow-lg p-8 text-white mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Candidatures reçues</h1>
                <p className="text-orange-100 text-lg">
                  Tâche : <span className="font-semibold text-white">{tache}</span>
                </p>
              </div>
            </div>
            
            {/* Statistiques cliquables */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`rounded-lg p-4 cursor-pointer transition-colors ${
                  !filter ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => setFilter(null)}
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Total candidatures</span>
                </div>
                <p className="text-2xl font-bold mt-1">{candidatures.length}</p>
              </div>

              <div 
                className={`rounded-lg p-4 cursor-pointer transition-colors ${
                  filter === 'acceptee' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => setFilter('acceptee')}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Acceptées</span>
                </div>
                <p className="text-2xl font-bold mt-1">
                  {candidatures.filter(c => c.statut === "acceptee").length}
                </p>
              </div>

              <div 
                className={`rounded-lg p-4 cursor-pointer transition-colors ${
                  filter === 'en_attente' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => setFilter('en_attente')}
              >
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">En attente</span>
                </div>
                <p className="text-2xl font-bold mt-1">
                  {candidatures.filter(c => c.statut !== "acceptee" && c.statut !== "refusee").length}
                </p>
              </div>
            </div>
          </div>

          {/* Liste des candidatures filtrées */}
          {filteredCandidatures.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                <Users className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">
                {filter === 'acceptee' ? 'Aucune candidature acceptée' : 
                 filter === 'en_attente' ? 'Aucune candidature en attente' : 
                 'Aucune candidature'}
              </h3>
              <p className="text-slate-500 text-lg">
                {filter ? 'Aucune candidature ne correspond à ce filtre' : 'Aucune entreprise n\'a encore candidaté pour cette tâche'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCandidatures.map((candidature) => (
                <div key={candidature.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 mb-1">
                            {candidature.candidat_nom}
                          </h3>
                          <div className="flex items-center space-x-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{candidature.candidat_email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full border text-sm font-medium ${getStatutStyle(candidature.statut)}`}>
                        {getStatutIcon(candidature.statut)}
                        <span>{getStatutText(candidature.statut)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-500">Date de candidature</p>
                          <p className="font-semibold text-slate-700">
                            {new Date(candidature.date_candidature).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-500">Statut</p>
                          <p className="font-semibold text-slate-700">{getStatutText(candidature.statut)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-slate-100">
                      <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                        Voir détails
                      </button>
                      {candidature.statut !== "acceptee" && candidature.statut !== "refusee" && (
                        <>
                          <button 
                            onClick={() => confirmAction(candidature.id, 'reject')}
                            disabled={processingId === candidature.id}
                            className={`px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors ${
                              processingId === candidature.id ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Rejeter
                          </button>
                          <button 
                            onClick={() => confirmAction(candidature.id, 'accept')}
                            disabled={processingId === candidature.id}
                            className={`px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors ${
                              processingId === candidature.id ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Accepter
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LayoutComponent>
  );
}