// components/YearRange.js
import React from "react";

const YearRange = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2012;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  ).reverse();

  const yearRangeString = `${startYear}-${currentYear}`;

  return (
    <p>
      © {yearRangeString}{" "}
      <a href="/" className="hover:underline">
        LB3R™
      </a>
      . All Rights Reserved.
    </p>
  );
};

export default YearRange;
