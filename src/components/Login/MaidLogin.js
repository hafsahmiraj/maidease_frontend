import React, {useRef, useState} from 'react';
import {Toast} from 'primereact/toast';
import {Dropdown} from 'primereact/dropdown';
import {MultiSelect} from 'primereact/multiselect';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import {ProgressSpinner} from "primereact/progressspinner";
import './login.css';

export default function MaidLogin() {
  const [signupStep, setSignupStep] = useState(0);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    gender: "",
    cnic_number: "",
    contact_number: "",
    state: "",
    city: "",
    current_address: "",
    marital_Status: "",
    experience: "",
    skills: "",
    job_type: "",
    profile_photo: null,
    cnic_photo_front: null,
    cnic_photo_back: null,
    use_ai: false
  });
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const genderOptions = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"},
  ];

  const stateOptions = [
    {label: "Punjab", value: "Punjab"},
    {label: "Sindh", value: "Sindh"},
    {label: "Balochistan", value: "Balochistan"},
    {label: "KPK", value: "KPK"},
    {label: "Other", value: "Other"},
  ];

  const maritalOptions = [
    {label: "Single", value: "Single"},
    {label: "Married", value: "Married"},
    {label: "Widow", value: "Widow"},
  ];

  const skillsOptions = [
    {label: "Cleaning", value: "Cleaning"},
    {label: "Cooking", value: "Cooking"},
    {label: "Washing dishes", value: "Washing dishes"},
    {label: "Babysitting", value: "Babysitting"},
    {label: "Laundry", value: "Laundry"},
    {label: "Gardening", value: "Gardening"},
    {label: "Full Time", value: "Full Time"},
  ];

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? parseFloat(value) : value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const selectedSkills = e.value;
    setFormData((prev) => ({
      ...prev,
      skills: JSON.stringify(selectedSkills),
    }));
  };

  const handleFileChange = (e) => {
    const {name} = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({...prev, [name]: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    for (const key in formData) {
      if (!formData[key] && key !== "job_type" &&
          !(formData.use_ai && (key === "title" || key === "description"))) {
        toast.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: `${key.replace("_", " ")} is required`,
        });
        return false;
      }
    }
    return true;
  };

  const storeUserDataAndRedirect = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.maid.id);
    localStorage.setItem('userType', 'MAID');
    localStorage.setItem('userDetails', JSON.stringify(data.maid));
    window.location.href = `/maidedit/${data.maid.id}`;
  }

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/maids/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...formData, job_type: ""}),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        storeUserDataAndRedirect(data);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.message,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log('error in catch: ', error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/maids/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        storeUserDataAndRedirect(data);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.message,
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

  return (
      <>
        <Toast ref={toast}/>
        {loading && <ProgressSpinner/>}
        <div className="login-page-wrapper">
          <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
            <div className="form-container sign-up-container">
              <form onSubmit={(e) => e.preventDefault()}>
                <h1>Create Maid Account</h1>
                <div className="form-step-wrapper">
                  {signupStep === 0 && (
                      <>
                        <input type="text" name="full_name" placeholder="Full Name"
                               onChange={handleInputChange} required/>
                        <input type="email" name="email" placeholder="Email" onChange={handleInputChange}
                               required/>
                        <input type="password" name="password" placeholder="Password"
                               onChange={handleInputChange} required/>
                        <Dropdown
                            value={formData.gender}
                            onChange={(e) => setFormData((prev) => ({...prev, gender: e.value}))}
                            options={genderOptions}
                            placeholder="Select Gender"
                            className="w-full"
                        />
                        <input type="text" name="cnic_number" placeholder="CNIC Number"
                               onChange={handleInputChange} required/>
                      </>
                  )}
                  {signupStep === 1 && (
                      <>
                        <input type="text" name="contact_number" placeholder="Contact Number"
                               onChange={handleInputChange} required/>
                        <input type="text" name="city" placeholder="City" onChange={handleInputChange}
                               required/>
                        <input type="text" name="current_address" placeholder="Current Address"
                               onChange={handleInputChange} required/>
                        <Dropdown
                            value={formData.state}
                            onChange={(e) => setFormData((prev) => ({...prev, state: e.value}))}
                            options={stateOptions}
                            placeholder="Select Provience"
                            className="w-full"
                            required
                        />
                        <Dropdown
                            value={formData.marital_Status}
                            onChange={(e) => setFormData((prev) => ({
                              ...prev,
                              marital_Status: e.value
                            }))}
                            options={maritalOptions}
                            placeholder="Marital Status"
                            className="w-full"
                        />
                        <input
                            type="number"
                            step="0.1"
                            name="experience"
                            placeholder="Experience (in years)"
                            onChange={handleInputChange}
                            required
                        />
                      </>
                  )}
                  {signupStep === 2 && (
                      <>
                        <MultiSelect
                            value={JSON.parse(formData.skills || "[]")}
                            options={skillsOptions}
                            onChange={handleMultiSelectChange}
                            placeholder="Select Skills"
                            display="chip"
                            className="w-full"
                            required
                        />
                        <div className="checkbox-container">
                          <Checkbox
                              inputId="use_ai"
                              checked={formData.use_ai || false}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  use_ai: e.checked,
                                  ...(e.checked && {title: '', description: ''}) // Clear title and description if checked
                                });
                              }}
                              className="checkbox-align"
                          />
                          <label htmlFor="use_ai" title="Use AI to generate title and description">Use AI</label>
                        </div>
                        <InputTextarea
                            name="title"
                            placeholder="Enter Title"
                            value={formData.title || ''}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full"
                            disabled={formData.use_ai || false}
                            required
                        />
                        <InputTextarea
                            name="description"
                            placeholder="Enter Description"
                            value={formData.description || ''}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full"
                            disabled={formData.use_ai || false}
                            required
                        />
                      </>
                  )}
                  {signupStep === 3 && (
                      <>
                        <label htmlFor="profile_photo">Upload Profile Photo</label>
                        <input type="file" name="profile_photo" onChange={handleFileChange} required/>
                        <label htmlFor="cnic_photo_front">Upload CNIC Front</label>
                        <input type="file" name="cnic_photo_front" onChange={handleFileChange} required/>
                        <label htmlFor="cnic_photo_back">Upload CNIC Back</label>
                        <input type="file" name="cnic_photo_back" onChange={handleFileChange} required/>
                      </>
                  )}
                </div>
                <div className="step-nav">
                  {signupStep > 0 &&
                      <button type="button" onClick={() => setSignupStep(signupStep - 1)}>Back</button>}
                  {signupStep < 3 &&
                      <button type="button" onClick={() => setSignupStep(signupStep + 1)}>Next</button>}
                  {signupStep === 3 && <button type="button" onClick={handleSignup}>Sign Up</button>}
                </div>
              </form>
            </div>

            <div className="form-container sign-in-container">
              <form onSubmit={(e) => e.preventDefault()}>
                <h1>Maid Sign in</h1>
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required/>
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange}
                       required/>
                <button type="button" onClick={handleLogin}>Sign In</button>
              </form>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start your journey with us</p>
                  <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}