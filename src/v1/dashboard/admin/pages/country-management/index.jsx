import React from 'react';
import LayoutDashboardComponent from '../../layouts/LayoutDashboardComponent'; 
import CountryManagement from '../../components/countries/CountryManagement';
const CountryManagementPage = () => {
  return (
    <LayoutDashboardComponent>
    <CountryManagement/>
    </LayoutDashboardComponent>
  );
};

export default CountryManagementPage;
