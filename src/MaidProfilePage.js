import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import './ProfilePageM.css';
import Navbar from './Navbar';

export const ProductService = {
    getProducts: async () => {
        return [
            {
                id: 'm1',
                area: 'Lahore',
                name: 'Ayesha B.',
                image: 'maid1.webp',
                price: 15000,
                description: 'Expert in home cleaning and babysitting with 5 years experience. Hardworking, punctual, and trustworthy with strong references.',
                rating: 5
            },
            {
                id: 'm2',
                area: 'Karachi',
                name: 'Sana K.',
                image: 'maid2.webp',
                price: 12000,
                description: 'Professional cook and housekeeper available full-time.',
                rating: 4
            },
            {
                id: 'm3',
                area: 'Islamabad',
                name: 'Fatima R.',
                image: 'maid3.webp',
                price: 14000,
                description: 'Specialized in elderly care and medication management. Certified and experienced.',
                rating: 5
            },
            {
                id: 'm4',
                area: 'Rawalpindi',
                name: 'Nimra T.',
                image: 'maid4.webp',
                price: 11000,
                description: 'Skilled in daily household cleaning and laundry. Very disciplined and reliable.',
                rating: 4
            },
            {
                id: 'm5',
                area: 'Faisalabad',
                name: 'Hina M.',
                image: 'maid5.jpg',
                price: 12500,
                description: 'Great with children and organizing household chores. Fluent in English and Urdu.',
                rating: 5
            },
            {
                id: 'm6',
                area: 'Multan',
                name: 'Kiran A.',
                image: 'maid6.jpg',
                price: 13000,
                description: 'Experienced housemaid with attention to detail. Known for honesty and dedication.',
                rating: 3
            },
            {
                id: 'm7',
                area: 'Lahore',
                name: 'Zainab S.',
                image: 'maid7.jpg',
                price: 14500,
                description: 'Childcare specialist with creative skills and patience. Loved by kids.',
                rating: 5
            },
            {
                id: 'm8',
                area: 'Karachi',
                name: 'Mehwish J.',
                image: 'maid8.webp',
                price: 10000,
                description: 'New but passionate housemaid ready to assist in all basic chores.',
                rating: 3
            },
            {
                id: 'm9',
                area: 'Hyderabad',
                name: 'Rabia L.',
                image: 'maid9.webp',
                price: 13500,
                description: 'Handles cleaning, ironing, and kitchen help. Speaks basic English.',
                rating: 4
            },
        ];
    }
};

export default function MaidProfilePage() {
    const { maidId } = useParams();
    const [maid, setMaid] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ProductService.getProducts().then((data) => {
            const selectedMaid = data.find((item) => item.id === maidId);
            setMaid(selectedMaid);
        });
    }, [maidId]);

    if (!maid) return <div>Loading...</div>;

    const handleBooking = () => {
        navigate(`/booking/${maid.id}`);
    };

    return (
        <>
                         <Navbar /> 
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-grid">
                    <div className="profile-left">
                        <img src={`/${maid.image}`} alt={maid.name} className="profile-main-img" />
                        <div className="rating-summary">
                            <h3>Reviews</h3>
                            <p>58 reviews for this maid</p>
                            <div className="rating-bar">
                                <span>5 Stars</span>
                                <div className="bar"><div className="fill" style={{ width: '95%' }}></div></div>
                                <span>(57)</span>
                            </div>
                            <div className="rating-bar disabled">
                                <span>4 Stars</span>
                                <div className="bar"><div className="fill" style={{ width: '0%' }}></div></div>
                                <span>(0)</span>
                            </div>
                            <div className="rating-bar disabled">
                                <span>3 Stars</span>
                                <div className="bar"><div className="fill" style={{ width: '0%' }}></div></div>
                                <span>(0)</span>
                            </div>
                            <div className="rating-bar">
                                <span>2 Stars</span>
                                <div className="bar"><div className="fill" style={{ width: '5%' }}></div></div>
                                <span>(1)</span>
                            </div>
                            <div className="rating-bar disabled">
                                <span>1 Star</span>
                                <div className="bar"><div className="fill" style={{ width: '0%' }}></div></div>
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-right">
                        <h2>{maid.name}</h2>
                        <div className="rating-wrapper">
                            <Rating value={maid.rating} readOnly cancel={false} stars={5} />
                            <span className="rating-number">({maid.rating.toFixed(1)})</span>
                        </div>
                        <p className="profile-price">Salary: PKR {maid.price}</p>
                        <p className="profile-description">
                            {maid.description} She is known for maintaining hygiene, being respectful to the household members, and quickly adapting to family routines.
                        </p>

                        <div className="profile-details">
                            <h3>Experience</h3>
                            <p>5+ years in house cleaning and babysitting.</p>

                            <h3>Skills</h3>
                            <ul>
                                <li>Deep cleaning</li>
                                <li>Cooking Pakistani cuisine</li>
                                <li>Babysitting and elderly care</li>
                            </ul>

                            <h3>Languages Spoken</h3>
                            <p>Urdu, Punjabi</p>

                            <h3>Availability</h3>
                            <p>Full-Time</p>

                            <button className="book-button" onClick={handleBooking}>
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    );
}
