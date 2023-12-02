const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
