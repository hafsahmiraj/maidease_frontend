import React from 'react';
import './styles.css';



export default function MaidSignup() {
  return (
    <div className="form-container">
      <h2>Maid Signup Form</h2>
      <form action="/maid/signup" method="POST" encType="multipart/form-data">
        <fieldset>
          <legend>Personal Information</legend>

          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" placeholder="Enter full name" required />

          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="example@mail.com" required />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter your password" required />

          <label>Gender</label>
          <div className="radio-group">
            <label><input type="radio" name="gender" value="female" required /> Female</label>
            <label><input type="radio" name="gender" value="male" required /> Male</label>
            <label><input type="radio" name="gender" value="other" required /> Other</label>
          </div>

          <label htmlFor="cnic">CNIC Number</label>
          <input type="text" name="cnic" placeholder="e.g. 12345-1234567-1" required />

          <label htmlFor="contact">Contact Number</label>
          <input type="text" name="contact" placeholder="03xx-xxxxxxx" required />

          <label htmlFor="district">District</label>
          <select title="district" name="district" required>
            <option value="">Select District</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="KPK">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Kashmir">Kashmir</option>
          </select>

          <label htmlFor="city">City</label>
          <select title="city" name="city" required>
            <option value="">Select City</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Multan">Multan</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Sialkot">Sialkot</option>
            <option value="Gujranwala">Gujranwala</option>
            <option value="Sargodha">Sargodha</option>
            <option value="Bahawalpur">Bahawalpur</option>
            <option value="Abbottabad">Abbottabad</option>
            <option value="Mirpur">Mirpur</option>
            <option value="Muzaffarabad">Muzaffarabad</option>
          </select>

          <label htmlFor="address">Current Address</label>
          <textarea name="address" rows="3" placeholder="Full address here" required></textarea>

          <label htmlFor="marital_status">Marital Status</label>
          <select title="marital_status" name="marital_status" required>
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Work Details</legend>

          <label htmlFor="experience">Years of Experience</label>
          <select title="experience" name="experience" required>
            <option value="">Select Experience</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5+">5+ Years</option>
          </select>

          <label>Areas of Expertise</label>
          <div className="checkbox-group">
            <label><input type="checkbox" name="expertise[]" value="cleaning" /> Cleaning</label>
            <label><input type="checkbox" name="expertise[]" value="washing_clothes" /> Washing Clothes</label>
            <label><input type="checkbox" name="expertise[]" value="washing_dishes" /> Washing Dishes</label>
            <label><input type="checkbox" name="expertise[]" value="babysitting" /> Babysitting</label>
            <label><input type="checkbox" name="expertise[]" value="cooking" /> Cooking</label>
            <label><input type="checkbox" name="expertise[]" value="others" /> Others</label>
          </div>

          <label htmlFor="job_type">Job Type</label>
          <select title="job_type" name="job_type" required>
            <option value="">Select Job Type</option>
            <option value="full_time">Full-Time</option>
            <option value="hourly">Hourly</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Upload Documents</legend>

          <label htmlFor="photo">Profile Photo</label>
          <input title="photo" type="file" name="photo" accept="image/*" required />

          <label htmlFor="cnic_pic">CNIC Photo</label>
          <input title="cnic_pic" type="file" name="cnic_pic" accept="image/*" required />
        </fieldset>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
