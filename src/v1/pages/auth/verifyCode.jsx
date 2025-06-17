import React, { useState } from 'react';
import axios from 'axios';

const VerifyCode = ({ email, onVerified }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('/api/verify-reset-code', { email, code });
      setMessage(response.data.message);
      onVerified(code); // Passer à la réinitialisation du mot de passe
    } catch (err) {
      setError(err.response?.data?.message || 'Code invalide.');
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <h2 className="text-xl font-bold">Vérification du code</h2>
      <input
        type="text"
        placeholder="Code reçu par mail"
        maxLength={5}
        className="border rounded p-2 w-full"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Vérifier le code
      </button>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default VerifyCode;
