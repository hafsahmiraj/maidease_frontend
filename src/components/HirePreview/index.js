<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import ProfileImage from '../UserEdit/components/ProfileImage';
import RatingSummary from '../UserEdit/components/RatingSummary';
import UserProfileView from '../UserEdit/components/ProfileView';
import MaidProfileView from '../MaidEdit/components/ProfileView';
import HiringDetailsView from './components/HiringDetailsView';
import '../UserEdit/UserEdit.css';

const acceptanceOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Accepted", value: "Accepted" },
  { label: "Rejected", value: "Rejected" }
];

export default function HirePreview() {
  const { maidHireId } = useParams();
  const navigate = useNavigate();
  const [hiringDetails, setHiringDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [ratingsSummary, setRatingsSummary] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const toast = useRef(null);
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hireResponse = await fetch(
          `http://localhost:5000/api/maids/hire/single/${maidHireId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const hireData = await hireResponse.json();

        if (hireResponse.ok) {
          setHiringDetails(hireData.maidHire);

          // Fetch profile based on userType
          const profileId = userType === "USER" ? hireData.maidHire.maid_id : hireData.maidHire.user_id;
          const profileUrl = userType === "USER"
            ? `http://localhost:5000/api/maids/profile/${profileId}`
            : `http://localhost:5000/api/users/${profileId}`;

          const profileResponse = await fetch(profileUrl, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const profileData = await profileResponse.json();

          if (profileResponse.ok) {
            setProfileDetails(profileData);

            // Fetch ratings
            const ratingUrl = userType === "USER"
              ? `http://localhost:5000/api/maids/hire/rating/maid/${profileId}`
              : `http://localhost:5000/api/maids/hire/rating/user/${profileId}`;

            const ratingsResponse = await fetch(ratingUrl, {
              headers: userType !== "USER" ? { Authorization: `Bearer ${token}` } : {}
            });
            const ratingsData = await ratingsResponse.json();

            if (ratingsResponse.ok) {
              setRatingsSummary(ratingsData.ratings);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch data"
        });
      }
    };

    fetchData();
  }, [maidHireId, userType, token]);

  // Stripe payment handler
  const handleStripePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/maids/hire/stripe/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ maid_hire_id: parseInt(maidHireId, 10) }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.message || "Failed to initiate payment"
        });
      }
    } catch (err) {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Payment initiation failed"
      });
    }
  };

  const handleAction = async () => {
    const apiUrl = userType === "USER"
      ? "http://localhost:5000/api/maids/hire/payment-status"
      : "http://localhost:5000/api/maids/hire/acceptance-status";

    const body = userType === "USER"
      ? { maid_hire_id: maidHireId, payment_status: "Paid" }
      : { maid_hire_id: maidHireId, status: selectedStatus };

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setHiringDetails(prev => ({
          ...prev,
          ...(userType === "USER"
            ? { payment_status: "Paid" }
            : { acceptance_status: selectedStatus })
        }));
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Status updated successfully"
        });
      }
      setLoading(false);
      setShowDialog(false);
    } catch (error) {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update status"
      });
    }
  };

  if (!hiringDetails || !profileDetails) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Toast ref={toast} />
      {loading && <ProgressSpinner />}
      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-left">
            <ProfileImage user={profileDetails} isPrivate={true} />
            <RatingSummary ratingsSummary={ratingsSummary} />
          </div>
          <div className="profile-right">
            <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
              <TabPanel header="Hiring Details">
                <HiringDetailsView
                  hiringDetails={hiringDetails}
                  userType={userType}
                  onPayment={handleStripePayment}
                  onStatusChange={(value) => {
                    setSelectedStatus(value);
                    setShowDialog(true);
                  }}
                />
              </TabPanel>
              <TabPanel header={userType === "USER" ? "Maid Profile" : "User Profile"}>
                {userType === "USER"
                  ? <MaidProfileView maid={profileDetails} />
                  : <UserProfileView user={profileDetails} />
                }
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>

      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        header="Confirm Action"
        footer={
          <div>
            <Button label="Cancel" onClick={() => setShowDialog(false)} />
            <Button label="Confirm" onClick={handleAction} />
          </div>
        }
      >
        {userType === "USER"
          ? "Are you sure you want to mark this payment as Paid?"
          : `Are you sure you want to change status to ${selectedStatus}?`
        }
      </Dialog>
    </div>
  );
