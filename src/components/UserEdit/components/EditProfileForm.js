import React from 'react';
import {Dropdown} from 'primereact/dropdown';

export default function EditProfileForm({
                                          user,
                                          genderOptions,
                                          stateOptions,
                                          maritalOptions,
                                          handleChange,
                                          handleDropdownChange,
                                          handleFileChange,
                                          handleSave
                                        }) {
  return (
      <div className="edit-form">
        <label>
          Full Name:
          <input
              type="text"
              name="full_name"
              value={user.full_name}
              onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
              type="email"
              name="email"
              value={user.email}
              disabled
          />
        </label>
        <label>
          Gender:
          <Dropdown
              value={user.gender}
              options={genderOptions}
              onChange={(e) => handleDropdownChange("gender", e.value)}
              placeholder="Select Gender"
          />
        </label>
        <label>
          CNIC Number:
          <input
              type="text"
              name="cnic_number"
              value={user.cnic_number}
              disabled
          />
        </label>
        <label>
          Contact Number:
          <input
              type="text"
              name="contact_number"
              value={user.contact_number}
              onChange={handleChange}
          />
        </label>
        <label>
          State:
          <Dropdown
              value={user.state}
              options={stateOptions}
              onChange={(e) => handleDropdownChange("state", e.value)}
              placeholder="Select State"
          />
        </label>
        <label>
          City:
          <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
          />
        </label>
        <label>
          Current Address:
          <input
              type="text"
              name="current_address"
              value={user.current_address}
              onChange={handleChange}
          />
        </label>
        <label>
          Marital Status:
          <Dropdown
              value={user.marital_Status}
              options={maritalOptions}
              onChange={(e) => handleDropdownChange("marital_Status", e.value)}
              placeholder="Select Marital Status"
          />
        </label>
        <label>
          Profile Photo:
          <input
              type="file"
              name="profile_photo"
              onChange={handleFileChange}
          />
        </label>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
  );
}