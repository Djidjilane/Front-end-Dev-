import {
    ShoppingBagIcon,
    CurrencyDollarIcon,
    InformationCircleIcon,
    PlusCircleIcon,
    CheckCircleIcon,
  } from '@heroicons/react/24/solid';
  import { Link } from 'react-router-dom';
  
  const ListeProduits = () => {
    const Produits = [
      {
        id: 1,
        nom: 'BTP Services Plus',
        prix: '55 555 FCFA',
        type: 'Construction',
        description: 'Service professionnel dans le BTP.',
        image: '/images/btp1.jpg',
        enStock: true,
      },
      {
        id: 2,
        nom: 'Élite Béton',
        prix: '44 400 FCFA',
        type: 'Béton & Matériaux',
        description: 'Fournisseur de béton prêt à l’emploi.',
        image: '/images/beton.jpg',
        enStock: true,
      },
      {
        id: 3,
        nom: 'Martaux',
        prix: '10 000 FCFA',
        type: 'Génie Civil',
        description: 'Matériaux de génie civil de qualité.',
        image: '',
        enStock: false,
      },
    ];
  
    const getImage = (image) => image && image !== '' ? image : '/images/default.jpg';
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Liste des Produits</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Produits.map((Produit) => (
            <div
              key={Produit.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <img
                src={getImage(Produit.image)}
                alt={Produit.nom}
                className="w-full h-40 object-cover"
              />
  
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBagIcon className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-700">{Produit.nom}</h2>
                </div>
  
                <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                  <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                  {Produit.description}
                </p>
  
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">Type :</span> {Produit.type}
                </p>
  
                <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                  <CurrencyDollarIcon className="h-4 w-4 text-green-500" />
                  {Produit.prix}
                </p>
  
                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-xs font-semibold flex items-center gap-1 ${Produit.enStock ? 'text-green-600' : 'text-red-500'}`}>
                    <CheckCircleIcon className="h-4 w-4" />
                    {Produit.enStock ? 'En stock' : 'Rupture'}
                  </span>
  
                  <button
                    disabled={!Produit.enStock}
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded transition ${
                      Produit.enStock
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <PlusCircleIcon className="h-4 w-4" />
                    Ajouter au panier
                  </button>
                </div>
  
                <div className="mt-3">
                  <Link
                    to={`/produits/dtl/${Produit.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Voir les détails →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ListeProduits;
  