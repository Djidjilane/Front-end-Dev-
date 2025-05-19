import { useState } from 'react';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  AcademicCapIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const Register = () => {
  const [form, setForm] = useState({
    userType: 'client',
    acceptedTerms: false,
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    { value: 'client', label: 'Client', icon: <UserIcon className="h-5 w-5" /> },
    { value: 'entreprise', label: 'Entreprise', icon: <BuildingOfficeIcon className="h-5 w-5" /> },
    { value: 'ouvrier', label: 'Ouvrier', icon: <IdentificationIcon className="h-5 w-5" /> },
    { value: 'partenaire', label: 'Partenaire', icon: <UserIcon className="h-5 w-5" /> },
    { value: 'stagiaire', label: 'Stagiaire', icon: <AcademicCapIcon className="h-5 w-5" /> },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(form);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-fit max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-400 py-4 px-8 text-center">
            <div className="flex justify-center mb-4">
              <BuildingOfficeIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Créez un compte BTPConnect</h2>
            <p className="text-blue-100 mt-1">Rejoignez-nous dans votre espace professionnel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Nom + Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Prénom(s)</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
  <label className="text-sm text-black-700">Téléphone</label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <PhoneIcon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="tel"
      name="phone"
      value={form.phone}
      onChange={(e) => {
        const value = e.target.value;
        if (/^\+?\d{0,15}$/.test(value)) {
          setForm({ ...form, phone: value });
        }
      }}
      required
      maxLength={16} // pour limiter la longueur 
      placeholder="   +229 XXXXXXXX"
      className="pl-12 w-full px-3 py-2 border border-black-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</div>

            {/* Type d'utilisateur */}
            <div>
              <label className="text-sm text-gray-700">Vous êtes</label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                {userTypes.map((type) => (
                  <div key={type.value} className="relative">
                    <input
                      type="radio"
                      id={type.value}
                      name="userType"
                      value={type.value}
                      checked={form.userType === type.value}
                      onChange={handleChange}
                      className="absolute opacity-0 h-0 w-0"
                    />
                    <label
                      htmlFor={type.value}
                      className={`flex items-center justify-center p-2 border rounded-md cursor-pointer transition text-sm ${
                        form.userType === type.value
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

            {/* Password + Confirm */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Confirmer</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* CGU */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={form.acceptedTerms}
                onChange={handleChange}
                required
                className="h-4 w-4 text-blue-600 mt-1 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                J'accepte les{' '}
                <a href="#" className="text-blue-600 hover:underline">Conditions d'utilisation</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-sm font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Création en cours...' : 'Créer un compte'}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 text-center text-sm text-gray-600 py-4 border-t">
            Déjà inscrit ?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Se connecter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
