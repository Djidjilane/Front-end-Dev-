import React from 'react';
const Footer = () => {
  return (
    <footer className="flex-shrink-0 w-full p-2 max-w-7xl bg-gradient-to-r from-[#15803D] to-[#7bcd99] border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white">
          kos &copy; {new Date().getFullYear()}
        </span>
        <span className="text-sm text-white">
          Made by{' '}
          <a
            href="https://invertpro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            betkos
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
