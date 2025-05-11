import React from 'react';
import {Password} from 'primereact/password';

export default function ResetPassword({
                                        passwordData,
                                        handlePasswordChange,
                                        handleResetPassword
                                      }) {
  return (
      <div className="edit-form">
        <label>
          Old Password:
          <Password
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              toggleMask
          />
        </label>
        <label>
          New Password:
          <Password
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              toggleMask
          />
        </label>
        <label>
          Repeat New Password:
          <Password
              name="repeatNewPassword"
              value={passwordData.repeatNewPassword}
              onChange={handlePasswordChange}
              toggleMask
          />
        </label>
        <button className="save-btn" onClick={handleResetPassword}>
          Submit
        </button>
      </div>
  );
}