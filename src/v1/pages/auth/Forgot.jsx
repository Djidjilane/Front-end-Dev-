import { useState } from "react";


const Register= () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        type: '',
        password: '',
        confirmPassword: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          alert('Les mots de passe ne correspondent pas.');
          return;
        }
        console.log('Données du formulaire :', formData);
        
      };
  return ( 
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
        {/* Left section 
        <div className="w-1/2 bg-gray-800 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Authfy</h2>
          <p className="mb-6">Login using social media to get quick access</p>
          <button className="mb-3 bg-blue-700 hover:bg-blue-800 w-full py-2 rounded">
            Sign in with Facebook
          </button>
          <button className="mb-3 bg-sky-500 hover:bg-sky-600 w-full py-2 rounded">
            Sign in with Twitter
          </button>
          <button className="bg-red-600 hover:bg-red-700 w-full py-2 rounded">
            Sign in with Google
          </button>
        </div>

        {/* Right section 
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Sign up for free!
          </h2>*/}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
                input type="text" name="nom" 
                value={formData.nom} 
                onChange={handleChange}
                placeholder="Nom"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
            />
            <input
               type="email" name="email" value={formData.email} onChange={handleChange}
        placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
            <input
              type="tel" name="telephone" value={formData.telephone} onChange={handleChange}
        placeholder="Téléphone"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
                  <select name="type" value={formData.type} onChange={handleChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2" required>
        <option value="">-- Sélectionnez un type --</option>
        <option value="stagiaire">Stagiaire</option>
        <option value="partenaire">Partenaire commerciale</option>
        <option value="entreprise">Entreprise</option>
        <option value="ouvrier">Ouvrier</option>
        <option value="client">Client</option>
      </select>

      <input type="password" name="password" value={formData.password} onChange={handleChange}
        placeholder="Mot de passe" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2" required />

      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
        placeholder="Confirmez le mot de passe" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2" required />

            <div className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                terms of service
              </a>.
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Sign up with email
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline">
              Sign in
            </a>
          </p>
      </div>
    </div>
  );
};
export default Register;

