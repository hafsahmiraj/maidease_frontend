import React from 'react';
import {Rating} from 'primereact/rating';
import {Tag} from 'primereact/tag';

export default function ProfileView({maid}) {
  return (
      <>
        <div className="rating-wrapper">
          <Rating
              value={maid.averageRating || 0}
              readOnly
              cancel={false}
              stars={5}
          />
          <span className="rating-number">
                    ({(maid.averageRating || 0).toFixed(1)})
                  </span>
        </div>
        <div className="profile-details">
          <h3>Personal Info</h3>
          <p><strong>Full Name:</strong><span className="profile-value">{maid.full_name}</span></p>
          <p><strong>Email:</strong><span className="profile-value">{maid.email}</span></p>
          <p><strong>Profile Title:</strong><span className="profile-value">{maid.profile_title}</span></p>
          <p><strong>Gender:</strong><span className="profile-value">{maid.gender}</span></p>
          <p><strong>CNIC Number:</strong><span className="profile-value">{maid.cnic_number}</span></p>
          <p><strong>Contact Number:</strong><span className="profile-value">{maid.contact_number}</span></p>
          <p><strong>State:</strong><span className="profile-value">{maid.state}</span></p>
          <p><strong>City:</strong><span className="profile-value">{maid.city}</span></p>
          <p><strong>Current Address:</strong><span className="profile-value">{maid.current_address}</span></p>
          <p><strong>Marital Status:</strong><span className="profile-value">{maid.marital_Status}</span></p>
          <p><strong>Experience:</strong><span className="profile-value">{maid.experience.toFixed(1)} years</span></p>
          <p>
            <strong>Skills:</strong>
            <span className="profile-value">
    {(Array.isArray(maid.skills) ? maid.skills : JSON.parse(maid.skills || "[]")).map((skill, index) => (
        <Tag
            key={index}
            value={skill}
            style={{
              margin: "0 5px 5px 0",
              backgroundColor: `hsl(${(index * 50) % 360}, 70%, 80%)`,
              color: "#333",
            }}
        />
    ))}
  </span>
          </p>
          <p><strong>Profile Description:</strong><span className="profile-value">{maid.profile_description}</span></p>
          <p><strong>Hire Count:</strong><span className="profile-value">{maid.hireCount}</span></p>
          <p><strong>Created At:</strong><span
              className="profile-value">{new Date(maid.createdAt).toLocaleString()}</span></p>
          <p><strong>Updated At:</strong><span
              className="profile-value">{new Date(maid.updatedAt).toLocaleString()}</span></p>
        </div>
      </>
  );
}