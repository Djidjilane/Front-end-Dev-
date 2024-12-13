import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Comment créer un compte sur la plateforme ?",
      answer:
        "Créer un compte est simple ! Il te suffit de cliquer sur 'S'inscrire' en haut à droite de la page d'accueil, puis de suivre les instructions pour compléter ton inscription.",
    },
    {
      question: "Quels jeux sont disponibles sur la plateforme ?",
      answer:
        "Nous proposons une large gamme de jeux : jeux de stratégie, jeux de hasard, jeux de réflexion, et plus encore. Tu peux explorer notre bibliothèque complète en te rendant dans la section 'Jeux'.",
    },
    {
      question: "Est-ce que je peux jouer gratuitement ?",
      answer:
        "Oui ! Beaucoup de jeux sont disponibles en mode démo, ce qui te permet de les essayer gratuitement avant de décider de jouer avec de l'argent réel.",
    },
    {
      question: "Comment effectuer un dépôt ?",
      answer:
        "Pour effectuer un dépôt, rends-toi dans la section 'Caisse' de ton profil et sélectionne ton mode de paiement préféré. Nous acceptons diverses méthodes de paiement.",
    },
    {
      question: "Comment retirer mes gains ?",
      answer:
        "Les retraits peuvent être effectués via le même mode de paiement que celui utilisé pour le dépôt. Va dans la section 'Caisse', choisis 'Retirer', puis suis les instructions.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="lg:max-w-6xl lg:mx-auto lg:p-0 p-4">
        <h2 className="text-3xl font-semibold text-center text-[#15803D] mb-8">
          Foire Aux Questions (FAQ)
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-md transform transition duration-300 hover:shadow-xl">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center bg-[#7bcd99] text-white rounded-t-md focus:outline-none"
              >
                <span>{item.question}</span>
                <svg
                  className={`w-5 h-5 transform ${activeIndex === index ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden px-6 text-gray-700 ${
                  activeIndex === index ? "h-auto opacity-100" : "h-0 opacity-0"
                }`}
                style={{ transitionProperty: 'height, opacity' }}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
