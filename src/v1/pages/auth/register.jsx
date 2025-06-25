import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  AcademicCapIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const userTypes = [
  { value: 'entreprise', label: 'Entrepreneur', icon: <BuildingOfficeIcon className="h-5 w-5" /> },
  { value: 'ouvrier', label: 'Ouvrier', icon: <UserIcon className="h-5 w-5" /> },
  { value: 'client', label: 'Client', icon: <LockClosedIcon className="h-5 w-5" /> },
  { value: 'partenaire', label: 'Partenaire', icon: <IdentificationIcon className="h-5 w-5" /> },
  { value: 'stagiaire', label: 'Stagiaire', icon: <AcademicCapIcon className="h-5 w-5" /> },

];

const Register = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    const userData = {
      nom,
      prenom,
      email,
      telephone,
      password,
      type: userType,
    };

    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setErreur('');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // ← stocker user
        const role = data.user?.role || userType;
        if (role === 'entreprise') {
          navigate('/entreprise/profil');
        } else if (role === 'partenaire') {
          navigate('/partenaire/profil');
        } else if (role === 'ouvrier') {
          navigate('/ouvrier/profil');
        } else if (role === 'stagiaire') {
          navigate('/stagiaire/profil');
        } else {
          navigate('/');
        }
              } else {
        setMessage('');
        setErreur(data.erreur || 'Erreur inconnue');
      }
    } catch (error) {
      setMessage('');
      setErreur('Erreur réseau ou serveur injoignable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-blue-400 py-4 px-8 text-center">
            <div className="flex justify-center mb-4">
              <BuildingOfficeIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Créez un compte BTPConnect</h2>
            <p className="text-blue-100 mt-1">Rejoignez-nous dans votre espace professionnel</p>
          </div>

          <form onSubmit={handleRegister} className="p-8 space-y-5">
            {/* Erreur / Succès */}
            {erreur && <p className="text-red-500 text-sm">{erreur}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}

            {/* Nom + Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Nom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Prénom(s)</label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">Adresse Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="text-sm text-gray-700">Téléphone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\+?\d{0,15}$/.test(value)) setTelephone(value);
                  }}
                  required
                  maxLength={16}
                  placeholder="+229 XXXXXXXX"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Type utilisateur */}
            <div>
              <label className="text-sm text-gray-700">Vous êtes</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                {userTypes.map((type) => (
                  <div key={type.value}>
                    <input
                      type="radio"
                      id={type.value}
                      name="userType"
                      value={type.value}
                      checked={userType === type.value}
                      onChange={(e) => setUserType(e.target.value)}
                      className="hidden"
                    />
                    <label
                      htmlFor={type.value}
                      className={`flex items-center justify-center p-2 border rounded-md cursor-pointer transition text-sm ${
                        userType === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="mr-2">{type.icon}</span>
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Password + Confirmation */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Confirmer</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* CGU */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
                className="h-4 w-4 text-blue-600 mt-1"
              />
              <label className="ml-2 text-sm text-gray-700">
                J'accepte les{' '}
                <Link className="text-blue-600 hover:underline" to="#">
                  Conditions d'utilisation
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-sm font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Création en cours...' : 'Créer un compte'}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 text-center text-sm text-gray-600 py-4 border-t">
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
