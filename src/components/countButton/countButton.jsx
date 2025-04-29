const CountButton = ({ count, setCount, stock }) => {
  const decrease = () => {
    setCount((prev) => {
      const num = typeof prev === "number" ? prev : parseInt(prev, 10) || 1;
      return Math.max(num - 1, 1);
    });
  };

  const increase = () => {
    setCount((prev) => {
      const num = typeof prev === "number" ? prev : parseInt(prev, 10) || 1;
      return stock ? Math.min(num + 1, stock) : num + 1;
    });
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (value === "") return; 
    value = parseInt(value, 10);
    if (isNaN(value) || value < 1) value = 1;
    if (stock && value > stock) value = stock;
    setCount(value);
    console.log("value",value);
  };

  return (
    <div className="flex border border-gray-300 rounded-md w-32 mt-4 h-10">
      <button
        type="button"
        onClick={decrease}
        className="px-3 border-r border-gray-300 text-gray-600 hover:bg-gray-200"
      >
        −
      </button>
      <input
        type="number"
        onChange={handleChange}
        value={typeof count === "number" && !isNaN(count) ? count : ""}
        min="1"
        max={stock || 1}
        className="px-3 py-2 text-gray-700 focus:outline-none w-16 text-center"
      />
      <button
        type="button"
        onClick={increase}
        className="px-3 border-l border-gray-300 text-gray-600 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
};

export default CountButton;
