import React from 'react';
const Footer = () => {
  return (
    <footer className="flex-shrink-0 w-full z-30 p-2 bg-white border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#0A2463]">
          kos &copy; {new Date().getFullYear()}
        </span>
        <span className="text-sm text-[#0A2463]">
          Made by{' '}
          <a
            href="https://invertpro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            betkos
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
