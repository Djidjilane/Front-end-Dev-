import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./v1/pages/auth/login";
import Welcome from "./v1/pages/home";
// import PrivateRoute from './v1/routes/private-route';
// import AdminRoute from './v1/routes/admin-route';
import NotFound404 from "./v1/pages/error-page/404";
import OptionAuthPage from "./v1/pages/auth/option-auth";
import PhoneVerificationPage from "./v1/pages/auth/phone-verification";
import OptionForgetPasswordPage from "./v1/pages/auth/option-forget-password";
import GamesPage from "./v1/pages/games/games-page";
import HomePage from './v1/dashboard/admin/pages/home/index';
import UsersPage from './v1/dashboard/admin/pages/users/index';
import CountryManagementPage from './v1/dashboard/admin/pages/country-management/index';
import CurrenciesManagementPage from './v1/dashboard/admin/pages/currencies-management/index';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard/admin/home" element={<HomePage />} />
        <Route path="/dashboard/admin/users" element={<UsersPage />} />
        <Route path="/dashboard/admin/countries" element={<CountryManagementPage />} />
        <Route path="/dashboard/admin/currencies" element={<CurrenciesManagementPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<LoginPage />} />
        <Route path="/auth/option-auth" element={<OptionAuthPage />} />
        <Route path="/auth/phone-verification" element={<PhoneVerificationPage />} />
        <Route path="/auth/option-forget-password" element={<OptionForgetPasswordPage />} />
        <Route path="/games/games-page" element={<GamesPage />} />
        <Route path="/games/games-page" element={<GamesPage />} />
        {/* <Route path="/auth/forgot-email" element={<LoginPage />} />
      <Route path="/auth/confirm-code" element={<LoginPage />} />
      <Route path="/auth/reset-password" element={<LoginPage />} />
      <Route path="/auth/verify-email" element={<LoginPage />} /> */}

        {/* <Route element={<PrivateRoute />}>
     //les Rooutes  privé ici
      </Route>

      <Route element={<AdminRoute />}>
      // les  routes admin ici  
      </Route>
 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
};

export default App;
