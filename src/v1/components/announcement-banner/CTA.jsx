const CTA = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre activité BTP?</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Rejoignez la plateforme premium qui connecte les professionnels du bâtiment et les fournisseurs de matériaux.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="px-3 w-fit py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Inscription Entreprise
          </button>
          <button className="px-3 w-fit py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition">
            Inscription Professionnel
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;