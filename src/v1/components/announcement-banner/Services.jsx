
import { BriefcaseIcon, BuildingLibraryIcon, ChartBarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const services = [
  {
    icon: <BriefcaseIcon className="h-10 w-10 text-blue-600" />,
    title: "Recrutement Ciblé",
    description: "Trouvez les ouvriers qualifiés dont vous avez besoin pour vos projets."
  },
  {
    icon: <BuildingLibraryIcon className="h-10 w-10 text-blue-600" />,
    title: "Matériaux Premium",
    description: "Accédez à un catalogue de matériaux de construction de qualité."
  },
  {
    icon: <ChartBarIcon className="h-10 w-10 text-blue-600" />,
    title: "Visibilité Accrue",
    description: "Augmentez la visibilité de votre entreprise auprès des professionnels."
  },
  {
    icon: <CheckBadgeIcon className="h-10 w-10 text-blue-600" />,
    title: "Confiance & Sécurité",
    description: "Plateforme vérifiée avec des professionnels et fournisseurs certifiés."
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Services Clés</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une solution complète pour répondre à tous les besoins du secteur BTP
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;