const Button = ({ text, onClick, submittedStyle }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${submittedStyle} `}
    >
      {text}
    </button>
  );
};

export default Button;
