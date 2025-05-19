import DashboardStagiaireLayout from "../../layouts/Dashboard/DashboardStagiaireLayout";
import ChartCard from "../../components/Dashboard/ChartCard";
import StatsCard from "../../components/Dashboard/StartCard";

const StagiaireDashboard = () => {
  return (
    <DashboardStagiaireLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatsCard title="Invoices Awaiting" value="45/76" subtext="$5,569 (55%)" />
        <StatsCard title="Converted Leads" value="48/86" subtext="63% Completed" />
        <StatsCard title="Projects in Progress" value="16/20" subtext="78% Completed" />
        <StatsCard title="Conversion Rate" value="46.59%" subtext="$2,254" />
      </div>

      <ChartCard />
    </DashboardStagiaireLayout>
  );
};

export default StagiaireDashboard;