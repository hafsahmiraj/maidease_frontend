import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { Rating } from 'primereact/rating';
    import './ProfilePageM.css';

    export default function UserEditableProfilePage() {
        const { userId } = useParams();
        const navigate = useNavigate();
        const [user, setUser] = useState(null);
        const [editing, setEditing] = useState(false);
        const [previewImage, setPreviewImage] = useState(null);
        const [reviews, setReviews] = useState([]);
        const [genderOptions] = useState(['Male', 'Female', 'Other']);
        const [maritalStatusOptions] = useState(['Single', 'Married']);
        const [districtOptions] = useState(['Punjab', 'Sindh', 'Balochistan', 'KPK']);
        useEffect(() => {
            const fetchData = async () => {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const data = await response.json();
                    setUser(data);
                    setReviews(data.reviews || []);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchData();
        }, [userId]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setUser((prev) => ({ ...prev, [name]: value }));
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setPreviewImage(imageUrl);
                setUser((prev) => ({ ...prev, profile_photo: file.name }));
            }
        };

        const handleSave = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/api/users/update-profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(user),
                });
                const result = await response.json();
                if (response.status === 200 && result.message === 'Profile updated successfully') {
                    alert('Profile updated successfully');
                    setEditing(false);
                } else {
                    alert('Failed to update profile');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        };

        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');
        };

        if (!user) return <div>Loading...</div>;

        return (
            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-grid">
                        <div className="profile-left">
                            <img
                                src={previewImage || `/${user.profile_photo}`}
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
                                {reviews.length > 0 ? (
                                    reviews.map((review, index) => (
                                        <div key={index} className="rating-bar">
                                            <span>{review.name}</span>
                                            <div className="bar">
                                                <div className="fill" style={{ width: `${review.value * 20}%` }}></div>
                                            </div>
                                            <span>({review.value})</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews available</p>
                                )}
                            </div>
                        </div>
                        <div className="profile-right">
                            <div className="edit-header">
                                <h2>{user.name}</h2>
                                <button className="edit-btn" onClick={() => setEditing(!editing)}>
                                    {editing ? 'Cancel' : 'Edit'}
                                </button>
                                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                            </div>
                           <div className="rating-wrapper">
                                <Rating value={user.rating || 0} readOnly cancel={false} stars={5} />
                                <span className="rating-number">({(user.rating || 0).toFixed(1)})</span>
                            </div>

                            {!editing ? (
                                <div className="profile-details">
                                    <h3>Personal Info</h3>
                                    <p><strong>Email:</strong><span className="profile-value">{user.email}</span></p>
                                    <p><strong>Contact:</strong><span className="profile-value">{user.contact}</span></p>
                                    <p><strong>City:</strong><span className="profile-value">{user.city}</span></p>
                                    <p><strong>Address:</strong><span className="profile-value">{user.address}</span></p>
                                    <p><strong>District:</strong><span className="profile-value">{user.district}</span></p>
                                    <p><strong>Gender:</strong><span className="profile-value">{user.gender}</span></p>
                                    <p><strong>Marital Status:</strong><span className="profile-value">{user.marital_status}</span></p>
                                </div>
                            ) : (

                                <div className="edit-form">
                                    <label>Name: <input name="name" value={user.name} onChange={handleChange} /></label>
                                    <label>Email: <input name="email" value={user.email} onChange={handleChange} /></label>
                                    <label>Contact: <input name="contact" value={user.contact} onChange={handleChange} /></label>
                                    <label>City: <input name="city" value={user.city} onChange={handleChange} /></label>
                                    <label>Address: <input name="address" value={user.address} onChange={handleChange} /></label>
                                    <label>District:
                                        <select name="district" value={user.district} onChange={handleChange}>
                                            {districtOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>Gender:
                                        <select name="gender" value={user.gender} onChange={handleChange}>
                                            {genderOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>Marital Status:
                                        <select name="marital_status" value={user.marital_status} onChange={handleChange}>
                                            {maritalStatusOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <button className="save-btn" onClick={handleSave}>Save</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }