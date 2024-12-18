import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaUserShield } from 'react-icons/fa';

const Users = () => {
  // Liste simulée d'utilisateurs
  const [users, setUsers] = useState([
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', status: 'Actif' },
    { id: 2, name: 'Marie Martin', email: 'marie@example.com', status: 'Inactif' },
    { id: 3, name: 'Paul Durand', email: 'paul@example.com', status: 'Actif' },
    { id: 4, name: 'Sophie Lefevre', email: 'sophie@example.com', status: 'Inactif' },
  ]);

  const handleDelete = (userId) => {
    // Simule la suppression d'un utilisateur
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEdit = (userId) => {
    // Logique d'édition à implémenter
    console.log('Éditer l\'utilisateur', userId);
  };

  const handleView = (userId) => {
    // Logique de visualisation des détails à implémenter
    console.log('Voir les détails de l\'utilisateur', userId);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      {/* Titre */}
      <div className="text-3xl font-bold text-gray-800 mb-6">Liste des Utilisateurs</div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.status}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleView(user.id)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    <FaUserShield size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-yellow-500 hover:text-yellow-700 mr-4"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
