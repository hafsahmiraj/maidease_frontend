import React, { useState, useEffect } from 'react';
    import RatingSummary from './RatingSummary';

    export default function ParentComponent() {
        const [ratingsSummary, setRatingsSummary] = useState([]);
        const [refreshKey, setRefreshKey] = useState(0); // Key to force re-render

        const fetchRatingsSummary = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/ratings-summary');
                const data = await response.json();
                setRatingsSummary(data);
            } catch (error) {
                console.error('Error fetching ratings summary:', error);
            }
        };

        useEffect(() => {
            fetchRatingsSummary();
        }, []);

        const handleNewRating = async (newRating) => {
            try {
                await fetch('http://localhost:5000/api/add-rating', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newRating),
                });
                await fetchRatingsSummary(); // Refresh ratings summary
                setRefreshKey((prevKey) => prevKey + 1); // Update key to force re-render
            } catch (error) {
                console.error('Error adding new rating:', error);
            }
        };

        return (
            <div>
                <button onClick={() => handleNewRating({ rating: 5 })}>Add 5-Star Rating</button>
                <RatingSummary key={refreshKey} ratingsSummary={ratingsSummary} />
            </div>
        );
    }