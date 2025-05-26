import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const getImage = (image) => (image && image !== '' ? image : '/images/default.jpg');

const DetailProduit = () => {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/produits/${id}`);
        setProduit(res.data);
      } catch (error) {
        setErreur("Produit non trouvé.");
      }
    };

    fetchProduit();
  }, [id]);

  if (erreur) {
    return (
      <div className="p-6 text-center text-red-500 text-lg">
        {erreur}
        <div className="mt-4">
          <Link to="/produits" className="text-blue-600 hover:underline text-sm">
            ← Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  if (!produit) {
    return <div className="p-6 text-center text-gray-500">Chargement du produit...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/produits" className="flex items-center text-sm text-blue-600 hover:underline mb-4">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Retour à la liste
      </Link>

      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
        <img
          src={getImage(produit.image)}
          alt={produit.nom}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <ShoppingBagIcon className="h-6 w-6 text-indigo-600" />
            {produit.nom}
          </h2>

          <p className="text-gray-600 mb-1 flex items-center gap-1">
            <InformationCircleIcon className="h-4 w-4 text-gray-400" />
            {produit.description}
          </p>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Type :</span> {produit.type}
          </p>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Fournisseur :</span> {produit.fournisseur}
          </p>

          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Localisation :</span> {produit.localisation}
          </p>

          <p className="text-lg font-semibold text-green-600 flex items-center gap-1 mt-2">
            <CurrencyDollarIcon className="h-5 w-5" />
            {produit.prix}
          </p>

          <p className={`mt-2 text-sm font-medium flex items-center gap-1 ${
            produit.enStock ? 'text-green-600' : 'text-red-500'
          }`}>
            <CheckCircleIcon className="h-4 w-4" />
            {produit.enStock ? 'Disponible' : 'Rupture de stock'}
          </p>

          <button
            disabled={!produit.enStock}
            className={`mt-4 px-4 py-2 rounded text-white text-sm font-medium ${
              produit.enStock
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduit;
