import React from "react";
import { Link } from "react-router-dom";
const NotFound404 = () => {
  return (
    <div className="bg-black w-full">

      <div className=" flex flex-col w-full  items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-200 text-gray-800">
        <section className="text-center">
          <h1 className="text-8xl font-bold text-red-600 animate__animated animate__fadeIn">
            404
          </h1>
          <h2 className="text-3xl font-semibold mt-4 text-gray-900">
            Oups ! La page que vous recherchez n'existe pas.
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            Il semble que vous soyez perdu. Ne vous inquiétez pas, nous allons vous ramener.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-gradient-to-r from-green-500 to-green-800 text-white px-8 py-4 rounded-lg shadow-sm transition-all transform hover:scale-105"
          >
            Retour à l'accueil
          </Link>
        </section>
      </div>
    </div>

  );
};

export default NotFound404;
