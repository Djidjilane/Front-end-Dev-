
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';

const materials = [
  {
    name: "Ciment Premium",
    supplier: "LafargeHolcim",
    price: "12.50€/sac",
    rating: 4.8,
    image: "/img/ciment.jpeg"
  },
  {
    name: "Briques Rouges",
    supplier: "Wienerberger",
    price: "45€/m²",
    rating: 4.6,
    image: "/img/brique_rouge.jpeg"
  },
  {
    name: "Poutres en Bois",
    supplier: "Piveteau Bois",
    price: "120€/unité",
    rating: 4.9,
    image: "/img/poutre.jpeg"
  }
];

const Materials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Matériaux de Construction</h2>
            <p className="text-gray-600">Les meilleurs produits des fournisseurs certifiés</p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
            Explorer le marché
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-48 overflow-hidden">
                <img 
                  src={material.image} 
                  alt={material.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{material.name}</h3>
                <p className="text-gray-600 mt-1">{material.supplier}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-800">{material.price}</span>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{material.rating}</span>
                  </div>
                </div>
                
                <button className="mt-6 w-full py-2 flex items-center justify-center space-x-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Ajouter au devis</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Materials;