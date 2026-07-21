import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setShowerr('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);

        // Fetch user details so Navbar can show the username
        try {
          const userResponse = await fetch(`${API_URL}/api/auth/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              email,
            },
          });
          const userJson = await userResponse.json();
          if (userJson.name) {
            sessionStorage.setItem('name', userJson.name);
          }
          if (userJson.phone) {
            sessionStorage.setItem('phone', userJson.phone);
          }
        } catch {
          // Token is already stored; username can fall back to email
        }

        navigate('/');
        window.location.reload();
      } else if (json.errors) {
        for (const error of json.errors) {
          setShowerr(error.msg);
        }
      } else {
        setShowerr(json.error || 'Login failed');
      }
    } catch {
      setShowerr('Unable to connect to the server');
    }
  };

  return (
    <div className="container">
      {/* Div for login grid layout */}
      <div className="login-grid">
        {/* Div for login text */}
        <div className="login-text">
          <h2>Login</h2>
        </div>
        {/* Additional login text with a link to Sign Up page */}
        <div className="login-text">
          Are you a new member?{' '}
          <span>
            <Link to="/signup" style={{ color: '#2190FF' }}>
              {' '}
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        {/* Div for login form */}
        <div className="login-form">
          <form onSubmit={login}>
            {/* Form group for email input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
                required
              />
            </div>
            {/* Form group for password input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
                required
              />
            </div>
            {showerr && (
              <div className="err" style={{ color: 'red' }}>
                {showerr}
              </div>
            )}
            {/* Button group for login and reset buttons */}
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  setShowerr('');
                }}
              >
                Reset
              </button>
            </div>
            <br />
            {/* Additional login text for 'Forgot Password' option */}
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
