import React, { useState } from 'react';

const ReferralProgram = () => {
  const [referralLink] = useState('https://ta-platforme.com/invite/toncode'); // Exemple de lien de parrainage
  const [copied, setCopied] = useState(false); // Nouvel état pour gérer la copie

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true); // Lien copié
        setTimeout(() => {
          setCopied(false); // Réinitialiser après 2 secondes
        }, 2000); // 2 secondes
      })
      .catch((err) => {
        console.error('Erreur lors de la copie: ', err);
      });
  };

  return (
    <section className="py-12 bg-gradient-to-r from-[#15803D] to-[#7bcd99]">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl font-semibold mb-6">Partagez et Gagnez des Récompenses !</h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Invitez vos amis à rejoindre la plateforme et recevez des crédits gratuits pour chaque inscription via votre lien personnalisé.
        </p>

        <div className="lg:bg-white lg:p-8  rounded-xl shadow-lg text-gray-800 max-w-6xl lg:mx-auto px-4">
          <h3 className="text-2xl font-bold lg:text-[#15803D] text-white mb-6">Votre lien de parrainage :</h3>

          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full p-4 bg-gray-100 text-gray-700 h-10 border-none focus:ring-2 focus:ring-[#15803D] focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 ${copied ? 'bg-[#138035]' : 'bg-[#15803D]'} text-white text-sm h-10 font-semibold hover:bg-[#138035] transition duration-200`}
            >
              {copied ? 'Copié' : 'Copier'}
            </button>
          </div>
        </div>

        {/* <div className="mt-10 text-left max-w-6xl mx-auto text-gray-100">
          <h4 className="text-lg font-semibold mb-4">Récompenses pour chaque parrainage :</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>5€ en crédits pour chaque ami qui s'inscrit via votre lien.</li>
            <li>Bonus supplémentaires pour des parrainages multiples.</li>
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default ReferralProgram;
