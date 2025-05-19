

const testimonials = [
  {
    quote: "Cette plateforme nous a permis de trouver des ouvriers qualifiés en un temps record. Un gain de temps considérable!",
    name: "Pierre Dubois",
    role: "Directeur de Chantier, Vinci Construction",
    avatar: "/img/testimonial-2.jpg"
  },
  {
    quote: "En tant que fournisseur, la visibilité apportée par BTPConnect a boosté nos ventes de plus de 30%.",
    name: "Sophie Martin",
    role: "Responsable Commerciale, Saint-Gobain",
    avatar: "/img/testimonial-1.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Témoignages</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ce que nos clients disent de notre plateforme
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl">
              <div className="mb-6">
                <svg className="h-12 w-12 text-blue-100" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-lg text-gray-600 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;