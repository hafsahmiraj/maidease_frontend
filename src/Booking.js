import React, { useState, useEffect } from "react";
import './booking.css';
import { Avatar } from 'primereact/avatar';
import { Checkbox } from 'primereact/checkbox';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from './MaidProfilePage';

export default function Booking() {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [maid, setMaid] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const { maidId } = useParams();

    const skillsWithPrices = {
        cleaning: 500,
        cooking: 400,
        washing_dishes: 300,
        babysitting: 600,
        laundry: 350,
        others: 200,
    };

    useEffect(() => {
        ProductService.getProducts().then((data) => {
            const selected = data.find(item => item.id === maidId);
            setMaid(selected);
        });
    }, [maidId]);

    const calculateTotal = () => {
        return skills.reduce((total, skill) => total + skillsWithPrices[skill], 0);
    };

    const onSkillsChange = (e) => {
        const _skills = [...skills];
        if (e.checked) _skills.push(e.value);
        else _skills.splice(_skills.indexOf(e.value), 1);
        setSkills(_skills);
    };

    if (!maid) return <div>Loading...</div>;

    return (
        <div className="booking-page-wrapper">
            <div className="booking-container-bookingpage">
                
                {/* Left Side: Form */}
                <div className="booking-form-bookingpage">
                    <h2>Booking</h2>
                    <form className="booking-form-layout">
                       <div className="maid-photo-wrapper">
  <img src={`/${maid.image}`} alt="Maid" className="maid-photo" />
</div>

                        <fieldset>
                            <label htmlFor="maid_name">Maid Name</label>
                            <input type="text" name="maid_name" value={maid.name} readOnly />

                            <label htmlFor="house_size">House Size (in Marla)</label>
                            <input type="number" name="house_size" placeholder="Enter house size" required />

                            <label htmlFor="portions">Number of Portions</label>
                            <input type="number" name="portions" placeholder="Enter number of portions" required />

                            <label htmlFor="people_living">No. of People Living</label>
                            <input type="number" name="people_living" placeholder="Enter number of residents" required />

                            <div className="form-section-booking">
                                <label className="section-label">Maid Needed For (Skills)</label>
                                <div className="checkbox-group-booking">
                                    {Object.keys(skillsWithPrices).map((skill, idx) => (
                                        <div key={idx} className="checkbox-item-booking">
                                            <Checkbox inputId={`skill${idx}`} name="skills" value={skill} onChange={onSkillsChange} checked={skills.includes(skill)} />
                                            <label htmlFor={`skill${idx}`}>{skill.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <label className="section-label">Job Type</label>
                            <div className="radio-group-booking">
                                <div><input type="radio" id="full_time" name="job_type" value="full_time" required /><label htmlFor="full_time">Full-Time (On Site)</label></div>
                                <div><input type="radio" id="hourly" name="job_type" value="hourly" required /><label htmlFor="hourly">Hourly</label></div>
                                <div><input type="radio" id="both" name="job_type" value="both" required /><label htmlFor="both">Both</label></div>
                            </div>

                            <label htmlFor="timing">Preferred Timing of Work</label>
                            <input type="text" name="timing" placeholder="e.g. 9AM - 5PM" required />

                            <label htmlFor="house_photo">Upload House Photo</label>
                            <input id="house_photo" type="file" name="house_photo" accept="image/*" required />
                        </fieldset>
                    </form>

                    <button className="complete-btn-booking" onClick={() => setShowReceipt(true)}>Complete</button>
                </div>

                {/* Right Side: Always visible, shows receipt only when form is completed */}
               <div className="booking-receipt-bookingpage">
    {!showReceipt ? (
        <div className="waiting-placeholder">
            <img src="/waiting1.png" alt="Waiting for booking" style={{ width: '100%', maxWidth: '1200px',height: '450px', margin: '0 auto', display: 'block' }} />
            <p style={{ textAlign: 'center', marginTop: '10px' }}>Your booking summary will appear here after completing the form.</p>
        </div>
    ) : (
        <div className="receipt-content">
            <h2>Receipt</h2>

            <div className="skills-list-booking">
                <div className="skills-header-booking">
                    <span>Skill</span>
                    <span>Amount</span>
                </div>
                {skills.map((skill, index) => (
                    <div key={index} className="skill-item-booking">
                        <span>{skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                        <span>${skillsWithPrices[skill]}</span>
                    </div>
                ))}
            </div>

            <div className="total-amount-booking">
                <span>Total Amount:</span>
                <span>${calculateTotal()}</span>
            </div>

            <div className="checkout-button">
                <button type="submit" onClick={() => navigate('/checkout')}>Checkout</button>
            </div>
        </div>
    )}
</div>

            </div>
        </div>
    );
}
