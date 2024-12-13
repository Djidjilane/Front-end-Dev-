const GamePreview = () => {
    const games = [
        {
            id: 1,
            title: "Jeu de Stratégie 1",
            description: "Un jeu palpitant où chaque mouvement compte. Teste ta stratégie et domine le plateau.",
            image: "/images/game1.jpg",
            link: "#",
        },
        {
            id: 2,
            title: "Jeu de Casino",
            description: "Les cartes sont entre tes mains. Joue aux jeux de casino classiques et tente ta chance !",
            image: "/images/game2.jpg",
            link: "#",
        },
        {
            id: 3,
            title: "Jeu de Réflexion",
            description: "Teste ton esprit avec ce jeu de réflexion. Chaque niveau est plus complexe que le précédent !",
            image: "/images/game3.jpg",
            link: "#",
        },
        {
            id: 4,
            title: "Jeu d'Aventure",
            description: "Pars à l'aventure ! Résous des énigmes et découvre des trésors cachés.",
            image: "/images/game5.jpg",
            link: "#",
        },
        {
            id: 5,
            title: "Jeu de Puzzle",
            description: "Des puzzles captivants pour tester ta logique et ta persévérance.",
            image: "/images/game6.jpg",
            link: "#",
        },
        {
            id: 6,
            title: "Jeu de Sports",
            description: "Affronte d'autres joueurs dans ce jeu sportif intense et fais tes preuves !",
            image: "/images/game7.jpg",
            link: "#",
        },
        {
            id: 7,
            title: "Jeu de Combat",
            description: "Prépare-toi à des batailles épiques dans ce jeu de combat dynamique.",
            image: "/images/game8.jpg",
            link: "#",
        },
        {
            id: 8,
            title: "Jeu de Simulation",
            description: "Simule ta vie dans un monde virtuel et fais des choix cruciaux.",
            image: "/images/game9.jpg",
            link: "#",
        },
        // {
        //     id: 9,
        //     title: "Jeu de Course",
        //     description: "Prends le volant et participe à des courses effrénées sur des circuits mondiaux.",
        //     image: "/images/game10.jpg",
        //     link: "#", 
        //   },
        //   {
        //     id: 10,
        //     title: "Jeu de Puzzle en 3D",
        //     description: "Résous des puzzles complexes dans un environnement 3D captivant et immersif.",
        //     image: "/images/game4.jpg",
        //     link: "#",
        //   },
    ];


    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-[#15803D] mb-8">
                    Aperçu des Jeux
                </h2>
                <div className="grid grid-cols-1 lg:p-0 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <div key={game.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 active:scale-95">
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="text-xl font-semibold text-gray-800">{game.title}</h3>
                                <p className="text-gray-600 text-sm mt-2">{game.description}</p>
                                <div className="flex justify-end">
                                    <a
                                        href={game.link}
                                        className="mt-4 inline-block  text-white py-2 px-4 rounded-md text-cente bg-gradient-to-r from-[#15803D] to-green-600 hover:scale-105 transform transition duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 active:scale-95">
                                        Jouer
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GamePreview;
