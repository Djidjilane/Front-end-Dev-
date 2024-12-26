import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaBars, FaChevronLeft } from "react-icons/fa"; // Import explicite des icônes
import { Bell, Ratio, Gift, BotMessageSquare,CircleDollarSign,Flag, LogOut, ShieldCheck, Settings, Gamepad2 } from "lucide-react"; // Autres icônes
import { sidebarLinks } from "../components/Data"; // Import des données dynamiques

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // État initial pour la sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Fonction de basculement
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed inset-0 md:relative bg-gradient-to-r from-[#15803D] to-[#7bcd99] text-white transition-all duration-300 z-60 
      ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Sidebar Header avec le bouton de basculement */}
        <div className="flex items-center justify-between p-4">
          <span className={`text-xl font-semibold ${!isSidebarOpen && 'hidden'}`}>betkos</span>
          <button onClick={toggleSidebar} className="text-white p-2 rounded-md md:block">
            {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
          </button>
        </div>

        {/* Liens de la Sidebar */}
        <nav className="flex flex-col h-screen">
          {sidebarLinks.map((link, index) => {
            // Utilisation de l'icône correspondante directement depuis les imports
            let Icon;
            switch (link.icon) {
              case "FaHome":
                Icon = FaHome;
                break;
              case "FaUserAlt":
                Icon = FaUserAlt;
                break;
              case "Flag":
                Icon = Flag;
                break;
              case "CircleDollarSign":
                Icon = CircleDollarSign;
                break;
              case "Gamepad2":
                Icon = Gamepad2;
                break;
              case "Bell":
                Icon = Bell;
                break;
              case "Gift":
                Icon = Gift;
                break;
              case "Ratio":
                Icon = Ratio;
                break;
              case "Settings":
                Icon = Settings;
                break;
              case "ShieldCheck":
                Icon = ShieldCheck;
                break;
              case "BotMessageSquare":
                Icon = BotMessageSquare;
                break;
              case "LogOut":
                Icon = LogOut;
                break;
              default:
                Icon = FaUserAlt; 
                break;
            }

            return (
              <Link
                key={index}
                to={link.to}
                className="flex items-center p-3 px-6 hover:bg-white text-white hover:text-[#15803D] transition-colors"
              >
                <Icon className="mr-3" />
                <span className={`${!isSidebarOpen && 'hidden'}`}>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
