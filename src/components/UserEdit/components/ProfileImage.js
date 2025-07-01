import React from 'react';

export default function ProfileImage({ user,isPrivate }) {
  return (
      <>
        <img
            src={user.profile_photo}
            alt={user.full_name}
            className="profile-main-img"
        />
            {isPrivate && user.cnic_photo_front && user.cnic_photo_back && (
            <div className="cnic-images">
                    {user.cnic_photo_front && (
              <img
                  src={user.cnic_photo_front}
                  alt="CNIC Front"
                  className="cnic-img"
                  style={{maxWidth: "100%", maxHeight: "100%", objectFit: "cover"}}
              />
                    )}
                    {user.cnic_photo_back && (
              <img
                  src={user.cnic_photo_back}
                  alt="CNIC Back"
                  className="cnic-img"
                  style={{maxWidth: "100%", maxHeight: "100%", objectFit: "cover"}}
              />
                    )}
            </div>
        )}

      </>
  );
}