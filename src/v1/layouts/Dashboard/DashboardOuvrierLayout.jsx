import SidebarOuvrier from "../../components/Dashboard/DashboardSidebar/SidebarOuvrier";
import Navbar from "../../components/Dashboard/Navbar";

const DashboardOuvrierLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarOuvrier />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardOuvrierLayout;