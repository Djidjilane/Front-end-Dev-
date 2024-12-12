import React from "react";
import LayoutComponent from "../../layouts/LayoutComponent";
import OptionLoginForm from "../../components/auth/OptionLoginForm";
const LoginPage = () => {
  return (
    <LayoutComponent>
      <main className="mx-auto my-6">
        <OptionLoginForm />
      </main>
    </LayoutComponent>
  );
};

export default LoginPage;
