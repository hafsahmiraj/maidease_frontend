import React from 'react';
import './styles.css'; // if local or use global import in App.js
import { Link } from 'react-router-dom';
export default function SignupSelection() {
  return (
    <div className="form-container">
      <h2>Choose Signup Type</h2>
      <div className="signup-options">
       <Link to="/maid/signup">Sign up as Maid</Link>
       <Link to="/user/signup">Sign up as User</Link>

        <p className="switch-link"><b>Already have an account? </b></p>
        <Link to="/maid/login">login as Maid</Link>
        <Link to="/user/login">login up as User</Link>

      </div>
    </div>
  );
}





/*const SignupSelection = () => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold">Choose Signup Type</h2>
      <button className="m-4 p-2 bg-blue-500 text-white rounded">User Signup</button>
      <button className="m-4 p-2 bg-green-500 text-white rounded">Maid Signup</button>
    </div>
  );
};

export default SignupSelection;

*/