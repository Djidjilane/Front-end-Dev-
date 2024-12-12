import React, { useState, useEffect } from 'react';
const Notification = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    show && (
      <div className="fixed top-36  left-1/2 z-10 transform -translate-x-1/2 p-4 bg-green-500 text-white rounded-md shadow-lg transition-all duration-300 ease-in-out animate-bounce">
        {message}
      </div>
    )
  );
};

export default Notification;
