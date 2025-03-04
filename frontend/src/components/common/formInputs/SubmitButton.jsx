import React from 'react';

const SubmitButton = ({ title, disabled, className }) => (
  <button
    type="submit"
    disabled={disabled}
    className={`${className} px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400`}
  >
    {title}
  </button>
);

export default SubmitButton;