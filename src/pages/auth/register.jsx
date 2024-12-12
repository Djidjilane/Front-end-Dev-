import React from "react";
import LayoutComponent from '../../layouts/LayoutComponent';
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
    return (
        <LayoutComponent>
            <main>
                <RegisterForm />
            </main>
        </LayoutComponent>
    );
};

export default RegisterPage;
