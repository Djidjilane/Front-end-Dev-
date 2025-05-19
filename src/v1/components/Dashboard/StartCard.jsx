const StatsCard = ({ title, value, subtext }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-400">{subtext}</p>
      </div>
    );
  };
  
  export default StatsCard;