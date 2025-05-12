import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import './ProfilePageM.css';

export default function MaidProfilePage() {
    const { maidId } = useParams();
    const [maid, setMaid] = useState(null);
    const [ratingsSummary, setRatingsSummary] = useState([]); // Ensure it's initialized as an array
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the specific maid's data from the API
        fetch(`http://localhost:5000/api/maids/${maidId}`)
            .then((response) => response.json())
            .then((data) => {
                setMaid(data);
            })
            .catch((error) => console.error('Error fetching maid data:', error));
    }, [maidId]);

    useEffect(() => {
        // Fetch the rating data from the API
        fetch(`http://localhost:5000/api/maids/hire/rating/maid/${maidId}`)
            .then((response) => response.json())
            .then((data) => {
                // Ensure the response is an array
                if (Array.isArray(data)) {
                    setRatingsSummary(data);
                } else {
                    console.error('Invalid ratingsSummary data format:', data);
                    setRatingsSummary([]);
                }
            })
            .catch((error) => console.error('Error fetching rating data:', error));
    }, [maidId]);

    if (!maid) return <div>Loading...</div>;

    const handleBooking = () => {
        navigate(`/booking/${maid.id}`);
    };

    return (
        <>
            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-grid">
                        <div className="profile-left">
                            <img
                                src={maid.profile_photo}
                                alt={maid.full_name}
                                className="profile-main-img"
                            />
                            <div className="rating-summary">
                                <h3>Reviews</h3>
                                <p>{maid.ratingCount} reviews for this maid</p>
                                {[5, 4, 3, 2, 1].map((stars) => {
                                    const ratingValue = ratingsSummary.find((r) => r.stars === stars)?.value || 0;
                                    return (
                                        <div key={stars} className="rating-bar">
                                            <span>{stars} Stars</span>
                                            <div className="bar">
                                                <div
                                                    className="fill"
                                                    style={{ width: `${(ratingValue / maid.ratingCount) * 100 || 0}%` }}
                                                ></div>
                                            </div>
                                            <span>({ratingValue})</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="profile-right">
                            <h2>{maid.full_name}</h2>
                            <div className="rating-wrapper">
                                <Rating
                                    value={maid.averageRating || 0}
                                    readOnly
                                    cancel={false}
                                    stars={5}
                                />
                                <span className="rating-number">
                                    ({maid.averageRating > 0 ? maid.averageRating.toFixed(1) : 'N/A'})
                                </span>
                            </div>
                            <h3>Title</h3>
                            <p className="profile-title">{maid.profile_title}</p>
                            <h3>Description</h3>
                            <p className="profile-description">{maid.profile_description}</p>

                            <div className="profile-details">
                                <h3>Personal Info</h3>
                                <p>
                                    <strong>Gender:</strong> {maid.gender}
                                </p>
                                <p>
                                    <strong>State:</strong> {maid.state}
                                </p>
                                <p>
                                    <strong>City:</strong> {maid.city}
                                </p>
                                <p>
                                    <strong>Address:</strong> {maid.current_address}
                                </p>
                                <p>
                                    <strong>Marital Status:</strong> {maid.marital_Status}
                                </p>
                                <p>
                                    <strong>Experience:</strong> {maid.experience} years
                                </p>
                                <p>
                                    <strong>Skills:</strong> {maid.skills.join(', ')}
                                </p>
                                <p>
                                    <strong>Hire Count:</strong> {maid.hireCount}
                                </p>
                                <p>
                                    <strong>Created At:</strong> {new Date(maid.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <button className="book-button" onClick={handleBooking}>
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}