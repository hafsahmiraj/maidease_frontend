import {useRef, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {Toast} from "primereact/toast";
import {ProgressSpinner} from "primereact/progressspinner";
import "./login.css";

export default function LoginM() {
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
  ];

  const maritalOptions = [
    {label: "Single", value: "Single"},
    {label: "Married", value: "Married"},
    {label: "Widow", value: "Widow"},
  ];

  const skillsOptions = [
    {label: "Cleaning", value: "Cleaning"},
    {label: "Cooking", value: "Cooking"},
    {label: "Babysitting", value: "Babysitting"},
    {label: "Laundry", value: "Laundry"},
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
      if (!formData[key] && key !== "job_type") {
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.maid.id);
        localStorage.setItem("userRole", "MAID");
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: data.message,
        });
        window.location.href = "/Maidedit" + data.maid.id;
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.maid.id);
        localStorage.setItem("userRole", "MAID");
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful",
        });
        window.location.href = "/Maidedit/" + data.maid.id;
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
                        <input type="email" name="email" placeholder="Email"
                               onChange={handleInputChange} required/>
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
                        <input type="text" name="contact_number" placeholder="Contact Number"
                               onChange={handleInputChange} required/>
                      </>
                  )}
                  {signupStep === 1 && (
                      <>
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
                            className="w-full"
                        />
                        <label htmlFor="profile_photo">Upload Profile Photo</label>
                        <input type="file" name="profile_photo" onChange={handleFileChange} required/>
                        <label htmlFor="cnic_photo_front">Upload CNIC Front</label>
                        <input type="file" name="cnic_photo_front" onChange={handleFileChange}
                               required/>
                        <label htmlFor="cnic_photo_back">Upload CNIC Back</label>
                        <input type="file" name="cnic_photo_back" onChange={handleFileChange} required/>
                      </>
                  )}
                </div>
                <div className="step-nav">
                  {signupStep > 0 &&
                      <button type="button" onClick={() => setSignupStep(signupStep - 1)}>Back</button>}
                  {signupStep < 2 &&
                      <button type="button" onClick={() => setSignupStep(signupStep + 1)}>Next</button>}
                  {signupStep === 2 && <button type="button" onClick={handleSignup}>Sign Up</button>}
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