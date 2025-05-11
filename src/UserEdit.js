import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Dropdown} from "primereact/dropdown";
import {Toast} from "primereact/toast";
import {Rating} from "primereact/rating";
import {Password} from "primereact/password";
import {ProgressSpinner} from "primereact/progressspinner";
import {TabPanel, TabView} from "primereact/tabview";
import "./ProfilePageM.css";

export default function UserEditPage() {
  const {userId} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 0 for Profile View, 1 for Edit Profile, 2 for Reset Password
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [ratingsSummary, setRatingsSummary] = useState([]);
  const toast = React.useRef(null);

  const genderOptions = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"},
  ];

  const stateOptions = [
    {label: "Punjab", value: "Punjab"},
    {label: "Sindh", value: "Sindh"},
    {label: "Balochistan", value: "Balochistan"},
    {label: "KPK", value: "KPK"},
  ];

  const maritalOptions = [
    {label: "Single", value: "Single"},
    {label: "Married", value: "Married"},
  ];

  const getTokenOrNavigateToLoginPage = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/user");
      return null;
    }
    return token;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getTokenOrNavigateToLoginPage();
      if (!token) return;

      try {
        setLoading(true);
        const response = await fetch(
            `http://localhost:5000/api/users/${userId}`,
            {
              headers: {Authorization: `Bearer ${token}`},
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
              headers: {Authorization: `Bearer ${token}`},
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
    const {name, value} = e.target;
    setUser((prev) => ({...prev, [name]: value}));
  };

  const handleDropdownChange = (name, value) => {
    setUser((prev) => ({...prev, [name]: value}));
  };

  const handleFileChange = (e) => {
    const {name} = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({...prev, [name]: reader.result}));
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
    const {name, value} = e.target;
    setPasswordData((prev) => ({...prev, [name]: value}));
  };

  const handleResetPassword = async () => {
    const {oldPassword, newPassword, repeatNewPassword} = passwordData;
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
            body: JSON.stringify({oldPassword, newPassword}),
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
        <Toast ref={toast}/>
        {loading && <ProgressSpinner/>}
        <div className="profile-card">
          <div className="profile-grid">
            <div className="profile-left">
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
              <div className="ratings-summary">
                <h3>Ratings Summary</h3>
                {[5, 4, 3, 2, 1].map((stars) => {
                  const rating = ratingsSummary.find((r) => r.stars === stars) || { value: 0 };
                  return (
                      <div key={stars} className="rating-row" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Rating value={stars} readOnly stars={5} cancel={false} />
                        <span>({rating.value})</span>
                      </div>
                  );
                })}
              </div>
            </div>
            <div className="profile-right">
              <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                <TabPanel header="Profile View">
                  <div className="rating-wrapper">
                    <Rating
                        value={user.averageRating || 0}
                        readOnly
                        cancel={false}
                        stars={5}
                    />
                    <span className="rating-number">
                    ({(user.averageRating || 0).toFixed(1)})
                  </span>
                  </div>
                  <div className="profile-details">
                    <h3>Personal Info</h3>
                    <p>
                      <strong>Full Name:</strong>
                      <span className="profile-value">{user.full_name}</span>
                    </p>
                    <p>
                      <strong>Email:</strong>
                      <span className="profile-value">{user.email}</span>
                    </p>
                    <p>
                      <strong>Gender:</strong>
                      <span className="profile-value">{user.gender}</span>
                    </p>
                    <p>
                      <strong>CNIC Number:</strong>
                      <span className="profile-value">{user.cnic_number}</span>
                    </p>
                    <p>
                      <strong>Contact Number:</strong>
                      <span className="profile-value">{user.contact_number}</span>
                    </p>
                    <p>
                      <strong>State:</strong>
                      <span className="profile-value">{user.state}</span>
                    </p>
                    <p>
                      <strong>City:</strong>
                      <span className="profile-value">{user.city}</span>
                    </p>
                    <p>
                      <strong>Current Address:</strong>
                      <span className="profile-value">{user.current_address}</span>
                    </p>
                    <p>
                      <strong>Marital Status:</strong>
                      <span className="profile-value">{user.marital_Status}</span>
                    </p>
                    <p>
                      <strong>Hire Count:</strong>
                      <span className="profile-value">{user.hireCount}</span>
                    </p>
                    <p>
                      <strong>Created At:</strong>
                      <span className="profile-value">
                        {new Date(user.createdAt).toLocaleString()}
                      </span>
                    </p>
                    <p>
                      <strong>Updated At:</strong>
                      <span className="profile-value">
                        {new Date(user.updatedAt).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </TabPanel>
                <TabPanel header="Edit Profile">
                  <div className="edit-form">
                    <label>
                      Full Name:{" "}
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
                          onChange={(e) =>
                              handleDropdownChange("gender", e.value)
                          }
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
                          onChange={(e) =>
                              handleDropdownChange("state", e.value)
                          }
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
                          onChange={(e) =>
                              handleDropdownChange("marital_Status", e.value)
                          }
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
                </TabPanel>
                <TabPanel header="Reset Password">
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
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
  );
}