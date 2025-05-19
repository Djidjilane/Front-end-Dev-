import { useState } from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  BuildingOfficeIcon,
  UserIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  UsersIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

const SidebarOuvrier = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { label: 'Profil', icon: UserIcon },
    { label: 'Projet', icon: ClipboardDocumentIcon },
    { label: 'Entreprise', icon: BriefcaseIcon },
    { label: 'Equipes de projet', icon: UsersIcon },
    { label: 'Projets', icon: ClipboardDocumentIcon },
    { label: 'Settings', icon: Cog6ToothIcon }
  ];

  return (
    <aside
      className={`h-screen bg-white shadow-md p-4 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Toggle button */}
      <div className="flex justify-end mb-2">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900">
          {isOpen ? (
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          ) : (
            <ChevronDoubleRightIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Logo */}
      <div className="bg-blue-400 py-2 px-1 text-center rounded mb-4">
        <div className="flex justify-center mb-1">
          <BuildingOfficeIcon className="h-6 w-6 text-white mx-auto" />
        </div>
        {isOpen && <h2 className="font-bold text-white text-sm">BTPConnect</h2>}
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        {links.map((link, idx) => (
          <a
            key={idx}
            href="#"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <link.icon className="h-5 w-5" />
            {isOpen && <span>{link.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarOuvrier;
