// components/StarRating.js
import { useState, useEffect } from "react";

const StarRating = ({ value, onChange, jadwalId }) => {
  const [rating, setRating] = useState(value || 0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Load rating from local storage when component mounts
    const storedRating = localStorage.getItem(`rating_${jadwalId}`);
    // Parse storedRating from JSON string and set rating to 0 if it's null
    if (storedRating) {
      const { rating } = JSON.parse(storedRating);
      setRating(rating);
      setDisabled(true);
    } else {
      setRating(0);
      setDisabled(false);
    }
  }, [jadwalId]); // Run this effect whenever jadwalId changes

  const handleClick = (newValue) => {
    if (!disabled) {
      setRating(newValue);
      onChange(newValue);

      // Save rating to local storage
      const dataToStore = {
        jadwalId: jadwalId,
        rating: newValue,
      };
      // localStorage.setItem(`rating_${jadwalId}`, JSON.stringify(dataToStore));
    }
  };

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
