import React from "react";
import LayoutComponent from '../../layouts/LayoutComponent';
import OptionAuth from "../../components/auth/OptionAuth";

const OptionAuthPage = () => {
    return (
        <LayoutComponent>
            <main className="bg-gray-200 mx-auto ">
            <OptionAuth/> 
            </main>
        </LayoutComponent>
    );
};

export default OptionAuthPage;
