import React from 'react';
import './styles.css';

export default function UserSignup() {
  return (
    <div className="form-container">
      <h2>User Signup Form</h2>
      <form action="/user/signup" method="POST" encType="multipart/form-data">
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
          <select name="district" required>
            <option value="">Select District</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="KPK">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Kashmir">Kashmir</option>
          </select>

          <label htmlFor="city">City</label>
          <select name="city" required>
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
            <option value="other">Other</option>
          </select>

          <label htmlFor="address">Current Address</label>
          <textarea name="address" rows="3" placeholder="Full address here" required></textarea>

          <label htmlFor="marital_status">Marital Status</label>
          <select name="marital_status" required>
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>House Requirements</legend>

          <label htmlFor="house_size">House Size (in Marla)</label>
          <input type="number" name="house_size" placeholder="e.g. 5, 10, 15" required />

          <label htmlFor="portions">Number of Portions</label>
          <select name="portions" required>
            <option value="">Select Portion Count</option>
            <option value="1">1 Portion</option>
            <option value="2">2 Portions</option>
            <option value="3">3 Portions</option>
            <option value="4">4+ Portions</option>
          </select>

          <label htmlFor="people">No. of People Living</label>
          <input type="number" name="people" placeholder="e.g. 4, 5, 6" required />

          <label>Maid Needed For</label>
          <div className="checkbox-group">
            <label><input type="checkbox" name="needs[]" value="cleaning" /> Cleaning</label>
            <label><input type="checkbox" name="needs[]" value="washing_clothes" /> Washing Clothes</label>
            <label><input type="checkbox" name="needs[]" value="washing_dishes" /> Washing Dishes</label>
            <label><input type="checkbox" name="needs[]" value="babysitting" /> Babysitting</label>
            <label><input type="checkbox" name="needs[]" value="cooking" /> Cooking</label>
            <label><input type="checkbox" name="needs[]" value="others" /> Others</label>
          </div>

          <label htmlFor="Timmings">Maid Timmings</label>
          <select name="Timmings" required>
            <option value="">Select Maid Timmings</option>
            <option value="full_time">Full-Time</option>
            <option value="part_time">Part-Time/hourly</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Upload Documents</legend>

          <label htmlFor="house_photo">House Photo</label>
          <input type="file" name="house_photo" accept="image/*" required />

          <label htmlFor="user_photo">Your Photo</label>
          <input type="file" name="user_photo" accept="image/*" required />

          <label htmlFor="cnic_photo">CNIC Photo</label>
          <input type="file" name="cnic_photo" accept="image/*" required />
        </fieldset>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
