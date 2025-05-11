import React from 'react';

export default function ProfileImage({ user }) {
  return (
    <>
      <img
        src={user.profile_photo}
        alt={user.full_name}
        className="profile-main-img"
      />
      <div className="cnic-images">
        <img
          src={user.cnic_photo_front}
          alt="CNIC Front"
          className="cnic-img"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
        <img
          src={user.cnic_photo_back}
          alt="CNIC Back"
          className="cnic-img"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
      </div>
    </>
  );
}