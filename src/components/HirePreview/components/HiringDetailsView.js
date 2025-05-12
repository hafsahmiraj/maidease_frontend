import React from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Accepted", value: "Accepted" },
  { label: "Rejected", value: "Rejected" }
];

export default function HiringDetailsView({ hiringDetails, userType, onPayment, onStatusChange }) {
  const isUser = userType === "USER";

  return (
    <div className="hiring-details">
      <img
        src={hiringDetails.house_photo}
        alt="House"
        className="house-photo"
        style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "20px" }}
      />

      <div className="profile-details">
        <h3>Hiring Information</h3>
        <p><strong>House Size:</strong> <span className="profile-value">{hiringDetails.house_size} Marla</span></p>
        <p><strong>Number of Portions:</strong> <span className="profile-value">{hiringDetails.no_of_portions}</span></p>
        <p><strong>Number of People:</strong> <span className="profile-value">{hiringDetails.no_of_peoples}</span></p>
        <p><strong>Hired Skills:</strong> <span className="profile-value">{hiringDetails.hired_skills.join(", ")}</span></p>
        <p><strong>Preferred Work Time:</strong> <span className="profile-value">{hiringDetails.preferred_work_time}</span></p>
        <p><strong>Total Amount:</strong> <span className="profile-value">Rs. {hiringDetails.total_amount}</span></p>
        <p>
          <strong>Acceptance Status:</strong>
          <span className="profile-value">
            {hiringDetails.acceptance_status}
            {!isUser && hiringDetails.acceptance_status === "Pending" && (
              <Dropdown
                options={statusOptions}
                onChange={(e) => onStatusChange(e.value)}
                placeholder="Change Status"
                className="ml-2"
              />
            )}
          </span>
        </p>
        <p>
          <strong>Payment Status:</strong>
          <span className="profile-value">
            {hiringDetails.payment_status}
            {isUser &&
             hiringDetails.acceptance_status === "Accepted" &&
             hiringDetails.payment_status === "Pending" && (
              <Button
                label="Pay Now"
                className="p-button-success ml-2"
                onClick={onPayment}
              />
            )}
          </span>
        </p>
        <p><strong>Created At:</strong> <span className="profile-value">{new Date(hiringDetails.createdAt).toLocaleString()}</span></p>
        <p><strong>Updated At:</strong> <span className="profile-value">{new Date(hiringDetails.updatedAt).toLocaleString()}</span></p>
      </div>
    </div>
  );
}