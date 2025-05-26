import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from "./v1/pages/home/index";
import ContactForm from "./v1/pages/ContactForm";
// import PrivateRoute from './v1/routes/private-route';
// import AdminRoute from './v1/routes/admin-route';
import OffresEmploisEntreprise from "./v1/pages/Jobs/OffresEmploisEntreprise";
import OffresStagesEntreprise from "./v1/pages/Jobs/OffresStageEntreprise";
import CreerOffreEmploi from "./v1/pages/Jobs/CreateOffreEmploi";
import DetailsOffre from "./v1/pages/Jobs/DetailOffre";
import NotFound404 from "./v1/pages/error-page/404";
import Login1 from "./v1/pages/auth/Login";
import Register from "./v1/pages/auth/Register";
import PartenaireDashboard from "./v1/dashboard/user/dashboard_partenaire";
import EntrepriseDashboard from "./v1/dashboard/user/dashboard_entreprise";
import ClientDashboard from "./v1/dashboard/user/dashboard_client";
import OuvrierDashboard from "./v1/dashboard/user/dashboard_ouvrier";
import StagiaireDashboard from "./v1/dashboard/user/dashboard_stagiare";
//import ListeOffre from "./v1/pages/Jobs/OffresPage";
import CreateOffreForm from "./v1/pages/Jobs/CreateOffreStage";
//import OffresEntreprise from "./v1/pages/Jobs/OffresEntreprise";
import PostulerPage from "./v1/pages/PostulerPage";
import FormulaireCandidature from "./v1/pages/Jobs/FormulaireCandidature";
import CreerProjet from "./v1/pages/Jobs/CreateProjet";
import ListeProjets from "./v1/pages/Jobs/ListeProjet";
import ListeCandidats from "./v1/pages/Jobs/ListeCandidature";
import ListeEntreprises from "./v1/pages/Jobs/Listeentreprise" 
import ListePartenaires from "./v1/pages/Jobs/ListePartnaire";
import ProfilUtilisateur from "./v1/pages/Jobs/UserProfil";
import ListeProduits from "./v1/pages/Jobs/ListeProduit";
import DetailProduit from "./v1/pages/Jobs/DetailProduit";
import AjouterProduit from "./v1/pages/Jobs/AjoutProduits";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/produits/créer" element={<AjouterProduit />} />
        <Route path="/partenaires" element={<ListePartenaires />} />
        <Route path="/produits" element={<ListeProduits />} />
        <Route path="/produits/:id" element={<DetailProduit />} />
        <Route path="/profil" element={<ProfilUtilisateur />} />
        <Route path="/entreprise" element={<ListeEntreprises />} />
        <Route path="/offre/stage" element={<OffresStagesEntreprise />} />
        <Route path="/offre/entreprise" element={<OffresEmploisEntreprise />} />
        <Route path="/projet/liste" element={<ListeProjets/>} />
        <Route path="/projet" element={<CreerProjet/>} />
        <Route path="/candidatur/liste" element={<ListeCandidats/>} />
        <Route path="/dtl" element={<DetailsOffre/>} />
        <Route path="/formul" element={<FormulaireCandidature/>} />
        <Route path="/" element={<Welcome/>} />
        <Route path="/postuler" element={<PostulerPage/>} />
        <Route path="/login" element={<Login1/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard/entreprise" element={<EntrepriseDashboard/>} />
        <Route path="/dashboard/stagiaire" element={<StagiaireDashboard/>} />
        <Route path="/dashboard/client" element={<ClientDashboard/>} />
        <Route path="/dashboard/ouvrier" element={<OuvrierDashboard/>} />
        <Route path="/dashboard/partenaire" element={<PartenaireDashboard/>} />
        <Route path="/offre/create/emploi" element={<CreerOffreEmploi/>} />
        <Route path="/offre/create/stage" element={<CreateOffreForm/>} />
        <Route path="*" element={<NotFound404/>} />
      </Routes>

    </Router>
  );
};
export default App;