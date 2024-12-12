import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000); // Notification disparaît après 5 secondes
    return () => clearTimeout(timer);
  }, []);

  return (
    show && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-blue-500 text-white rounded-md shadow-lg transition-all duration-300 ease-in-out animate-bounce">
        {message}
      </div>
    )
  );
};

export default Notification;
