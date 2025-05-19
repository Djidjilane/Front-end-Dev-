import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from "./v1/pages/home/index";
// import PrivateRoute from './v1/routes/private-route';
// import AdminRoute from './v1/routes/admin-route';
import NotFound404 from "./v1/pages/error-page/404";
import Login1 from "./v1/pages/auth/Login";
import Register from "./v1/pages/auth/Register";
import PartenaireDashboard from "./v1/dashboard/user/dashboard_partenaire";
import EntrepriseDashboard from "./v1/dashboard/user/dashboard_entreprise";
import ClientDashboard from "./v1/dashboard/user/dashboard_client";
import OuvrierDashboard from "./v1/dashboard/user/dashboard_ouvrier";
import StagiaireDashboard from "./v1/dashboard/user/dashboard_stagiare";
import ListeOffre from "./v1/pages/Jobs/OffresPage";
import CreateOffreForm from "./v1/pages/Jobs/CreateJobs";
import OffresEntreprise from "./v1/pages/Jobs/OffresEntreprise";
import ListeCandidatures from "./v1/pages/ListeCandidature";
import PostulerPage from "./v1/pages/PostulerPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/postuler" element={<PostulerPage/>} />
        <Route path="/candidature" element={<ListeCandidatures/>} />
        <Route path="/login" element={<Login1/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard/entreprise" element={<EntrepriseDashboard/>} />
        <Route path="/dashboard/stagiaire" element={<StagiaireDashboard/>} />
        <Route path="/dashboard/client" element={<ClientDashboard/>} />
        <Route path="/dashboard/ouvrier" element={<OuvrierDashboard/>} />
        <Route path="/dashboard/partenaire" element={<PartenaireDashboard/>} />
        <Route path="/offre" element={<ListeOffre/>} />
        <Route path="/offre/create" element={<CreateOffreForm/>} />
        <Route path="/offre/entreprise" element={<OffresEntreprise/>} />
        <Route path="*" element={<NotFound404/>} />
      </Routes>
    </Router>
  );
};
export default App;