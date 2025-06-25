import { useEffect, useState } from "react";
import { ClockIcon, MapPinIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import axiosInstance from "../../../api/axiosInstance";

const JobOffers = () => {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    axiosInstance.get("/offres/recents")
      .then((res) => {
        // Ici res.data est un tableau d'offres
        const data = res.data.map((offre) => ({
          title: offre.projet,
          company: offre.description,
          location: offre.lieu,
          date_limite: offre.date_limite,
         /* type: 'CDI',          // par défaut
          salary: 'À négocier', // par défaut
          urgent: false         // par défaut*/
        }));
        setOffres(data);
      })
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Offres d'emploi</h2>
            <p className="text-gray-600">Les dernières opportunités dans le BTP</p>
          </div>
          <Link to="/offre/emploi">
            <button className="mt-4 px-6 w-fit md:mt-0 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
              Voir toutes les offres
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offres.length === 0 && (
            <p className="text-gray-500">Aucune offre disponible actuellement.</p>
          )}
          {offres.map((offre, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">{offre.title}</h3>
                  {offre.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Urgent</span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{offre.company}</p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{offre.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>{offre.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CurrencyEuroIcon className="h-5 w-5 mr-2" />
                    <span>{offre.salary} annuel</span>
                  </div>
                </div>
                
                <button className="px-3 w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Postuler maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobOffers;
