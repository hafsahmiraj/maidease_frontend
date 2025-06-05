import React from 'react';
import {Dropdown} from 'primereact/dropdown';
import {MultiSelect} from 'primereact/multiselect';

const genderOptions = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"}
];

const stateOptions = [
    {label: "Punjab", value: "Punjab"},
    {label: "Sindh", value: "Sindh"},
    {label: "Balochistan", value: "Balochistan"},
    {label: "KPK", value: "KPK"}
];

const maritalOptions = [
    {label: "Single", value: "Single"},
    {label: "Married", value: "Married"}
];

const skillsOptions = [
    {label: "Cleaning", value: "Cleaning"},
    {label: "Cooking", value: "Cooking"},
    {label: "Babysitting", value: "Babysitting"},
    {label: "Laundry", value: "Laundry"}
];

export default function EditProfileForm({
                                            maid,
                                            handleChange,
                                            handleDropdownChange,
                                            handleMultiSelectChange,
                                            handleFileChange,
                                            handleSave
                                        }) {
    const handleExperienceChange = (e) => {
        const value = parseFloat(e.target.value);
        handleChange({
            target: {
                name: 'experience',
                value: isNaN(value) ? 0 : value
            }
        });
    };

    return (
        <div className="edit-form">
            <label>
                Full Name:
                <input
                    type="text"
                    name="full_name"
                    value={maid.full_name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={maid.email}
                    disabled
                />
            </label>
            <label>
                Profile Title:
                <input
                    type="text"
                    name="profile_title"
                    value={maid.profile_title}
                    onChange={handleChange}
                />
            </label>
            <label>
                Gender:
                <Dropdown
                    value={maid.gender}
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
                    value={maid.cnic_number}
                    disabled
                />
            </label>
            <label>
                Contact Number:
                <input
                    type="text"
                    name="contact_number"
                    value={maid.contact_number}
                    onChange={handleChange}
                />
            </label>
            <label>
                State:
                <Dropdown
                    value={maid.state}
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
                    value={maid.city}
                    onChange={handleChange}
                />
            </label>
            <label>
                Current Address:
                <input
                    type="text"
                    name="current_address"
                    value={maid.current_address}
                    onChange={handleChange}
                />
            </label>
            <label>
                Marital Status:
                <Dropdown
                    value={maid.marital_Status}
                    options={maritalOptions}
                    onChange={(e) => handleDropdownChange("marital_Status", e.value)}
                    placeholder="Select Marital Status"
                />
            </label>
            <label>
                Experience (in years):
                <input
                    type="number"
                    name="experience"
                    value={maid.experience}
                    onChange={handleExperienceChange}
                    step="0.1"
                />
            </label>
            <label>
                Skills:
                <MultiSelect
                    value={maid.skills}
                    options={skillsOptions}
                    onChange={handleMultiSelectChange}
                    placeholder="Select Skills"
                />
            </label>
            <label>
                Profile Description:
                <textarea
                    name="profile_description"
                    value={maid.profile_description}
                    onChange={handleChange}
                    rows="4"
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