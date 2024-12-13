import React, { useEffect, useState } from 'react';

// Composant pour afficher un seul témoignage
const TestimonialCard = ({ text, userName, rating, profilePicture, location, email }) => {
  // Fonction pour masquer une partie de l'email
  const maskEmail = (email) => {
    const emailParts = email.split('@');
    const localPart = emailParts[0];
    const domainPart = emailParts[1];

    // Masquer les 4 premiers caractères du local part de l'email
    const maskedLocalPart = localPart.slice(0, 4) + '****';
    return `${maskedLocalPart}@${domainPart}`;
  };

  return (
    <div className="testimonial bg-white lg:p-6 p-4  rounded-lg shadow-lg lg:w-1/3 w-full">
      <div className="flex items-center mb-4">
        <img
          src={profilePicture}
          alt={`${userName}'s profile`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="text-md font-semibold">{userName}</p>
          <p className="text-sm text-gray-600">{location}</p> {/* Afficher la localisation */}
        </div>
      </div>
      <p className="text-lg text-black/60 italic">"{text}"</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">
          {"⭐".repeat(rating)} {/* Dynamique pour afficher les étoiles */}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">Contact: {maskEmail(email)}</p> {/* Afficher l'email masqué */}
    </div>
  );
};

// Composant principal des témoignages
const Testimonial = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer des données d'utilisateur aléatoire via l'API RandomUser
    const fetchTestimonials = async () => {
      try {
        // Récupérer 3 utilisateurs
        const response = await fetch('https://randomuser.me/api/?results=3');
        const data = await response.json();

        // Liste de messages de témoignages divers
        const testimonialsMessages = [
          "Ce site m'a changé la vie ! J'ai gagné plusieurs fois et l'expérience est top. Je viens de {city} et je suis ravi !",
          "J'adore ce site ! L'interface est super et les gains sont réguliers. Tout le monde autour de moi en parle. Venant de {city}, je recommande à 100%.",
          "Un excellent site avec une expérience de jeu fluide et sécurisée. J'ai réussi à retirer mes gains facilement. Je suis de {city} et je le recommande à tous !",
          "Le site est fiable et les jeux sont variés. J'ai fait plusieurs retraits et tout s'est bien passé. Je suis de {city}, un site à ne pas manquer !",
          "J'ai passé un super moment à jouer ici. Je suis basé à {city}, et je suis totalement satisfait des services proposés par cette plateforme."
        ];

        // Transformer les données des utilisateurs et personnaliser les témoignages
        const testimonials = data.results.map(user => {
          const randomMessage = testimonialsMessages[Math.floor(Math.random() * testimonialsMessages.length)];
          const personalizedMessage = randomMessage.replace("{city}", user.location.city); // Remplacer la ville dans le message

          return {
            text: personalizedMessage,
            userName: `${user.name.first} ${user.name.last}`,
            rating: Math.floor(Math.random() * 5) + 1, // Note aléatoire entre 1 et 5
            profilePicture: user.picture.medium, // Image de profil
            location: `${user.location.city}, ${user.location.country}`, // Ville et pays
            email: user.email, // Email de l'utilisateur
          };
        });

        setTestimonialsData(testimonials); // Mettre à jour les données des témoignages
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchTestimonials();
  }, []); // Le useEffect se déclenche une seule fois lors du montage du composant

  return (
    <section className="testimonials py-8 bg-gray-200">
      <h2 className="text-3xl font-semibold text-[#15803D] text-center mb-6">
        Ce que disent nos joueurs
      </h2>

      <div className="flex flex-col sm:flex-row justify-center lg:max-w-6xl w-full lg:p-0 p-4 lg:mx-auto space-y-6 sm:space-y-0 lg:space-x-6">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            text={testimonial.text}
            userName={testimonial.userName}
            rating={testimonial.rating}
            profilePicture={testimonial.profilePicture}
            location={testimonial.location}
            email={testimonial.email}
          />
        ))}
      </div>
    </section>

  );
};

export default Testimonial;
