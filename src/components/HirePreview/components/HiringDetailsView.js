import React, { useState } from 'react';
    import { Button } from 'primereact/button';
    import { Dropdown } from 'primereact/dropdown';
    import { Dialog } from 'primereact/dialog';
    import { Rating } from 'primereact/rating';

    const statusOptions = [
      { label: "Pending", value: "Pending" },
      { label: "Accepted", value: "Accepted" },
      { label: "Rejected", value: "Rejected" }
    ];

    export default function HiringDetailsView({ hiringDetails, userType, onPayment, onStatusChange }) {
      const isUser = userType === "USER";
      const [showRatingDialog, setShowRatingDialog] = useState(false);
      const [ratingValue, setRatingValue] = useState(0);
      const [ratingLoading, setRatingLoading] = useState(false);
      const [ratingError, setRatingError] = useState('');
      const [localDetails, setLocalDetails] = useState(hiringDetails);
      const [ratingTarget, setRatingTarget] = useState(null); // 'maid' or 'user'

      // API endpoints
      const apiUrl = ratingTarget === 'maid'
        ? "http://localhost:5000/api/maids/hire/rating/maid"
        : "http://localhost:5000/api/maids/hire/rating/user";

      // Show ratings only if payment is Paid
      const canShowRatings = localDetails.payment_status === "Paid";

      // Only allow giving rating if it's 0 and payment is Paid
      const canGiveMaidRating = isUser && localDetails.maid_rating === 0 && canShowRatings;
      const canGiveUserRating = !isUser && localDetails.user_rating === 0 && canShowRatings;

      // Submit rating
      const handleSubmitRating = async () => {
        setRatingLoading(true);
        setRatingError('');
        const token = localStorage.getItem('token');
        const body = { maid_hire_id: hiringDetails.id, rating: ratingValue };

        try {
          const res = await fetch(apiUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
          });
          if (res.ok) {
            setLocalDetails(prev => ({
              ...prev,
              ...(ratingTarget === 'maid' ? { maid_rating: ratingValue } : { user_rating: ratingValue })
            }));
            setShowRatingDialog(false);
            setRatingValue(0);
          } else {
            setRatingError("Failed to submit rating.");
          }
        } catch {
          setRatingError("Failed to submit rating.");
        }
        setRatingLoading(false);
      };

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

            {canShowRatings && (
              <div className="rating-row-flex">
                <strong className="rating-label">Maid Rating:</strong>
                {localDetails.maid_rating > 0 ? (
                  <Rating value={localDetails.maid_rating} readOnly stars={5} cancel={false} />
                ) : (
                  <>
                    <span className="text-500">No rating yet</span>
                    {canGiveMaidRating && (
                      <Button
                        label="Give Rating"
                        className="p-button-info ml-2"
                        style={{ marginLeft: 12 }}
                        onClick={() => { setShowRatingDialog(true); setRatingTarget('maid'); }}
                      />
                    )}
                  </>
                )}
              </div>
            )}

            {canShowRatings && (
              <div className="rating-row-flex">
                <strong className="rating-label">User Rating:</strong>
                {localDetails.user_rating > 0 ? (
                  <Rating value={localDetails.user_rating} readOnly stars={5} cancel={false} />
                ) : (
                  <>
                    <span className="text-500">No rating yet</span>
                    {canGiveUserRating && (
                      <Button
                        label="Give Rating"
                        className="p-button-info ml-2"
                        style={{ marginLeft: 12 }}
                        onClick={() => { setShowRatingDialog(true); setRatingTarget('user'); }}
                      />
                    )}
                  </>
                )}
              </div>
            )}

            <p><strong>Created At:</strong> <span className="profile-value">{new Date(hiringDetails.createdAt).toLocaleString()}</span></p>
            <p><strong>Updated At:</strong> <span className="profile-value">{new Date(hiringDetails.updatedAt).toLocaleString()}</span></p>
          </div>

          {/* Rating Dialog */}
          <Dialog
            header="Give Rating"
            visible={showRatingDialog}
            style={{ width: '350px' }}
            onHide={() => setShowRatingDialog(false)}
            footer={
              <div>
                <Button label="Cancel" onClick={() => setShowRatingDialog(false)} className="p-button-text" />
                <Button label="Submit" onClick={handleSubmitRating} loading={ratingLoading} disabled={ratingValue === 0} />
              </div>
            }
          >
            <div className="flex flex-column align-items-center">
              <span className="mb-2">Select your rating:</span>
              <Rating value={ratingValue} onChange={e => setRatingValue(e.value)} stars={5} cancel={false} />
              {ratingError && <div className="text-danger mt-2">{ratingError}</div>}
            </div>
          </Dialog>
        </div>
      );
    }