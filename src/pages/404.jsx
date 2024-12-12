import React from "react";
import { Link } from "react-router-dom";
import LayoutComponent from "../layouts/LayoutComponent";
const NotFound404 = () => {
  return (

    <LayoutComponent>
      <div className="container flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <section className="text-center">
          <h1 className="text-6xl font-bold text-red-500">404</h1>
          <h2 className="text-2xl font-semibold mt-4">
            Oups ! La page que vous recherchez n'existe pas.
          </h2>
          <p className="mt-2 text-gray-600">
            Il semble que vous soyez perdu. Ne vous inquiétez pas, nous allons
            vous ramener.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Retour à l'accueil 
          </Link>
        </section>
        <div className="mt-8">
          <img
            src="https://via.placeholder.com/400x300?text=404+Not+Found"
            alt="404 Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </LayoutComponent>

  );
};

export default NotFound404;
