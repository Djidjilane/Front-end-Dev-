import React from "react";
import Header from './Header';  
import Footer from './Footer';  
import SideBar from './SideBar';
const LayoutDashboardComponent = ({ children }) => {
  return (
    <div className="flex h-screen bg-white relative">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-white">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutDashboardComponent;
