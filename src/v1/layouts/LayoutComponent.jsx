import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../index";
import Notification from "./Notification";



// Définition d'un composant fonctionnel avec un "children" pour inclure le contenu dynamique
const LayoutComponent = ({ children }) => (
  <main className="">
    <div className="text-white">
      {/* <Notification message="🚀 Nouveau jeu disponible! Jouez maintenant et gagnez des récompenses!" /> */}
      {/* Barre de navigation */}
      <Navbar />
      {/* Contenu principal de la page */}
      <main className="content">{children}</main>

      {/* Pied de page */}
      <Footer />
    </div>
  </main>

);

export default LayoutComponent;
