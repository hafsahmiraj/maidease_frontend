import React, {useState, useRef} from 'react';
import axios from 'axios';
import {Toast} from 'primereact/toast';
import {Dropdown} from 'primereact/dropdown';
import {MultiSelect} from 'primereact/multiselect';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import './login.css';

export default function MaidLogin() {
    const [formData, setFormData] = useState({});
    const [signupStep, setSignupStep] = useState(0);
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    const DistrictOptions = [
        {label: 'Punjab', value: 'Punjab'},
        {label: 'Sindh', value: 'Sindh'},
        {label: 'Balochistan', value: 'Balochistan'},
        {label: 'KPK', value: 'KPK'},
        {label: 'Other', value: 'Other'},
    ];

    const maritalOptions = [
        {label: 'Single', value: 'Single'},
        {label: 'Married', value: 'Married'},
        {label: 'Widow', value: 'Widow'},
    ];

    const skillsOptions = [
        {label: 'Cleaning', value: 'Cleaning'},
        {label: 'Cooking', value: 'Cooking'},
        {label: 'Babysitting', value: 'Babysitting'},
        {label: 'Laundry', value: 'Laundry'},
        {label: 'Gardening', value: 'Gardening'},
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('name: ', name, 'value: ', value);
        if (name === 'use_ai') {
            setFormData({ ...formData, use_ai: value, title: '', description: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const {name, files} = e.target;
        const reader = new FileReader();
        reader.onload = () => {
            setFormData({...formData, [name]: reader.result});
        };
        reader.readAsDataURL(files[0]);
    };

    const storeMaidDataAndRedirect = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('maidId', data.maid.id);
        localStorage.setItem('userType', 'MAID');
        localStorage.setItem('maidDetails', JSON.stringify(data.maid));
        window.location.href = `/maidedit/${data.maid.id}`;
    };

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/maids/signup', formData, {
                headers: {'Content-Type': 'application/json'},
            });
            setLoading(false);

            if (response.status === 200) {
                storeMaidDataAndRedirect(response.data);
            } else {
                toast.current.show({severity: 'error', summary: 'Error', detail: response.data.message});
            }
        } catch (error) {
            setLoading(false);
            console.error('Error in signup:', error);
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
            const response = await axios.post('http://localhost:5000/api/maids/login', {
                email: formData.email,
                password: formData.password,
            }, {
                headers: {'Content-Type': 'application/json'},
            });
            setLoading(false);

            if (response.status === 200) {
                storeMaidDataAndRedirect(response.data);
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
                                    <input type="text" name="cnic_number" placeholder="CNIC"
                                           onChange={handleInputChange} required/>
                                    <input type="text" name="contact_number" placeholder="Contact"
                                           onChange={handleInputChange} required/>
                                </>
                            )}
                            {signupStep === 1 && (
                                <>
                                    <input type="text" name="city" placeholder="City" onChange={handleInputChange}
                                           required/>
                                    <input type="text" name="current_address" placeholder="Address"
                                           onChange={handleInputChange} required/>
                                    <Dropdown
                                        value={formData.District}
                                        onChange={(e) => setFormData({...formData, District: e.value})}
                                        options={DistrictOptions}
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
                                    <MultiSelect
                                        value={formData.skills}
                                        options={skillsOptions}
                                        onChange={(e) => setFormData({...formData, skills: e.value})}
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
                                                    ...(e.checked && { title: '', description: '' }) // Clear title and description if checked
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
                            <h1>Hello, Maids!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}