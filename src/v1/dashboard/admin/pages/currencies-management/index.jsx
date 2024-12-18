import React from 'react';
import LayoutDashboardComponent from '../../layouts/LayoutDashboardComponent'; 
import CurrenciesManagement from '../../components/currencies/CurrenciesManagement';
const CurrenciesManagementPage = () => {
  return (
    <LayoutDashboardComponent>
    <CurrenciesManagement/>
    </LayoutDashboardComponent>
  );
};

export default CurrenciesManagementPage;
