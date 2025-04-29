import React, { useState } from "react";
import './components/styles.css';
import { Avatar } from 'primereact/avatar';
import { Checkbox } from 'primereact/checkbox';

export default function BookingPage() {
    const [skills, setSkills] = useState([]);

    const skillsWithPrices = {
        cleaning: 500,
        cooking: 400,
        washing_dishes: 300,
        babysitting: 600,
        laundry: 350,
        others: 200,
    };

    const selectedSkills = ['cleaning', 'cooking', 'laundry'];

    const calculateTotal = () => {
        let total = 0;
        selectedSkills.forEach(skill => {
            total += skillsWithPrices[skill];
        });
        return total;
    };

    const onSkillsChange = (e) => {
        let _skills = [...skills];

        if (e.checked)
            _skills.push(e.value);
        else
            _skills.splice(_skills.indexOf(e.value), 1);

        setSkills(_skills);
    };

    return (
        <div className="main-container">
        <div className="form-container">
            <h2>Booking</h2>

            <form action="/booking" method="POST" encType="multipart/form-data">
                <div className="avatar-preview" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Avatar image="/images.jpg" size="xlarge" shape="circle" />
                </div>

                <fieldset>
                    <label htmlFor="maid_name">Maid Name</label>
                    <input type="text" name="maid_name" value="Ayesha Khan" readOnly />

                    <label htmlFor="house_size">House Size (in Marla)</label>
                    <input type="number" name="house_size" placeholder="Enter house size" required />

                    <label htmlFor="portions">Number of Portions</label>
                    <input type="number" name="portions" placeholder="Enter number of portions" required />

                    <label htmlFor="people_living">No. of People Living</label>
                    <input type="number" name="people_living" placeholder="Enter number of residents" required />

                    <div className="form-section">
                        <label className="section-label">Maid Needed For (Skills)</label>
                        <div className="checkbox-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox inputId="skill1" name="skills" value="cleaning" onChange={onSkillsChange} checked={skills.includes('cleaning')} />
                                <label htmlFor="skill1" style={{ marginLeft: '5px' }}>Cleaning</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox inputId="skill2" name="skills" value="cooking" onChange={onSkillsChange} checked={skills.includes('cooking')} />
                                <label htmlFor="skill2" style={{ marginLeft: '5px' }}>Cooking</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox inputId="skill3" name="skills" value="washing_dishes" onChange={onSkillsChange} checked={skills.includes('washing_dishes')} />
                                <label htmlFor="skill3" style={{ marginLeft: '5px' }}>Washing Dishes</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox inputId="skill4" name="skills" value="babysitting" onChange={onSkillsChange} checked={skills.includes('babysitting')} />
                                <label htmlFor="skill4" style={{ marginLeft: '5px' }}>Babysitting</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox inputId="skill5" name="skills" value="laundry" onChange={onSkillsChange} checked={skills.includes('laundry')} />
                                <label htmlFor="skill5" style={{ marginLeft: '5px' }}>Laundry</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox inputId="skill6" name="skills" value="others" onChange={onSkillsChange} checked={skills.includes('others')} />
                                <label htmlFor="skill6" style={{ marginLeft: '5px' }}>Others</label>
                            </div>
                        </div>
                    </div>

                    <label className="section-label">Job Type</label>
                    <div className="radio-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="radio" id="full_time" name="job_type" value="full_time" required />
                            <label htmlFor="full_time" style={{ marginLeft: '5px', whiteSpace: 'nowrap' }}>Full-Time (On Site)</label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="radio" id="hourly" name="job_type" value="hourly" required />
                            <label htmlFor="hourly" style={{ marginLeft: '5px', whiteSpace: 'nowrap' }}>Hourly</label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="radio" id="both" name="job_type" value="both" required />
                            <label htmlFor="both" style={{ marginLeft: '5px', whiteSpace: 'nowrap' }}>Both</label>
                        </div>
                    </div>

                    <label htmlFor="timing">Preferred Timing of Work</label>
                    <input type="text" name="timing" placeholder="e.g. 9AM - 5PM" required />

                    <label htmlFor="house_photo">Upload House Photo</label>
                    <input id="house_photo" type="file" name="house_photo" accept="image/*" required />
                </fieldset>

            </form>
        </div>
        <div className="receipt-container">
        <h2>Receipt</h2>

        <div className="skills-list">
            <div className="skills-header">
                <span>Skill</span>
                <span>Amount</span>
            </div>

            {selectedSkills.map((skill, index) => (
                <div key={index} className="skill-item">
                    <span>{skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                    <span>${skillsWithPrices[skill]}</span>
                </div>
            ))}
        </div>

        <div className="total-amount">
            <span>Total Amount:</span>
            <span>${calculateTotal()}</span>
        </div>

        <div className="book-button">
            <button type="submit">Book Now</button>
        </div>
        </div>
        </div>
    );
}
