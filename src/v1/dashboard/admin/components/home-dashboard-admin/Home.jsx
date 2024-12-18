import React from "react";
import { FaUsers, FaDollarSign, FaCommentDots } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Données fictives pour le graphique (à remplacer par des données réelles)
const data = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 1890 },
  { name: "Jun", uv: 2390 },
  { name: "Jul", uv: 3490 }
];

const Home = () => {
  return (
    <div className="container px-6 py-6">

      {/* Titre principal */}
      {/* <div className="text-3xl font-bold text-gray-800 mb-6">Bienvenue dans votre Dashboard</div> */}

      {/* Section des statistiques générales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {/* Card Utilisateurs */}
        <div className="bg-gradient-to-r from-[#15803D] to-[#4CAF50] shadow-lg rounded-lg p-6 flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold">Utilisateurs en ligne</h3>
            <p className="text-3xl font-bold">1,250</p>
          </div>
          <div className="p-4 rounded-full bg-white text-[#15803D]">
            <FaUsers size={32} />
          </div>
        </div>

        {/* Card Revenus */}
        <div className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] shadow-lg rounded-lg p-6 flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold">Revenus générés</h3>
            <p className="text-3xl font-bold">$15,000</p>
          </div>
          <div className="p-4 rounded-full bg-white text-[#FFA500]">
            <FaDollarSign size={32} />
          </div>
        </div>

        {/* Card Messages */}
        <div className="bg-gradient-to-r from-[#FF4C4C] to-[#D50032] shadow-lg rounded-lg p-6 flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold">Messages</h3>
            <p className="text-3xl font-bold">35</p>
          </div>
          <div className="p-4 rounded-full bg-white text-[#FF4C4C]">
            <FaCommentDots size={32} />
          </div>
        </div>
      </div>

      {/* Graphique d'activité */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Activité des utilisateurs (par mois)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#15803D" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
