import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Dropdown} from 'primereact/dropdown';
import {Toast} from 'primereact/toast';
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
    contact_number: '',
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

  const stateOptions = [
    {label: 'Punjab', value: 'Punjab'},
    {label: 'Sindh', value: 'Sindh'},
    {label: 'Balochistan', value: 'Balochistan'},
    {label: 'KPK', value: 'KPK'},
  ];

  const maritalOptions = [
    {label: 'Single', value: 'Single'},
    {label: 'Married', value: 'Married'},
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

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userWithoutPassword.id);
        navigate('/Useredit');
      } else {
        toast.current.show({severity: 'error', summary: 'Error', detail: data.message});
      }
    } catch (error) {
      setLoading(false);
      toast.current.show({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: formData.email, password: formData.password}),
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        navigate('/Useredit');
      } else {
        toast.current.show({severity: 'error', summary: 'Error', detail: data.message});
      }
    } catch (error) {
      setLoading(false);
      toast.current.show({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
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
                          options={stateOptions}
                          placeholder="Select State"
                          className="w-full"
                          required
                      />
                      <Dropdown
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.value })}
                          options={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                            { label: 'Other', value: 'Other' },
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