import { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';


export default function LoginM() {
  const [signupStep, setSignupStep] = useState(0);
  const [district, setDistrict] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [experience, setExperience] = useState(null);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const nextStep = () => setSignupStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setSignupStep((prev) => Math.max(prev - 1, 0));

  const districtOptions = [
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Sindh', value: 'Sindh' },
    { label: 'Balochistan', value: 'Balochistan' },
    { label: 'KPK', value: 'KPK' },
  ];

  const maritalOptions = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Widdow', value: 'Widdow' },
  ];

  const experienceOptions = [
    { label: '1 Year', value: '1' },
    { label: '2 Years', value: '2' },
     { label: '3 Years', value: '3' },
     { label: '4 Years', value: '4' },
     { label: '5 Years', value: '5' },
  ];

  return (
      <>
    <div className="login-page-wrapper">
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Maid Account</h1>
            <div className="form-step-wrapper">
              {signupStep === 0 && (
                <>
                  <input type="text" placeholder="Name" />
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <input type="text" placeholder="CNIC" />
                  <input type="text" placeholder="Contact" />
                </>
              )}
              {signupStep === 1 && (
                <>
                  <input type="text" placeholder="City" />
                  <input type="text" placeholder="Address" />
                  <Dropdown
                    value={district}
                    onChange={(e) => setDistrict(e.value)}
                    options={districtOptions}
                    placeholder="Select District"
                    className="w-full"
                  />
                  <Dropdown
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.value)}
                    options={maritalOptions}
                    placeholder="Marital Status"
                    className="w-full"
                  />
                  <Dropdown
                    value={experience}
                    onChange={(e) => setExperience(e.value)}
                    options={experienceOptions}
                    placeholder="Experience"
                    className="w-full"
                  />
                </>
              )}
{signupStep === 2 && (
  <>
    <label htmlFor="photo">Upload Your Photo</label>
    <input type="file" name="photo" id="photo" accept="image/*" required />

    <label htmlFor="cnic_front">Upload CNIC Front Image</label>
    <input type="file" name="cnic_front" id="cnic_front" accept="image/*" required />

    <label htmlFor="cnic_back">Upload CNIC Back Image</label>
    <input type="file" name="cnic_back" id="cnic_back" accept="image/*" required />
  </>

              )}
            </div>
            <div className="step-nav">
              {signupStep > 0 && <button type="button" onClick={prevStep}>Back</button>}
              {signupStep < 2 && <button type="button" onClick={nextStep}>Next</button>}
              {signupStep === 2 && <button type="submit">Sign Up</button>}
            </div>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Maid Sign in</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Link to="#">Forgot your password?</Link>
            <button>Sign In</button>
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
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
