import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import {
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  // 🔒 Si déjà connecté, redirige automatiquement vers la page précédente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(from, { replace: true });
    }
  }, [navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate(from, { replace: true });


      /* Redirection intelligente selon le rôle
      if (user.role === 'ouvrier') {
        navigate(
          from.startsWith('/entreprise') || from.startsWith('/admin')
            ? '/projet'
            : from,
          { replace: true }
        );
      } else if (user.role === 'entreprise') {
        navigate(
          from.startsWith('/ouvrier') || from.startsWith('/admin')
            ? '/entreprise/dashboard'
            : from,
          { replace: true }
        );
      } else if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }*/
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-fit max-w-sm">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-blue-400 py-4 px-8 text-center">
            <div className="flex justify-center mb-4">
              <BuildingOfficeIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Connexion à BTPConnect</h2>
            <p className="text-blue-100 mt-1">Accédez à votre espace professionnel</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {errorMsg && (
              <div className="text-red-600 text-sm text-center">{errorMsg}</div>
            )}

            {/* Email */}
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Mot de passe */}
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.963 9.963 0 013.405-7.516m3.356 1.722A3.001 3.001 0 0115 12a3.001 3.001 0 01-5.91.674M15 12a3.001 3.001 0 00-5.91.674M4.222 4.222l15.556 15.556" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Remember me & forgot password */}
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
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <a href="/forgotPassword" className="text-blue-600 hover:text-blue-500">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 transition ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>
          </form>

          <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Pas encore membre ?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-500">
                Créer un compte
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          En vous connectant, vous acceptez nos{' '}
          <a href="#" className="underline hover:text-gray-600">Conditions d'utilisation</a> et notre{' '}
          <a href="#" className="underline hover:text-gray-600">Politique de confidentialité</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;
