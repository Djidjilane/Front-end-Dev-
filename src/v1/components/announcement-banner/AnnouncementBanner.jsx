import React from 'react';

const AnnouncementBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gray-100">
      <div className="whitespace-nowrap animate-marquee text-black/60 font-semibold text-lg py-2">
        🚨 🚀 Nouveau jeu disponible! Jouez maintenant et gagnez des récompenses! 🚨
      </div>
    </div>
  );
};

export default AnnouncementBanner;