=======
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import ProfileImage from '../UserEdit/components/ProfileImage';
import RatingSummary from '../UserEdit/components/RatingSummary';
import UserProfileView from '../UserEdit/components/ProfileView';
import MaidProfileView from '../MaidEdit/components/ProfileView';
import HiringDetailsView from './components/HiringDetailsView';
import '../UserEdit/UserEdit.css';

const acceptanceOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Accepted", value: "Accepted" },
  { label: "Rejected", value: "Rejected" }
];

export default function HirePreview() {
  const { maidHireId } = useParams();
  const navigate = useNavigate();
  const [hiringDetails, setHiringDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [ratingsSummary, setRatingsSummary] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const toast = useRef(null);
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hireResponse = await fetch(
          `http://localhost:5000/api/maids/hire/single/${maidHireId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const hireData = await hireResponse.json();

        if (hireResponse.ok) {
          setHiringDetails(hireData.maidHire);

          // Fetch profile based on userType
          const profileId = userType === "USER" ? hireData.maidHire.maid_id : hireData.maidHire.user_id;
          const profileUrl = userType === "USER"
            ? `http://localhost:5000/api/maids/profile/${profileId}`
            : `http://localhost:5000/api/users/${profileId}`;

          const profileResponse = await fetch(profileUrl, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const profileData = await profileResponse.json();

          if (profileResponse.ok) {
            setProfileDetails(profileData);

            // Fetch ratings
            const ratingUrl = userType === "USER"
              ? `http://localhost:5000/api/maids/hire/rating/maid/${profileId}`
              : `http://localhost:5000/api/maids/hire/rating/user/${profileId}`;

            const ratingsResponse = await fetch(ratingUrl, {
              headers: userType !== "USER" ? { Authorization: `Bearer ${token}` } : {}
            });
            const ratingsData = await ratingsResponse.json();

            if (ratingsResponse.ok) {
              setRatingsSummary(ratingsData.ratings);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch data"
        });
      }
    };

    fetchData();
  }, [maidHireId, userType, token]);

  // Stripe payment handler
  const handleStripePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/maids/hire/stripe/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ maid_hire_id: parseInt(maidHireId, 10) }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.message || "Failed to initiate payment"
        });
      }
    } catch (err) {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Payment initiation failed"
      });
    }
  };

  const handleAction = async () => {
    const apiUrl = userType === "USER"
      ? "http://localhost:5000/api/maids/hire/payment-status"
      : "http://localhost:5000/api/maids/hire/acceptance-status";

    const body = userType === "USER"
      ? { maid_hire_id: maidHireId, payment_status: "Paid" }
      : { maid_hire_id: maidHireId, status: selectedStatus };

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setHiringDetails(prev => ({
          ...prev,
          ...(userType === "USER"
              ? { payment_status: "Paid" }
              : { acceptance_status: selectedStatus })
        }));
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Status updated successfully"
        });
      } else {
        const errorData = await response.json();
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: errorData.message || "Failed to update status"
        });
      }
      setLoading(false);
      setShowDialog(false);
    } catch (error) {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update status"
      });
    }
  };

  if (!hiringDetails || !profileDetails) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Toast ref={toast} />
      {loading && <ProgressSpinner />}
      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-left">
            <ProfileImage user={profileDetails} isPrivate={true} />
            <RatingSummary ratingsSummary={ratingsSummary} />
          </div>
          <div className="profile-right">
            <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
              <TabPanel header="Hiring Details">
                <HiringDetailsView
                  hiringDetails={hiringDetails}
                  userType={userType}
                  onPayment={handleStripePayment}
                  onStatusChange={(value) => {
                    setSelectedStatus(value);
                    setShowDialog(true);
                  }}
                />
              </TabPanel>
              <TabPanel header={userType === "USER" ? "Maid Profile" : "User Profile"}>
                {userType === "USER"
                  ? <MaidProfileView maid={profileDetails} />
                  : <UserProfileView user={profileDetails} />
                }
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>

      <Dialog
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        header="Confirm Action"
        footer={
          <div>
            <Button label="Cancel" onClick={() => setShowDialog(false)} />
            <Button label="Confirm" onClick={handleAction} />
          </div>
        }
      >
        {userType === "USER"
          ? "Are you sure you want to mark this payment as Paid?"
          : `Are you sure you want to change status to ${selectedStatus}?`
        }
      </Dialog>
    </div>
  );
>>>>>>> f65d11ae3e5a6a53b067ff8b67791d03940801a0
}