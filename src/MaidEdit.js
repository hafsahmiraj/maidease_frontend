import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "primereact/rating";
import "./ProfilePageM.css";

export default function MaidEditableProfilePage() {
  const { maidId } = useParams();
  const [maid, setMaid] = useState(null);

  const [editing, setEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Simulating fetch
    const maidData = {
      id: "m1",
      name: "Ayesha Bibi",
      email: "ayesha@example.com",
      gender: "Female",
      cnic: "12345-6789012-3",
      contact: "0300-1234567",
      district: "Punjab",
      city: "Lahore",
      address: "House 123, Street ABC, Lahore",
      marital_status: "Married",
      experience: "3",
      skills: ["cleaning", "cooking"],
      job_type: "full_time",
      area: "Lahore",
      image: "maid1.webp",
      price: 15000,
      description:
        "Expert in home cleaning and babysitting with 5 years experience.",
      rating: 5,
    };
    setMaid(maidData);
  }, [maidId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaid((prev) => ({ ...prev, [name]: value }));
  };
   const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setMaid(prev => ({ ...prev, image: file.name }));
        }
    };

  const handleSave = () => {
    // You could add a backend update here
    setEditing(false);
  };

  if (!maid) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-left">
                <img
                            src={previewImage || `/${maid.image}`}
                            alt={maid.name}
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
            <div className="rating-summary">
              <h3>Reviews</h3>
              <p>58 reviews for this maid</p>
              <div className="rating-bar">
                <span>5 Stars</span>
                <div className="bar">
                  <div className="fill" style={{ width: "95%" }}></div>
                </div>
                <span>(57)</span>
              </div>
              <div className="rating-bar disabled">
                <span>4 Stars</span>
                <div className="bar">
                  <div className="fill" style={{ width: "0%" }}></div>
                </div>
                <span>(0)</span>
              </div>
              <div className="rating-bar disabled">
                <span>3 Stars</span>
                <div className="bar">
                  <div className="fill" style={{ width: "0%" }}></div>
                </div>
                <span>(0)</span>
              </div>
              <div className="rating-bar">
                <span>2 Stars</span>
                <div className="bar">
                  <div className="fill" style={{ width: "5%" }}></div>
                </div>
                <span>(1)</span>
              </div>
              <div className="rating-bar disabled">
                <span>1 Star</span>
                <div className="bar">
                  <div className="fill" style={{ width: "0%" }}></div>
                </div>
                <span>(0)</span>
              </div>
            </div>
          </div>
          <div className="profile-right">
            <div className="edit-header">
              <h2>{maid.name}</h2>
              <button className="edit-btn" onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
            <div className="rating-wrapper">
              <Rating value={maid.rating} readOnly cancel={false} stars={5} />
              <span className="rating-number">({maid.rating.toFixed(1)})</span>
            </div>
            <p className="profile-price">Salary: PKR {maid.price}</p>
            <p className="profile-description">{maid.description}</p>

            {!editing ? (
              <div className="profile-details">
                <h3>Personal Info</h3>
                <p>
                  
                  <strong>Email:</strong>
                  <span className="profile-value">{maid.email}</span>
                </p>
                <p>
                  <strong>Gender:</strong>
                  <span className="profile-value">{maid.gender}</span>
                </p>
                <p>
                  <strong>CNIC:</strong>
                  <span className="profile-value">{maid.cnic}</span>
                </p>
                <p>
                  <strong>Contact:</strong>
                  <span className="profile-value">{maid.contact}</span>
                </p>
                <p>
                  <strong>District:</strong>
                  <span className="profile-value">{maid.district}</span>
                </p>
                <p>
                  <strong>City:</strong>
                  <span className="profile-value">{maid.city}</span>
                </p>
                <p>
                  <strong>Address:</strong>
                  <span className="profile-value">{maid.address}</span>
                </p>
                <p>
                  <strong>Marital Status:</strong>
                  <span className="profile-value">{maid.marital_status}</span>
                </p>
                <p>
                  <strong>Experience:</strong>
                  <span className="profile-value">{maid.experience} years</span>
                </p>
                <p>
                  <strong>Skills:</strong>
                  <span className="profile-value">
                    {maid.skills.join(", ")}
                  </span>
                </p>
                <p>
                  <strong>Job Type:</strong>
                  <span className="profile-value">{maid.job_type}</span>
                </p>
              </div>
            ) : (
              <div className="edit-form">
                 <label>Name: <input name="name" value={maid.name} onChange={handleChange} /></label>
                <label>
                  Email:{" "}
                  <input
                    name="email"
                    value={maid.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Gender:{" "}
                  <input
                    name="gender"
                    value={maid.gender}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  CNIC:{" "}
                  <input
                    name="cnic"
                    value={maid.cnic}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Contact:{" "}
                  <input
                    name="contact"
                    value={maid.contact}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  District:{" "}
                  <input
                    name="district"
                    value={maid.district}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  City:{" "}
                  <input
                    name="city"
                    value={maid.city}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Address:{" "}
                  <input
                    name="address"
                    value={maid.address}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Marital Status:{" "}
                  <input
                    name="marital_status"
                    value={maid.marital_status}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Experience:{" "}
                  <input
                    name="experience"
                    value={maid.experience}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Skills:{" "}
                  <input
                    name="skills"
                    value={maid.skills.join(", ")}
                    onChange={(e) =>
                      setMaid((prev) => ({
                        ...prev,
                        skills: e.target.value.split(",").map((s) => s.trim()),
                      }))
                    }
                  />
                </label>
                <label>
                  Job Type:{" "}
                  <input
                    name="job_type"
                    value={maid.job_type}
                    onChange={handleChange}
                  />
                </label>
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
