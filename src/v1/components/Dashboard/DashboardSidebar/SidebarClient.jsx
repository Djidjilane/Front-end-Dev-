
const SidebarClient = () => {
    return (
      <aside className="w-64 h-full bg-white shadow-md p-4">
          <div className="flex items-center">
                    <span className="text-xl font-bold text-blue-600">Recru<span className="text-gray-900">BTP</span></span>
           </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
             Profil
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
             Partenaires Commerciaux
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
             Entreprise
          </a>
          
          
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
             Projets
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
             Settings
          </a>
        </nav>
      </aside>
    );
  };
  
  export default SidebarClient;
  
  