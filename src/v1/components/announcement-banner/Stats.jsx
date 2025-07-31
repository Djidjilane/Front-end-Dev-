const stats = [
  { value: "850+", label: "Professionnels" },
  { value: "120+", label: "Entreprises" },
  //{ value: "3K+", label: "Matériaux" },
  { value: "95%", label: "Satisfaction" }
];

const Stats = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <p className="text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;