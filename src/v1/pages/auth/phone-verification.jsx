import React from "react";
import LayoutComponent from '../../layouts/LayoutComponent';
import PhoneVerification from "../../components/auth/PhoneVerification";

const PhoneVerificationPage = () => {
    return (
        <LayoutComponent>
            <main className="mx-auto my-24">
            <PhoneVerification/> 
            </main>
        </LayoutComponent>
    );
};

export default PhoneVerificationPage;
