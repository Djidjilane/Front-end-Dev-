import React from "react";
import LayoutComponent from '../../layouts/LayoutComponent';
import OptionForgetPassword from "../../components/auth/OptionForgetPassword";

const OptionForgetPasswordPage = () => {
    return (
        <LayoutComponent>
            <main className="mx-auto my-24">
            <OptionForgetPassword/> 
            </main>
        </LayoutComponent>
    );
};

export default OptionForgetPasswordPage;
