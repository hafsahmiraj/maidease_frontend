import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Dropdown} from 'primereact/dropdown';
import {Toast} from 'primereact/toast';
import axios from 'axios';
import './login.css';

export default function UserU() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signupStep, setSignupStep] = useState(0);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    gender: '',
    cnic_number: '',
    state: '',
    city: '',
    current_address: '',
    marital_Status: '',
    profile_photo: '',
    cnic_photo_front: '',
    cnic_photo_back: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const ProvinceOptions = [
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Sindh', value: 'Sindh' },
    { label: 'Balochistan', value: 'Balochistan' },
    { label: 'KPK', value: 'KPK' },
    { label: 'Other', value: 'Other' },
  ];

  const maritalOptions = [
    {label: 'Single', value: 'Single'},
    {label: 'Married', value: 'Married'},
    {label: 'Widow', value: 'Widow'},
  ];

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleFileChange = (e) => {
    const {name, files} = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({...formData, [name]: reader.result});
    };
    reader.readAsDataURL(files[0]);
  };

  const storeUserDataAndRedirect = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('userType', 'USER');
    localStorage.setItem('userDetails', JSON.stringify(data.user));
    window.location.href = `/useredit/${data.user.id}`;
  }

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData, {
        headers: {'Content-Type': 'application/json'},
      });
      setLoading(false);
      console.log(response);
      if (response.status === 201) {
        storeUserDataAndRedirect(response.data);
      } else {
        toast.current.show({verity: 'error', summary: 'Error', detail: response.data.message});
      }
    } catch (error) {
      setLoading(false);
      console.log('error in catch: ',error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {'Content-Type': 'application/json'},
      });
      setLoading(false);

      if (response.status === 200) {
        storeUserDataAndRedirect(response.data);
      } else {
        toast.current.show({severity: 'error', summary: 'Error', detail: response.data.message});
      }
    } catch (error) {
      setLoading(false);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
      <div className="login-page-wrapper">
        <Toast ref={toast}/>
        {loading && <div className="loading-spinner">Loading...</div>}
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <h1>Create User Account</h1>
              <div className="form-step-wrapper">
                {signupStep === 0 && (
                    <>
                      <input type="text" name="full_name" placeholder="Full Name" onChange={handleInputChange}
                             required/>
                      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required/>
                      <input type="password" name="password" placeholder="Password" onChange={handleInputChange}
                             required/>
                      <input type="text" name="cnic_number" placeholder="CNIC" onChange={handleInputChange} required/>
                      <input type="text" name="contact_number" placeholder="Contact" onChange={handleInputChange}
                             required/>
                    </>
                )}
                {signupStep === 1 && (
                    <>
                      <input type="text" name="city" placeholder="City" onChange={handleInputChange} required/>
                      <input type="text" name="current_address" placeholder="Address" onChange={handleInputChange}
                             required/>
                      <Dropdown
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.value})}
                          options={ProvinceOptions}
                          placeholder="Select District"
                          className="w-full"
                          required
                      />
                      <Dropdown
                          value={formData.gender}
                          onChange={(e) => setFormData({...formData, gender: e.value})}
                          options={[
                            {label: 'Male', value: 'Male'},
                            {label: 'Female', value: 'Female'},
                            {label: 'Other', value: 'Other'},
                          ]}
                          placeholder="Select Gender"
                          className="w-full"
                          required
                      />
                      <Dropdown
                          value={formData.marital_Status}
                          onChange={(e) => setFormData({...formData, marital_Status: e.value})}
                          options={maritalOptions}
                          placeholder="Marital Status"
                          className="w-full"
                          required
                      />
                    </>
                )}
                {signupStep === 2 && (
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
                {signupStep > 0 && <button type="button" onClick={() => setSignupStep(signupStep - 1)}>Back</button>}
                {signupStep < 2 && <button type="button" onClick={() => setSignupStep(signupStep + 1)}>Next</button>}
                {signupStep === 2 && <button type="button" onClick={handleSignup}>Sign Up</button>}
              </div>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={(e) => e.preventDefault()}>
              <h1>User Sign in</h1>
              <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required/>
              <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required/>
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
                <h1>Hello, Users!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
