import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import EditProfileForm from './components/EditProfileForm';
import ResetPassword from '../UserEdit/components/ResetPassword';
import ProfileImage from '../UserEdit/components/ProfileImage';
import RatingSummary from '../UserEdit/components/RatingSummary';
import ProfileView from './components/ProfileView';
import '../UserEdit/UserEdit.css';

export default function MaidEditNew() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [maid, setMaid] = useState(null);
  const [ratingsSummary, setRatingsSummary] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const toast = useRef(null);

  const getTokenOrNavigateToLoginPage = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/maid");
      return null;
    }
    return token;
  };

  React.useEffect(() => {
    const fetchMaidData = async () => {
      const token = getTokenOrNavigateToLoginPage();
      if (!token) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/maids/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setLoading(false);
        if (response.ok) {
          setMaid(data);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to fetch maid data",
          });
        }
      } catch (error) {
        setLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
        });
      }
    };

    const fetchRatingsSummary = async () => {
      const token = getTokenOrNavigateToLoginPage();
      if (!token) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/maids/hire/rating/maid/${userId}`
        );
        const data = await response.json();
        if (response.ok) {
          setRatingsSummary(data.ratings);
        }
      } catch (error) {
        console.error("Failed to fetch ratings summary");
      }
    };

    fetchMaidData();
    fetchRatingsSummary();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaid(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (field, value) => {
    setMaid(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (e) => {
    setMaid(prev => ({ ...prev, skills: e.value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMaid(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const token = getTokenOrNavigateToLoginPage();
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/maids/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(maid),
        }
      );
      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Profile updated successfully",
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: result.message || "Failed to update profile",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = async () => {
    const { oldPassword, newPassword, repeatNewPassword } = passwordData;
    if (!oldPassword || !newPassword || !repeatNewPassword) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "All fields are required",
      });
      return;
    }
    if (newPassword !== repeatNewPassword) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "New passwords do not match",
      });
      return;
    }

    const token = getTokenOrNavigateToLoginPage();
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/maids/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );
      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Password updated successfully",
        });
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          repeatNewPassword: "",
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: result.message || "Failed to update password",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  };

  if (!maid) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Toast ref={toast} />
      {loading && <ProgressSpinner />}
      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-left">
            <ProfileImage user={maid} />
            <RatingSummary ratingsSummary={ratingsSummary} />
          </div>
          <div className="profile-right">
            <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
              <TabPanel header="Profile View">
                <ProfileView maid={maid} />
              </TabPanel>
              <TabPanel header="Edit Profile">
                <EditProfileForm
                  maid={maid}
                  handleChange={handleChange}
                  handleDropdownChange={handleDropdownChange}
                  handleMultiSelectChange={handleMultiSelectChange}
                  handleFileChange={handleFileChange}
                  handleSave={handleSave}
                />
              </TabPanel>
              <TabPanel header="Reset Password">
                <ResetPassword
                  passwordData={passwordData}
                  handlePasswordChange={handlePasswordChange}
                  handleResetPassword={handleResetPassword}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </div>
  );
}