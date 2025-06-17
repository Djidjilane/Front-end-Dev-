import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://192.168.1.38:8000/api/forgot-password', { email });
      setMessage(response.data.message);
      onSuccess(email); // Avancer vers la vérification du code
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’envoi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Mot de passe oublié</h2>
      <input
        type="email"
        placeholder="Votre adresse email"
        className="border rounded p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Envoyer le code
      </button>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default ForgotPassword;
