import React, { useState, useEffect, useCallback } from "react";

const CarrouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/slide-1.jpg",
    "/images/slide-2.jpg",
    "/images/slide-3.jpg",
    "/images/slide-4.jpg",
  ];

  // Utiliser useCallback pour éviter que nextSlide soit recréée à chaque rendu
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]); // Ajout de images.length dans les dépendances

  // Utiliser useCallback pour éviter que prevSlide soit recréée à chaque rendu
  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]); // Ajout de images.length dans les dépendances

  // Lancer un changement automatique d'image toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3000 ms = 3 secondes

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, [nextSlide]); // Ajout de nextSlide dans les dépendances

  return (
    <section className="relative w-full h-[60vh]">
      <div className="relative container mx-auto h-full overflow-hidden shadow-lg">
        {/* Image du carrousel */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Bouton "Précédent" */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/60 bg-white bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full focus:outline-none"
        >
          ❮
        </button>

        {/* Bouton "Suivant" */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black/60 bg-white bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full focus:outline-none"
        >
          ❯
        </button>

        {/* Indicateurs de position (petites puces en bas) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`block w-3 h-3 rounded-full bg-white ${
                currentIndex === index ? "bg-opacity-75" : "bg-opacity-50"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarrouselComponent;
