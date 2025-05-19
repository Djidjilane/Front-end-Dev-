import Navbar from "../../components/Dashboard/Navbar";
import SidebarStagiaire from "../../components/Dashboard/DashboardSidebar/SidebarStagiaire";
const DashboardStagiaireLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarStagiaire />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardStagiaireLayout;