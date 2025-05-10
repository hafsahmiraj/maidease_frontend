import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { Toast } from "primereact/toast";
    import { Rating } from "primereact/rating";
    import { ProgressSpinner } from "primereact/progressspinner";
    import "./ProfilePageM.css";

    export default function MaidEditPage() {
      const navigate = useNavigate();
      const [maid, setMaid] = useState(null);
      const [editing, setEditing] = useState(false);
      const [previewImage, setPreviewImage] = useState(null);
      const [loading, setLoading] = useState(false);
      const [genderOptions] = useState(["Male", "Female", "Other"]);
      const [maritalStatusOptions] = useState(["Single", "Married"]);
      const [stateOptions] = useState(["Punjab", "Sindh", "Balochistan", "KPK"]);
      const toast = React.useRef(null);

      useEffect(() => {
        const fetchMaidData = async () => {
          const token = localStorage.getItem("token");
          try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/maids/profile/4", {
              headers: { Authorization: `Bearer ${token}` },
            });
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
        fetchMaidData();
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setMaid((prev) => ({ ...prev, [name]: value }));
      };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setPreviewImage(imageUrl);
          setMaid((prev) => ({ ...prev, profile_photo: file.name }));
        }
      };

      const handleSave = async () => {
        const token = localStorage.getItem("token");
        try {
          setLoading(true);
          const response = await fetch("http://localhost:5000/api/maids/update-profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(maid),
          });
          const result = await response.json();
          setLoading(false);
          if (response.ok) {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Profile updated successfully",
            });
            setEditing(false);
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

      const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };

      if (!maid) return <div>Loading...</div>;

      return (
        <div className="profile-page">
          <Toast ref={toast} />
          {loading && <ProgressSpinner />}
          <div className="profile-card">
            <div className="profile-grid">
              <div className="profile-left">
                <img
                  src={previewImage || `/${maid.profile_photo}`}
                  alt={maid.full_name}
                  className="profile-main-img"
                />
                {editing && (
                  <div className="image-upload">
                    <label htmlFor="imageUpload" className="upload-label">Change Image:</label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
              <div className="profile-right">
                <div className="edit-header">
                  <h2>{maid.full_name}</h2>
                  <button className="edit-btn" onClick={() => setEditing(!editing)}>
                    {editing ? "Cancel" : "Edit"}
                  </button>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
                <div className="rating-wrapper">
                  <Rating value={maid.rating || 0} readOnly cancel={false} stars={5} />
                  <span className="rating-number">({(maid.rating || 0).toFixed(1)})</span>
                </div>

                {!editing ? (
                  <div className="profile-details">
                    <h3>Personal Info</h3>
                    <p><strong>Email:</strong><span className="profile-value">{maid.email}</span></p>
                    <p><strong>Contact:</strong><span className="profile-value">{maid.contact_number}</span></p>
                    <p><strong>City:</strong><span className="profile-value">{maid.city}</span></p>
                    <p><strong>Address:</strong><span className="profile-value">{maid.current_address}</span></p>
                    <p><strong>State:</strong><span className="profile-value">{maid.state}</span></p>
                    <p><strong>Gender:</strong><span className="profile-value">{maid.gender}</span></p>
                    <p><strong>Marital Status:</strong><span className="profile-value">{maid.marital_Status}</span></p>
                    <p><strong>Experience:</strong><span className="profile-value">{maid.experience} years</span></p>
                    <p><strong>Skills:</strong><span className="profile-value">{JSON.parse(maid.skills || "[]").join(", ")}</span></p>
                  </div>
                ) : (
                  <div className="edit-form">
                    <label>Full Name: <input name="full_name" value={maid.full_name} onChange={handleChange} /></label>
                    <label>Email: <input name="email" value={maid.email} onChange={handleChange} /></label>
                    <label>Contact: <input name="contact_number" value={maid.contact_number} onChange={handleChange} /></label>
                    <label>City: <input name="city" value={maid.city} onChange={handleChange} /></label>
                    <label>Address: <input name="current_address" value={maid.current_address} onChange={handleChange} /></label>
                    <label>State:
                      <select name="state" value={maid.state} onChange={handleChange}>
                        {stateOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label>Gender:
                      <select name="gender" value={maid.gender} onChange={handleChange}>
                        {genderOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label>Marital Status:
                      <select name="marital_Status" value={maid.marital_Status} onChange={handleChange}>
                        {maritalStatusOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label>Experience: <input name="experience" type="number" value={maid.experience} onChange={handleChange} /></label>
                    <label>Skills: <input name="skills" value={maid.skills} onChange={handleChange} /></label>
                    <button className="save-btn" onClick={handleSave}>Save</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }