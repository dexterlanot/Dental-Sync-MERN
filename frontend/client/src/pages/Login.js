import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  const [user, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [error, setError] = useState(null);

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:3001/login', {email, password})
      const token = response.data.token
      //alert('Login successful')
      setEmail('')
      setPass('')
      fetchUsers();
      navigate('/dashboard')
      window.location.reload()
      localStorage.setItem('token', token)
    } catch (error) {
      setError('Incorrect email or password.')
    }
  }

  return (
    <div className='sign-up-container'>
      <div className='sign-up-form'>
    
        <form className="form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
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

          <button type='submit' className="button-submit">Login</button>

          <p className="p">
            Don't have an account?
            <span className="span"><Link to="/signup" className='login-link'>Sign Up</Link></span>
          </p>
        </form>
      </div>
    </div>

  )
}

export default Login