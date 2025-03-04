import { StarIcon as StarOutline } from "@heroicons/react/24/outline"; 
import { StarIcon } from "@heroicons/react/24/solid"; 


const StarRating = ({ rating, maxStars = 5 }) => {
  return (
    <div className="flex items-center space-x-1 ">
      {[...Array(maxStars)].map((_, index) => {
        const roundedRating = Math.round(rating * 2) / 2; // Làm tròn đến 0.5 gần nhất
        const isFullStar = index + 1 <= Math.floor(roundedRating); // Sao đầy
        const isHalfStar = index + 0.5 === roundedRating; // Sao nửa

        return (
          <div key={index} className="relative w-6 h-6">
            {/* Sao rỗng */}
            <StarOutline className="absolute text-gray-300 w-6 h-6" />
            
            {/* Sao đầy hoặc nửa sao */}
            {isFullStar && <StarIcon className="absolute text-yellow-400 w-6 h-6" />}
            {isHalfStar && (
              <StarIcon
                className="absolute text-yellow-400 w-6 h-6"
                style={{ clipPath: "inset(0 50% 0 0)" }} // Cắt nửa sao
              />
            )}
          </div>
        );
      })}
      <span className="text-lg font-bold text-blue-400 ml-2">{rating}</span>
    </div>
  );
};

export default StarRating;
