import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

const Profile = () => {
  const navigate = useNavigate();
  const name = sessionStorage.getItem('name') || '';
  const email = sessionStorage.getItem('email') || '';
  const phone = sessionStorage.getItem('phone') || '';

  useEffect(() => {
    if (!sessionStorage.getItem('auth-token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <div className="profile-page__card">
        <p>
          <strong>Name:</strong> {name || '—'}
        </p>
        <p>
          <strong>Email:</strong> {email || '—'}
        </p>
        <p>
          <strong>Phone:</strong> {phone || '—'}
        </p>
      </div>
    </div>
  );
};

export default Profile;
