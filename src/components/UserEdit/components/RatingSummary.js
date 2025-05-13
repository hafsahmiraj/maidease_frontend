import React from 'react';
import { Rating } from 'primereact/rating';

export default function RatingSummary({ ratingsSummary }) {
  console.log(ratingsSummary);
  return (
    <div className="ratings-summary">
      <h3>Ratings Summary</h3>
      <div className="ratings-list">
        {["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"].map((name) => {
          const rating = ratingsSummary.find((r) => r.name === name) || { value: 0 };
          return (
            <div key={name} className="rating-row" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Rating value={parseInt(name[0], 10)} readOnly stars={5} cancel={false} />
              <span>({rating.value})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}