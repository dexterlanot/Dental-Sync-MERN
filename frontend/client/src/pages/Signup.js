import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate();

  const [user, setUsers] = useState([])
  const [firstname, setFName] = useState('')
  const [lastname, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    axios.get('http://localhost:3001/register')
      .then((res) => {
        //console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleRegister = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/register', { firstname, lastname, email, password })
      .then(() => {
        alert('Your account was created successfully.')
        setFName('')
        setLName('')
        setEmail('')
        setPass('')
        fetchUsers()
        navigate('/login')
      })
      .catch((error) => {
        console.log('Unable to register user')
      })
  }

  return (
    <div className='sign-up-container'>
      <div className='sign-up-form'>
        <form className="form" onSubmit={handleRegister}>
          <h2>Create account</h2>

          <div className="flex-row">
            <div className="flex-column">
              <label>First Name</label>
              <div className="inputForm">
                <input type="text" className="input" placeholder="Enter your First Name" value={firstname} onChange={(e) => setFName(e.target.value)} required />
              </div>
            </div>

            <div className="flex-column">
              <label>Last Name</label>
              <div className="inputForm">
                <input type="text" className="input" placeholder="Enter your Last Name" value={lastname} onChange={(e) => setLName(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="flex-column">
            <label>Email</label>
            <div className="inputForm">
              <input type="text" className="input" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="flex-column">
            <label>Password</label>
            <div className="inputForm">
              <input type="password" className="input" placeholder="Enter your Password" value={password} onChange={(e) => setPass(e.target.value)} required />
            </div>
          </div>

          <button type='submit' className="button-submit">Sign Up</button>

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