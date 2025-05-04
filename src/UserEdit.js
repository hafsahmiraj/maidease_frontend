import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import './ProfilePageM.css';

export default function UserEditableProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        // Simulated fetch
        const userData = {
            id: 'u1',
            name: 'Ali Raza',
            email: 'ali@example.com',
            password: '********',
            contact: '0311-9876543',
            city: 'Islamabad',
            address: 'Street 45, G-10/4',
            district: 'Islamabad Capital Territory',
            marital_status: 'Single',
            image: 'user1.jpg',
            rating: 4.5 // Average user rating
        };
        setUser(userData);
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setUser(prev => ({ ...prev, image: file.name }));
        }
    };

    const handleSave = () => {
        setEditing(false);
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-grid">
                    <div className="profile-left">
                        <img
                            src={previewImage || `/${user.image}`}
                            alt={user.name}
                            className="profile-main-img"
                        />
                        {editing && (
                            <div className="image-upload">
                                <label htmlFor="imageUpload" className="upload-label">Change Image:</label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        )}
                        <div className="rating-summary">
                            <h3>Reviews</h3>
                            <p>Summary of your Reviews</p>
                            <div className="rating-bar">
                                <span>5 Stars</span>
                                <div className="bar"><div className="fill" style={{ width: '70%' }}></div></div>
                                <span>(24)</span>
                            </div>
                            <div className="rating-bar">
                                <span>4 Stars</span>
                                <div className="bar"><div className="fill" style={{ width: '20%' }}></div></div>
                                <span>(7)</span>
                            </div>
                            <div className="rating-bar">
                                <span>3 Stars</span>
                                <div className="bar"><div className="fill" style={{ width: '5%' }}></div></div>
                                <span>(2)</span>
                            </div>
                            <div className="rating-bar">
                                <span>2 Stars</span>
                                <div className="bar"><div className="fill" style={{ width: '3%' }}></div></div>
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
                        <div className="edit-header">
                            <h2>{user.name}</h2>
                            <button className="edit-btn" onClick={() => setEditing(!editing)}>
                                {editing ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        <div className="rating-wrapper">
                            <Rating value={user.rating} readOnly cancel={false} stars={5} />
                            <span className="rating-number">({user.rating.toFixed(1)})</span>
                        </div>

                        {!editing ? (
                            <div className="profile-details">
                                <h3>Personal Info</h3>
                                <p><strong>Email:</strong><span className="profile-value">{user.email}</span></p>
                                <p><strong>Contact:</strong><span className="profile-value">{user.contact}</span></p>
                                <p><strong>City:</strong><span className="profile-value">{user.city}</span></p>
                                <p><strong>Address:</strong><span className="profile-value">{user.address}</span></p>
                                <p><strong>District:</strong><span className="profile-value">{user.district}</span></p>
                                <p><strong>Marital Status:</strong><span className="profile-value">{user.marital_status}</span></p>
                            </div>
                        ) : (
                            <div className="edit-form">
                                <label>Name: <input name="name" value={user.name} onChange={handleChange} /></label>
                                <label>Email: <input name="email" value={user.email} onChange={handleChange} /></label>
                                <label>Contact: <input name="contact" value={user.contact} onChange={handleChange} /></label>
                                <label>City: <input name="city" value={user.city} onChange={handleChange} /></label>
                                <label>Address: <input name="address" value={user.address} onChange={handleChange} /></label>
                                <label>District: <input name="district" value={user.district} onChange={handleChange} /></label>
                                <label>Marital Status: <input name="marital_status" value={user.marital_status} onChange={handleChange} /></label>
                                <button className="save-btn" onClick={handleSave}>Save</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
