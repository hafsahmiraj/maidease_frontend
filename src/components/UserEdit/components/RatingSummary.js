import React from 'react';
import { Rating } from 'primereact/rating';

export default function RatingSummary({ ratingsSummary }) {
  return (
    <div className="ratings-summary">
      <h3>Ratings Summary</h3>
      {[5, 4, 3, 2, 1].map((stars) => {
        const rating = ratingsSummary.find((r) => r.stars === stars) || { value: 0 };
        return (
          <div key={stars} className="rating-row" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Rating value={stars} readOnly stars={5} cancel={false} />
            <span>({rating.value})</span>
          </div>
        );
      })}
    </div>
  );
}