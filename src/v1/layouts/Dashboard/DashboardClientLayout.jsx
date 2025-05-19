import SidebarClient from "../../components/Dashboard/DashboardSidebar/SidebarEntreprise";
import Navbar from "../../components/Dashboard/Navbar";

const DashboardClientLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarClient />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardClientLayout;