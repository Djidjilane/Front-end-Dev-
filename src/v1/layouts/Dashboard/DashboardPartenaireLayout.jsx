import SidebarPartenaire from "../../components/Dashboard/DashboardSidebar/SidebarEntreprise";
import Navbar from "../../components/Dashboard/Navbar";

const DashboardPartenaireLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarPartenaire />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardPartenaireLayout;