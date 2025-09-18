<<<<<<< HEAD
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import ProfileView from './components/ProfileView';
import EditProfileForm from './components/EditProfileForm';
import ResetPassword from './components/ResetPassword';
import ProfileImage from './components/ProfileImage';
import RatingSummary from './components/RatingSummary';
import './UserEdit.css';

export default function UserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
      navigate("/login/user");
      return null;
    }
    return token;
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      const token = getTokenOrNavigateToLoginPage();
      if (!token) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setLoading(false);
        if (response.ok) {
          setUser(data);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to fetch user data",
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
          `http://localhost:5000/api/maids/hire/rating/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setRatingsSummary(data.ratings);
        }
      } catch (error) {
        console.error("Failed to fetch ratings summary");
      }
    };

    fetchUserData();
    fetchRatingsSummary();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, [name]: reader.result }));
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
        "http://localhost:5000/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
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
        "http://localhost:5000/api/users/update-password",
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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Toast ref={toast} />
      {loading && <ProgressSpinner />}
      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-left">
            <ProfileImage user={user} />
            <RatingSummary ratingsSummary={ratingsSummary} />
          </div>
          <div className="profile-right">
            <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
              <TabPanel header="Profile View">
                <ProfileView user={user} />
              </TabPanel>
              <TabPanel header="Edit Profile">
                <EditProfileForm
                  user={user}
                  genderOptions={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                  stateOptions={[
                    { label: "Punjab", value: "Punjab" },
                    { label: "Sindh", value: "Sindh" },
                    { label: "Balochistan", value: "Balochistan" },
                    { label: "KPK", value: "KPK" },
                  ]}
                  maritalOptions={[
                    { label: "Single", value: "Single" },
                    { label: "Married", value: "Married" },
                  ]}
                  handleChange={handleChange}
                  handleDropdownChange={handleDropdownChange}
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
=======
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import ProfileView from './components/ProfileView';
import EditProfileForm from './components/EditProfileForm';
import ResetPassword from './components/ResetPassword';
import ProfileImage from './components/ProfileImage';
import RatingSummary from './components/RatingSummary';
import './UserEdit.css';

export default function UserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
      navigate("/login/user");
      return null;
    }
    return token;
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      const token = getTokenOrNavigateToLoginPage();
      if (!token) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setLoading(false);
        if (response.ok) {
          setUser(data);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to fetch user data",
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
          `http://localhost:5000/api/maids/hire/rating/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setRatingsSummary(data.ratings);
        }
      } catch (error) {
        console.error("Failed to fetch ratings summary");
      }
    };

    fetchUserData();
    fetchRatingsSummary();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, [name]: reader.result }));
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
        "http://localhost:5000/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
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
        "http://localhost:5000/api/users/update-password",
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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Toast ref={toast} />
      {loading && <ProgressSpinner />}
      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-left">
            <ProfileImage user={user} isPrivate={true}/>
            <RatingSummary ratingsSummary={ratingsSummary} />
          </div>
          <div className="profile-right">
            <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
              <TabPanel header="Profile View">
                <ProfileView user={user} />
              </TabPanel>
              <TabPanel header="Edit Profile">
                <EditProfileForm
                  user={user}
                  genderOptions={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                  stateOptions={[
                    { label: "Punjab", value: "Punjab" },
                    { label: "Sindh", value: "Sindh" },
                    { label: "Balochistan", value: "Balochistan" },
                    { label: "KPK", value: "KPK" },
                  ]}
                  maritalOptions={[
                    { label: "Single", value: "Single" },
                    { label: "Married", value: "Married" },
                  ]}
                  handleChange={handleChange}
                  handleDropdownChange={handleDropdownChange}
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
>>>>>>> f65d11ae3e5a6a53b067ff8b67791d03940801a0
}