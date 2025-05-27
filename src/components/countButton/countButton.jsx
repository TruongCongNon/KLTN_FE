const CountButton = ({ count, setCount, stock, onLimitExceeded }) => {
  console.log("stock value & type:", stock, typeof stock);
  const decrease = () => {
    setCount((prev) => {
      const num = typeof prev === "number" ? prev : parseInt(prev, 10) || 1;
      return Math.max(num - 1, 1);
    });
  };

  const increase = () => {
    setCount((prev) => {
      const num = typeof prev === "number" ? prev : parseInt(prev, 10) || 1;
      const stockNumber = Number(stock);
  
      console.log("📈 increase() debug — num:", num, "| stock:", stockNumber);
  
      if (stockNumber && num + 1 > stockNumber) {
        console.log("❌ Giới hạn vượt quá, gọi toast!");
        onLimitExceeded?.();
        return num;
      }
  
      return num + 1;
    });
  };
  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = 1;
    if (Number(stock) && value > Number(stock)) {
      onLimitExceeded?.();
      value = Number(stock);
    }
    setCount(value); // vẫn dùng setCount gốc
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
        max={Number(stock) ||1}
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
