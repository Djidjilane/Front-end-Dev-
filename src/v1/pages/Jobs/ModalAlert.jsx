// components/ModalAlert.jsx
import React from "react";

export default function ModalAlert({ message, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center">
        <h2 className="text-lg font-semibold mb-4 text-red-600">⚠️ Attention</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
        >
          OK
        </button>
      </div>
    </div>
  );
}
