import React from 'react'
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className='sign-up-container'>
      <div className='sign-up-form'>
        <form className="form">
          <h2>Create account</h2>

          <div className="flex-row">
            <div className="flex-column">
              <label>First Name</label>
              <div className="inputForm">
                <input type="text" className="input" placeholder="Enter your First Name" required />
              </div>
            </div>

            <div className="flex-column">
              <label>Last Name</label>
              <div className="inputForm">
                <input type="text" className="input" placeholder="Enter your Last Name" required />
              </div>
            </div>
          </div>

          <div className="flex-column">
            <label>Email</label>
            <div className="inputForm">
              <input type="text" className="input" placeholder="Enter your Email" required />
            </div>
          </div>

          <div className="flex-column">
            <label>Password</label>
            <div className="inputForm">
              <input type="password" className="input" placeholder="Enter your Password" required />
            </div>
          </div>

          <button className="button-submit">Sign Up</button>

          <p className="p">
            Already have an account?
            <span className="span"><Link to="/login" className='login-link'>Log In</Link></span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup