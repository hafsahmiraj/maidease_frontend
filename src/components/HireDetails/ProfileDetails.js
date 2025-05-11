import React from "react";

export default function ProfileDetails({ profileDetails }) {
  return (
    <div className="profile-details">
      <h3>Profile Details</h3>
      <p>
        <strong>Full Name:</strong> {profileDetails.full_name}
      </p>
      <p>
        <strong>Gender:</strong> {profileDetails.gender}
      </p>
      <p>
        <strong>State:</strong> {profileDetails.state}
      </p>
      <p>
        <strong>City:</strong> {profileDetails.city}
      </p>
      <p>
        <strong>Current Address:</strong> {profileDetails.current_address}
      </p>
    </div>
  );
}