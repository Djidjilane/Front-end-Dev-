import React from 'react';
import LayoutDashboardComponent from '../../layouts/LayoutDashboardComponent'; 
import Home from '../../components/home-dashboard-admin/Home';
const HomePage = () => {
  return (
    <LayoutDashboardComponent>
    <Home/>
    </LayoutDashboardComponent>
  );
};

export default HomePage;
