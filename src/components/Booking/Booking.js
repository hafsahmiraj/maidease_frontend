import React, {useEffect, useRef, useState} from "react";
import './booking.css';
import {MultiSelect} from 'primereact/multiselect';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Toast} from 'primereact/toast';

export default function Booking() {
  const navigate = useNavigate();
  const {maidId} = useParams();
  const [maid, setMaid] = useState(null);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [houseDetails, setHouseDetails] = useState({
    house_size: '',
    no_of_portions: '',
    no_of_peoples: '',
    preferred_work_time: '',
    house_photo: null,
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  // Pricing list for skills
  const pricingList = [
    {value: "Cleaning", amount: 2000},
    {value: "Cooking", amount: 1500},
    {value: "Washing dishes", amount: 2500},
    {value: "Babysitting", amount: 5000},
    {value: "Laundry", amount: 3000},
    {value: "Gardening", amount: 2000},
    {value: "Full Time", amount: 12000},
  ];

  const PLATFORM_CHARGES = 500;

  useEffect(() => {
    // Fetch maid details
    const fetchMaidDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/maids/${maidId}`);
        setMaid(response.data);
        setSkillsOptions(response.data.skills.map(skill => ({label: skill, value: skill})));
      } catch (error) {
        console.error("Error fetching maid details:", error);
      }
    };
    fetchMaidDetails();
  }, [maidId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setHouseDetails({...houseDetails, house_photo: reader.result});
    };
    reader.readAsDataURL(file);
  };

  const calculateTotal = () => {
    const skillsTotal = selectedSkills.reduce((total, skill) => {
      const skillData = pricingList.find((s) => s.value === skill);
      return total + (skillData ? skillData.amount : 0);
    }, 0);
    return skillsTotal + PLATFORM_CHARGES;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
          'http://localhost:5000/api/maids/hire',
          {
            maid_id: parseInt(maidId),
            house_size: parseInt(houseDetails.house_size),
            no_of_portions: parseInt(houseDetails.no_of_portions),
            no_of_peoples: parseInt(houseDetails.no_of_peoples),
            hired_skills: selectedSkills,
            preferred_work_time: houseDetails.preferred_work_time,
            house_photo: houseDetails.house_photo,
            total_amount: calculateTotal(),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            validateStatus: () => true // allow handling all status codes
          }
      );

      if (response.status === 201) {
        setLoading(false);
        navigate('/booking');
      } else {
        setLoading(false);
        toast.current?.show({
          severity: 'error',
          summary: 'Booking Failed',
          detail: response.data?.message || 'Error submitting booking',
          life: 4000
        });
      }
    } catch (error) {
      setLoading(false);
      toast.current?.show({
        severity: 'error',
        summary: 'Booking Failed',
        detail: error.response?.data?.message || 'Error submitting booking',
        life: 4000
      });
    }
  };

  if (!maid) return (
      <>
        <Toast ref={toast}/>
        <div>Loading...</div>
      </>
  );

  return (
      <>
        <Toast ref={toast}/>
        <div className="booking-page-wrapper">
          <div className="booking-container-bookingpage">
            <div className="booking-form-bookingpage">
              <h2>Booking</h2>
              <form className="booking-form-layout">
                <div className="maid-photo-wrapper">
                  <img src={maid.profile_photo} alt="Maid" className="maid-photo"/>
                </div>
                <fieldset>
                  <label htmlFor="maid_name">Maid Name</label>
                  <input type="text" name="maid_name" value={maid.full_name} readOnly/>

                  <label htmlFor="house_size">House Size (in Marla)</label>
                  <input type="number" name="house_size" placeholder="Enter house size"
                         value={houseDetails.house_size}
                         onChange={(e) => setHouseDetails({...houseDetails, house_size: e.target.value})}
                         required/>

                  <label htmlFor="portions">Number of Portions</label>
                  <input type="number" name="portions" placeholder="Enter number of portions"
                         value={houseDetails.no_of_portions}
                         onChange={(e) => setHouseDetails({...houseDetails, no_of_portions: e.target.value})}
                         required/>

                  <label htmlFor="people_living">No. of People Living</label>
                  <input type="number" name="people_living" placeholder="Enter number of residents"
                         value={houseDetails.no_of_peoples}
                         onChange={(e) => setHouseDetails({...houseDetails, no_of_peoples: e.target.value})}
                         required/>

                  <label htmlFor="skills">Maid Needed For (Skills)</label>
                  <div style={{display: 'flex', marginTop: '10px'}}>
                    <MultiSelect
                        value={selectedSkills}
                        options={skillsOptions}
                        onChange={(e) => setSelectedSkills(e.value)}
                        placeholder="Select Skills"
                        display="chip"
                        className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="timing">Preferred Timing of Work</label>
                    <input type="text" name="timing" placeholder="e.g. 9AM - 5PM"
                           value={houseDetails.preferred_work_time} onChange={(e) => setHouseDetails({
                      ...houseDetails,
                      preferred_work_time: e.target.value
                    })} required/>
                  </div>
                  <label htmlFor="house_photo">Upload House Photo</label>
                  <input id="house_photo" type="file" name="house_photo" accept="image/*"
                         onChange={handleFileChange} required/>
                </fieldset>
              </form>

              <button className="complete-btn-booking" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Complete'}
              </button>
            </div>

            <div className="booking-receipt-bookingpage">
              <div className="receipt-content">
                <h2>Receipt</h2>
                <div className="skills-list-booking">
                  <div className="skills-header-booking">
                    <span>Skill</span>
                    <span>Amount</span>
                  </div>
                  {selectedSkills.map((skill, index) => {
                    const skillData = pricingList.find((s) => s.value === skill);
                    return (
                        <div key={index} className="skill-item-booking">
                          <span>{skill}</span>
                          <span>Rs.{skillData ? skillData.amount : 0}</span>
                        </div>
                    );
                  })}
                  <div className="skill-item-booking">
                    <span>Platform Charges</span>
                    <span>Rs.{PLATFORM_CHARGES}</span>
                  </div>
                </div>
                <div className="total-amount-booking">
                  <span>Total Amount:</span>
                  <span>Rs.{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );

}
