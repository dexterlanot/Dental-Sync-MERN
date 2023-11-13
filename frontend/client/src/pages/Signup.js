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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="1em">
                <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z"></path>
              </svg>
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