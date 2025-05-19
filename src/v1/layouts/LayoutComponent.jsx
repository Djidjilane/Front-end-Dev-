import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../index";



// Définition d'un composant fonctionnel avec un "children" pour inclure le contenu dynamique
const LayoutComponent = ({ children }) => (
  <main className="">
    <div className="text-white">
      {/* Barre de navigation */}
      <Navbar />
      {/* Contenu principal de la page */}
      <main className="pt-16">{children}</main>

      {/* Pied de page */}
      <Footer />
    </div>
  </main>

);

export default LayoutComponent;
