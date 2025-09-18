import React from 'react';
import {Rating} from 'primereact/rating';

export default function ProfileView({user}) {
    return (
        <>
            <div className="rating-wrapper">
                <Rating
                    value={user.averageRating || 0}
                    readOnly
                    cancel={false}
                    stars={5}
                />
                <span className="rating-number">
                    ({(user.averageRating || 0).toFixed(1)})
                </span>
            </div>
            <div className="profile-details">
                <h3>Personal Info</h3>
                <p><strong>Full Name:</strong><span className="profile-value">{user.full_name}</span></p>
                {user.email_enabled && (
                    <p><strong>Email:</strong><span className="profile-value">{user.email}</span></p>)}
                <p><strong>Gender:</strong><span className="profile-value">{user.gender}</span></p>
                {user.cnic_enabled && (
                    <p><strong>CNIC Number:</strong><span className="profile-value">{user.cnic_number}</span></p>)}
                {user.contact_enabled && (
                    <p><strong>Contact Number:</strong><span className="profile-value">{user.contact_number}</span></p>)}
                <p><strong>State:</strong><span className="profile-value">{user.state}</span></p>
                <p><strong>City:</strong><span className="profile-value">{user.city}</span></p>
                <p><strong>Current Address:</strong><span className="profile-value">{user.current_address}</span></p>
                <p><strong>Marital Status:</strong><span className="profile-value">{user.marital_Status}</span></p>
                <p><strong>Hire Count:</strong><span className="profile-value">{user.hireCount}</span></p>
                <p><strong>Created At:</strong><span
                    className="profile-value">{new Date(user.createdAt).toLocaleString()}</span></p>
                <p><strong>Updated At:</strong><span
                    className="profile-value">{new Date(user.updatedAt).toLocaleString()}</span></p>
            </div>
        </>
    );
}