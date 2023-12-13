import React from 'react';

function UtilitySelector({ data, visible, value, onChange, ...props }) {
  if (!visible) {
    return null;
  }
  if (!data || data.length === 0) {
    return <p>No programs available</p>;
  }
  return (
    <div className={`relative w-full ${props.className}`}>
      <select
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={onChange}
      >
        <option value="">Select Utility/CCA</option>
        {data.map((row, index) => (
          <option value={row['Value']} key={index}>
            {row['Utility']}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.516 7.548c.436-.446 1.045-.481 1.576 0L10 10.405l2.908-2.857c.531-.481 1.141-.446 1.576 0 .436.445.408 1.197 0 1.642l-3.417 3.356c-.27.267-.631.408-.997.408s-.728-.141-.997-.408l-3.417-3.356c-.408-.445-.436-1.197 0-1.642z" />
        </svg>
      </div>
    </div>
  );
}

export default UtilitySelector;
