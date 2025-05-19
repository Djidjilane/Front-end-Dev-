import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Bienvenue sur notre plateforme",
    description: "Découvrez des équipes qualifiées dans le BTP.",
    image: "/img/carousel-1.jpg",
  },
  {
    id: 2,
    title: "Trouvez un ouvrier qualifié",
    description: "Maçons, peintres, électriciens, etc.",
    image: "/img/carousel-1.jpg",
  },
  {
    id: 3,
    title: "Travaillez avec des entreprises fiables",
    description: "Des partenaires de confiance partout au Bénin.",
    image: "/img/carousel-3.jpg",
  },
];

const CarouselComponent = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
<div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-md">
        {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-md md:text-lg">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 text-black rounded-full p-2 hover:bg-white"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 text-black rounded-full p-2 hover:bg-white"
      >
        &#10095;
      </button>
    </div>
  );
};

export default CarouselComponent;
