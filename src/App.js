import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from "./v1/pages/home/index";
import ContactForm from "./v1/pages/ContactForm";
import VerifyCode from './v1/pages/auth/verifyCode';
import ProtectedRoute from './v1/pages/auth/ProtectedRoute';
// import PrivateRoute from './v1/routes/private-route';
// import AdminRoute from './v1/routes/admin-route';
import PasswordResetFlow from "./v1/pages/auth/PasswordResetFlow";
import ForgotPassword from "./v1/pages/auth/ForgotPassword";
import ResetPassword from "./v1/pages/auth/resetPassword";
import CandidatureStage from "./v1/pages/Jobs/CandidatureStage";
import OffresStagesEntreprise from "./v1/pages/Jobs/OffresStageEntreprise";
import CreerOffreEmploi from "./v1/pages/Jobs/CreateOffreEmploi";
import DetailsOffre from "./v1/pages/Jobs/DetailOffre";
import NotFound404 from "./v1/pages/error-page/404";
import Login from "./v1/pages/auth/login";
import TousOffre from "./v1/pages/Jobs/TousOffres";
import Register from "./v1/pages/auth/register";
import PartenaireDashboard from "./v1/dashboard/user/dashboard_partenaire";
import EntrepriseDashboard from "./v1/dashboard/user/dashboard_entreprise";
import ClientDashboard from "./v1/dashboard/user/dashboard_client";
import OuvrierDashboard from "./v1/dashboard/user/dashboard_ouvrier";
import StagiaireDashboard from "./v1/dashboard/user/dashboard_stagiare";
//import ListeOffre from "./v1/pages/Jobs/OffresPage";
import CreateOffreForm from "./v1/pages/Jobs/CreateOffreStage";
//import TousOffre from "./v1/pages/Jobs/TousOffre";
import PostulerPage from "./v1/pages/PostulerPage";
import FormulaireCandidature from "./v1/pages/Jobs/FormulaireCandidature";
import CreerProjet from "./v1/pages/Jobs/CreateProjet";
import CreerOffreStage from "./v1/pages/Jobs/CreateOffreStage";
import ListeProjets from "./v1/pages/Jobs/ListeProjet";
import ChoisirEntreprise from "./v1/pages/Jobs/ChoisirEntreprise";
import ListeCandidats from "./v1/pages/Jobs/ListeCandidature";
import ListeEntreprises from "./v1/pages/Jobs/Listeentreprise" 
import ListePartenaires from "./v1/pages/Jobs/ListePartnaire";
import ProfilUtilisateur from "./v1/pages/Jobs/UserProfil";
import ListeProduits from "./v1/pages/Jobs/ListeProduit";
import DetailProduit from "./v1/pages/Jobs/DetailProduit";
import AjouterProduit from "./v1/pages/Jobs/AjoutProduits";
import MesOffresEmploi from "./v1/pages/Jobs/MesOffres";
import MesOffresStage from "./v1/pages/Jobs/MesOffresEmploi";
import VoirCandidatures from "./v1/pages/Jobs/Candidature";
import ListeProjetsClient from "./v1/pages/Jobs/ListeProjetsClient";
import ProjetsAssignes from "./v1/pages/Jobs/ProjetsAssignes";
import ProjetsOuverts from "./v1/pages/Jobs/ProjetsOuverts";
import PostulerProjet from "./v1/pages/Jobs/PostulerProjet";
import CandidaturesProjets from "./v1/pages/Jobs/CandidaturesProjets";
import MesCandidaturesProjets from "./v1/pages/Jobs/MesCandidaturesProjets";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
        <Route path="/ouvrier/dashboard" element={<OuvrierDashboard />} />
        <Route path="/formul/:id" element={<FormulaireCandidature />} />
        {/* autres routes privées ici */}
      </Route>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/PasswordResetFlow" element={<PasswordResetFlow />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/produits/créer" element={<AjouterProduit />} />
        <Route path="/partenaires" element={<ListePartenaires />} />
        <Route path="/produits" element={<ListeProduits />} />
        <Route path="/produits/:id" element={<DetailProduit />} />
        <Route path="/profil" element={<ProfilUtilisateur />} />
        <Route path="/entreprise" element={<ListeEntreprises />} />
        <Route path="/offre/stage" element={<OffresStagesEntreprise />} />
        <Route path="/offre/entreprise" element={<TousOffre />} />
        <Route path="/projet/liste" element={<ListeProjets/>} />
        <Route path="/client/projet" element={<ListeProjetsClient/>} />
        <Route path="/assigner/projet/:id" element={<ChoisirEntreprise/>} />
        <Route path="/projets/assignes" element={<ProjetsAssignes/>} />
        <Route path="/projets/ouverts" element={<ProjetsOuverts/>} />
        <Route path="/postuler/projet/:id" element={<PostulerProjet/>} />
        <Route path="/candidatures/projet/:id" element={<CandidaturesProjets/>} />
        <Route path="/mesCandidatures/projets" element={<MesCandidaturesProjets/>} />
        <Route path="/projet/creer" element={<CreerProjet/>} />
        <Route path="/candidature/stage/:id" element={<CandidatureStage/>} />
        <Route path="/entreprise/offreEmploi" element={<MesOffresEmploi />} />
        <Route path="/entreprise/offreStage" element={<MesOffresStage />} />
        <Route path="/entreprise/candidatures/:id" element={<VoirCandidatures />} />

        <Route path="/candidatur/liste" element={<ListeCandidats/>} />
        <Route path="/dtl" element={<DetailsOffre/>} />
        <Route path="/" element={<Welcome/>} />
        <Route path="/postuler" element={<PostulerPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard/entreprise" element={<EntrepriseDashboard/>} />
        <Route path="/dashboard/stagiaire" element={<StagiaireDashboard/>} />
        <Route path="/dashboard/client" element={<ClientDashboard/>} />
        <Route path="/dashboard/ouvrier" element={<OuvrierDashboard/>} />
        <Route path="/dashboard/partenaire" element={<PartenaireDashboard/>} />
        <Route path="/offre/create/emploi" element={<CreerOffreEmploi/>} />
        <Route path="/offre/create/stage" element={<CreateOffreForm/>} />
        <Route path="/offre/creer/stage" element={<CreerOffreStage/>} />

        <Route path="*" element={<NotFound404/>} />
      </Routes>

    </Router>
  );
};
export default App;