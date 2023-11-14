import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    
    <section className='home'>
      <div className='welcome-text'>
        <p>
          Welcome to <br />
          <span className='name'>TOOTH TALKS DENTAL CLINIC MANAGEMENT SYSTEM</span> <br />
        </p>
        <div className='button-container'>
        <Link to="/login" className='login-link'> 
          <button class="button">
          <svg className='login-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4857 20H19.4857C20.5903 20 21.4857 19.1046 21.4857 18V6C21.4857 4.89543 20.5903 4 19.4857 4H15.4857V6H19.4857V18H15.4857V20Z" fill="currentColor" /><path d="M10.1582 17.385L8.73801 15.9768L12.6572 12.0242L3.51428 12.0242C2.96199 12.0242 2.51428 11.5765 2.51428 11.0242C2.51429 10.4719 2.962 10.0242 3.51429 10.0242L12.6765 10.0242L8.69599 6.0774L10.1042 4.6572L16.4951 10.9941L10.1582 17.385Z" fill="currentColor" /></svg>
            Proceed to Login
            <div class="arrow">›</div>
          </button>
        </Link>
        </div>
      </div>

    </section>
    
  )
}

export default Home