import { ArrowRightIcon,  BuildingStorefrontIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-gray-50 py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            La plateforme premium du <span className="text-blue-600">BTP</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Connectez les talents aux opportunités  de construction.
            Une solution complète pour les professionnels du bâtiment.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/offre/emploi" >
              <button className="px-3 w-fit py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center">
                Trouver un emploi <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </Link>
            {/*<button className="px-3 w-fit py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition flex items-center justify-center">
              Voir les matériaux <BuildingStorefrontIcon className="ml-2 h-5 w-5" />
            </button>*/}
          </div>
        </div>
        
        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative">
              <img 
                src="/img/project-2.jpg" 
                alt="Construction professionals" 
                className="rounded-lg shadow-xl object-cover w-full h-96"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md w-3/4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <UserGroupIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">+85 Professionnels</p>
                    <p className="text-sm text-gray-500">Actifs sur la plateforme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;