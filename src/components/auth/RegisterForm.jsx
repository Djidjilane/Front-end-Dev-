import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to create a new user
    console.log("Email:", email, "Phone:", phone, "Password:", password);
  };

  return (
    <div className="max-w-sm w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Inscription
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-600 mb-2">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Entrez votre numéro de téléphone"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Créer un compte
        </button>
      </form>

      {/* Options */}
      <div className="mt-4 text-center">
        <Link to="/login" className="text-sm text-blue-500 hover:underline">
          Déjà un compte ? Connectez-vous
        </Link>
      </div>

      {/* Social Login */}
      <div className="mt-6 flex flex-col items-center">
        <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mb-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
          S'inscrire avec Google
        </button>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          S'inscrire avec Facebook
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
