import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OptionForgetPassword = () => {
    const [activeTab, setActiveTab] = useState("email"); // Onglet actif
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // État pour le chargement

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (activeTab === "email") {
            if (!email) {
                setError("Le champ est requis.");
                return;
            }
        } else {
            if (!phone) {
                setError("Le champ est requis.");
                return;
            }
        }

        setError(""); // Réinitialiser les erreurs
        setIsLoading(true); // Activer le chargement

        // Simuler une requête API
        setTimeout(() => {
            setIsLoading(false); // Désactiver le chargement
            toast.success(
                `Votre demande de récupération a été envoyée avec succès via ${activeTab === "email" ? "votre e-mail" : "votre téléphone"
                }. Veuillez vérifier votre boîte de réception.`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        }, 5000);
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-md p-6 relative">
            {/* Titre */}
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
                Récupération de mot de passe
            </h2>
            {/* Étapes */}
            <div className="flex justify-center items-center mb-6">
                <div className="w-6 h-6 bg-[#15803D] rounded-full flex items-center justify-center">
                    <span className="block w-2.5 h-2.5 bg-white rounded-full"></span>
                </div>
                <div className="flex-grow h-1 bg-gray-300 mx-2"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="block w-2.5 h-2.5 bg-white rounded-full"></span>
                </div>
            </div>
            {/* Onglets */}
            <div className="flex mb-4">
                <button
                    className={`flex-1 py-2 text-sm font-medium border-b-2 ${activeTab === "email"
                            ? "border-[#15803D] text-[#15803D]"
                            : "border-gray-300 text-gray-500"
                        }`}
                    onClick={() => setActiveTab("email")}
                >
                    Par e-mail
                </button>
                <button
                    className={`flex-1 py-2 text-sm font-medium border-b-2 ${activeTab === "phone"
                            ? "border-[#15803D] text-[#15803D]"
                            : "border-gray-300 text-gray-500"
                        }`}
                    onClick={() => setActiveTab("phone")}
                >
                    Par téléphone
                </button>
            </div>
            {/* Formulaire */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    {activeTab === "email" ? (
                        <>
                            <label
                                htmlFor="email"
                                className="block text-sm text-gray-600 mb-1"
                            >
                                Saisissez l'adresse e-mail utilisée lors de votre inscription
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Votre e-mail*"
                                className={`w-full border rounded-md px-4 py-2 focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </>
                    ) : (
                        <>
                            <label
                                htmlFor="phone"
                                className="block text-sm text-gray-600 mb-1"
                            >
                                Saisissez le numéro de téléphone utilisé lors de votre
                                inscription
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Votre téléphone*"
                                className={`w-full border rounded-md px-4 py-2 focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </>
                    )}
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-sm py-2 rounded-md transition ${isLoading
                            ? "bg-[#15803D] text-white cursor-not-allowed"
                            : "bg-[#15803D] text-white hover:bg-green-600"
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></div>
                            <span className="ml-2">Chargement...</span>
                        </div>
                    ) : (
                        "ENVOYER"
                    )}
                </button>
            </form>
            {/* ToastContainer */}
            <ToastContainer
                style={{ marginTop: "40px",width:"50%" }}
            />
        </div>
    );
};

export default OptionForgetPassword;
