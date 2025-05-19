import { useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, UserIcon, BuildingOfficeIcon, IdentificationIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log({ email, password, userType, rememberMe });
      setIsLoading(false);
    }, 1500);
  };

  const userTypes = [
    { value: 'client', label: 'Client', icon: <UserIcon className="h-5 w-5" /> },
    { value: 'entreprise', label: 'Entreprise', icon: <BuildingOfficeIcon className="h-5 w-5" /> },
    { value: 'ouvrier', label: 'Ouvrier', icon: <IdentificationIcon className="h-5 w-5" /> },
    { value: 'partenaire', label: 'Partenaire', icon: <UserIcon className="h-5 w-5" /> },
    { value: 'stagiaire', label: 'Stagiaire', icon: <AcademicCapIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-fit max-w-sm">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-blue-400 py-4 px-8 text-center">
            <div className="flex justify-center mb-4">
              <BuildingOfficeIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Connexion à BTPConnect</h2>
            <p className="text-blue-100 mt-1">Accédez à votre espace professionnel</p>
          </div>
          
          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            
            {/* User Type Field */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                Vous êtes
              </label>
              <div className="grid grid-cols-2 gap-3">
                {userTypes.map((type) => (
                  <div key={type.value} className="relative">
                    <input
                      type="radio"
                      id={type.value}
                      name="userType"
                      value={type.value}
                      checked={userType === type.value}
                      onChange={() => setUserType(type.value)}
                      className="absolute opacity-0 h-0 w-0"
                    />
                    <label
                      htmlFor={type.value}
                      className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition ${userType === type.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <span className="mr-2">{type.icon}</span>
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Password Field */}
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              
              <div className="text-sm">
                <a href="/forgot" className="font-medium text-blue-600 hover:text-blue-500">
                  Mot de passe oublié?
                </a>
              </div>
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </>
                ) : 'Se connecter'}
              </button>
            </div>
          </form>
          
          {/* Form Footer */}
          <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Pas encore membre?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Créer un compte
              </a>
            </p>
          </div>
        </div>
        
        {/* Legal Notice */}
        <div className="mt-6 text-center text-xs text-gray-500">
          En vous connectant, vous acceptez nos{' '}
          <a href="#" className="underline hover:text-gray-600">Conditions d'utilisation</a>{' '}
          et notre{' '}
          <a href="#" className="underline hover:text-gray-600">Politique de confidentialité</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;