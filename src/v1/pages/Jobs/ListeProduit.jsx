import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    ShoppingBagIcon,
    CurrencyDollarIcon,
    InformationCircleIcon,
    PlusCircleIcon,
    CheckCircleIcon,
  } from '@heroicons/react/24/solid';
  import { Link } from 'react-router-dom';
  
  const ListeProduits = () => {
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreur, setErreur] = useState(null);
  
    const getImage = (image) => (image && image !== '' ? image : '/images/default.jpg');
  
    useEffect(() => {
      axios
        .get('http://localhost:8000/api/produits') 
        .then((res) => {
          setProduits(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setErreur('Erreur lors du chargement des produits');
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div className="p-6 text-gray-600">Chargement des produits...</div>;
    }
  
    if (erreur) {
      return <div className="p-6 text-red-600">{erreur}</div>;
    }
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Liste des Produits</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.map((produit) => (
            <div
              key={produit.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <img
                src={getImage(produit.image)}
                alt={produit.nom}
                className="w-full h-40 object-cover"
              />
  
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBagIcon className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-700">{produit.nom}</h2>
                </div>
  
                <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                  <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                  {produit.description}
                </p>
  
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium text-gray-700">Type :</span> {produit.type}
                </p>
  
                <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                  <CurrencyDollarIcon className="h-4 w-4 text-green-500" />
                  {produit.prix}
                </p>
  
                <div className="flex items-center justify-between mt-auto">
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      produit.enStock ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    {produit.enStock ? 'En stock' : 'Rupture'}
                  </span>
  
                  <button
                    disabled={!produit.enStock}
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded transition ${
                      produit.enStock
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
                    to={`/produits/dtl/${produit.id}`}
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
  