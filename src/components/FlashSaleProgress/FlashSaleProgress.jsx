import { FaFire } from "react-icons/fa";

const FlashSaleProgress = ({ sold, total }) => {
  const percent = total > 0 ? (sold / total) * 100 : 0;
  const text = sold >= total ? "Hết hàng" : `Còn ${total - sold}/${total}`;

  return (
    <div className="relative w-full h-4 mt-2 bg-yellow-400   rounded-full overflow-hidden flex items-center">
      <div
        className="absolute left-0 top-0 h-full bg-gray-200 rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
      <div className="relative z-10 flex items-center justify-center w-full px-2 text-sm font-semibold">
        <FaFire className="text-red-500 mr-1" />
        <span className="text-black">{text}</span>
      </div>
    </div>
  );
};

export default FlashSaleProgress;
