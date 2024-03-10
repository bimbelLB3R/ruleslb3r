// components/StarRating.js
import { useState, useEffect } from "react";

const StarRating = ({ value, onChange, disabled, kodeMateri }) => {
  const [rating, setRating] = useState(value || 0);

  const handleClick = (newValue) => {
    if (!disabled) {
      setRating(newValue);
      onChange(newValue);
    }
  };

  // cek dilokal
  useEffect(() => {
    const namaPengajar = localStorage.getItem(`namaTentor_${kodeMateri}`);
    const nilaiRating = localStorage.getItem(`rating_${kodeMateri}`);
    if (nilaiRating) {
      setRating(nilaiRating);
    }
  });

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className="text-3xl"
            onClick={() => handleClick(starValue)}
            style={{
              cursor: disabled ? "not-allowed" : "pointer",
              color: starValue <= rating ? "gold" : "gray",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
