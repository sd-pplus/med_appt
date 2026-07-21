// Following code has been commented with appropriate comments for your reference.
import { useState } from 'react';
import './Sign_up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Normalize API error payloads (register uses `error`, login uses `errors`)
const getErrorMessage = (json) => {
  if (!json) return 'Something went wrong';
  if (Array.isArray(json.errors)) {
    return json.errors.map((err) => err.msg).join(', ');
  }
  if (Array.isArray(json.error)) {
    return json.error.map((err) => err.msg).join(', ');
  }
  if (typeof json.error === 'string') {
    return json.error;
  }
  return 'Registration failed';
};

// Function component for Sign Up form
const Sign_Up = () => {
  // State variables using useState hook
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState(''); // State to show error messages
  const navigate = useNavigate(); // Navigation hook from react-router

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setShowerr('');

    try {
      // API Call to register user
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone: phone,
        }),
      });

      const json = await response.json(); // Parse the response JSON

      if (json.authtoken) {
        // Store user data in session storage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);

        // Redirect user to home page
        navigate('/');
        window.location.reload(); // Refresh the page
      } else {
        setShowerr(getErrorMessage(json));
      }
    } catch (err) {
      console.error(err);
      setShowerr(
        'Unable to reach the server. Make sure the API is running on ' +
          API_URL
      );
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setShowerr('');
  };

  // JSX to render the Sign Up form
  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        {/* Title for the sign-up form */}
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        {/* Text for existing members to log in */}
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member?{' '}
          <span>
            <Link to="/login" style={{ color: '#2190FF' }}>
              {' '}
              Login
            </Link>
          </span>
        </div>
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            {/* Form group for user's name */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="name"
                required
                minLength={4}
                className="form-control"
                placeholder="Enter your name"
                aria-describedby="helpId"
              />
            </div>
            {/* Form group for user's phone number */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
                required
                minLength={10}
                pattern="[0-9]{10,}"
                title="Phone number should be at least 10 digits"
                className="form-control"
                placeholder="Enter your phone number"
                aria-describedby="helpId"
              />
            </div>
            {/* Form group for user's email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                required
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
              />
            </div>
            {/* Form group for user's password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                required
                minLength={8}
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
              />
            </div>
            {showerr && (
              <div className="err" style={{ color: 'red' }}>
                {showerr}
              </div>
            )}
            {/* Button group for form submission and reset */}
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up; // Export the Sign_Up component for use in other components
