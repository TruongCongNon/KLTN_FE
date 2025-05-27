const Button = ( {onClick, title, onClass = "bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ", textcolor = "text-white" }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`flex-none rounded-md  ${onClass} ${textcolor}
      px-3.5 py-2.5 text-sm font-semibold  shadow-xs `}
    >
      <p>{title}</p>
    </button>
  );
};

export default Button;
