import React from "react";
import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';

const LayoutDashboardComponent = ({ children }) => {
  return (
    <div className="flex h-screen overflow-y-auto bg-white relative">
      {/* Sidebar fixe */}
      <div className="sticky top-0 w-64">
        <SideBar />
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Header fixe */}
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Contenu principal scrollable */}
        <main className="flex-1  shadow-md   max-w-7xl bg-white">
          {children}
        </main>

        {/* Footer */}
        <div className="sticky bottom-0 z-10">
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboardComponent;
