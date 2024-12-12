import React from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/auth/login";
import Welcome from "./pages/home";
// import PrivateRoute from './routes/private-route';
// import AdminRoute from './routes/admin-route';
import NotFound404 from "./pages/error-page/404";
import OptionAuthPage from "./pages/auth/option-auth";
import PhoneVerificationPage from "./pages/auth/phone-verification";
import OptionForgetPasswordPage from "./pages/auth/option-forget-password";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<LoginPage />} />
        <Route path="/auth/option-auth" element={<OptionAuthPage />} />
        <Route path="/auth/phone-verification" element={<PhoneVerificationPage />} />
        <Route path="/auth/option-forget-password" element={<OptionForgetPasswordPage />} />
        {/* <Route path="/auth/forgot-email" element={<LoginPage />} />
      <Route path="/auth/confirm-code" element={<LoginPage />} />
      <Route path="/auth/reset-password" element={<LoginPage />} />
      <Route path="/auth/verify-email" element={<LoginPage />} /> */}
        <Route path="/" element={<Welcome />} />

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
