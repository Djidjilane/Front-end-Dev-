import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ email, code }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', {
        email,
        code,
        password,
        password_confirmation: confirm,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation.');
    }
  };

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <h2 className="text-xl font-bold">Nouveau mot de passe</h2>
      <input
        type="password"
        placeholder="Nouveau mot de passe"
        className="border rounded p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmez le mot de passe"
        className="border rounded p-2 w-full"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Réinitialiser le mot de passe
      </button>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default ResetPassword;
