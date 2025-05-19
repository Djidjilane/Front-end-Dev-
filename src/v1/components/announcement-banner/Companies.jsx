const companies = [
  { name: "Bouygues", logo: "/img/about-2.jpg" },
  { name: "Vinci", logo: "/img/service-2.jpg" },
  { name: "Eiffage", logo: "/img/service-3.jpg" },
  { name: "Saint-Gobain", logo: "/img/service-4.jpg" },
  { name: "Klépierre", logo: "/img/service-5.jpg" },
];

const Companies = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-gray-500 text-xl font-semibold mb-10">
          Ils nous font confiance
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-20 w-32 bg-white rounded-lg shadow-sm grayscale hover:grayscale-0 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-full max-h-16 max-w-[100px] object-contain opacity-70 hover:opacity-100 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
