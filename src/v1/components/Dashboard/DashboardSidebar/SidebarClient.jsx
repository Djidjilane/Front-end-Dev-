import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UserIcon,
  UsersIcon,
  BriefcaseIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

const SidebarClient = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { label: 'Profil', icon: UserIcon, path:'/dashboard/client' },
    { label: 'Entreprise', icon: BriefcaseIcon, path:'/entreprise' },
    { label: 'Projets', icon: ClipboardDocumentIcon, path:'/projet/liste' },
    { label: 'Settings', icon: Cog6ToothIcon },
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
      <div className="bg-blue-600 py-2 px-1 text-center rounded mb-4">
        <div className="flex justify-center mb-1">
          <BuildingOffice2Icon className="h-6 w-6 text-white mx-auto" />
        </div>
        {isOpen && (
         <h2 className="font-bold text-white text-sm">
         Recru<span className="text-gray-200">BTP</span>
       </h2>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <link.icon className="h-5 w-5" />
            {isOpen && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarClient;
