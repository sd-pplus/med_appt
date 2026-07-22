// Following code has been commented with appropriate comments for your reference.
// Import necessary modules from React and other files
import { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

// Define a Function component called ProfileForm
const ProfileForm = () => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});

  // Access the navigation functionality from React Router
  const navigate = useNavigate();

  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem('auth-token');
    if (!authtoken) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email'); // Get the email from session storage

      if (!authtoken) {
        navigate('/login');
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            Email: email, // Add the email to the headers
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          // Handle error case
          throw new Error('Failed to fetch user profile');
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email'); // Get the email from session storage

      if (!authtoken || !email) {
        navigate('/login');
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authtoken}`,
          'Content-Type': 'application/json',
          Email: email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem('name', updatedDetails.name);
        sessionStorage.setItem('phone', updatedDetails.phone);
        sessionStorage.setItem('email', updatedDetails.email);

        setUserDetails(updatedDetails);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
        navigate('/');
      } else {
        // Handle error case
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {userDetails.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={updatedDetails.name || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="phone"
            value={updatedDetails.phone || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={updatedDetails.email || ''}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

// Export the ProfileForm component as the default export
export default ProfileForm;
