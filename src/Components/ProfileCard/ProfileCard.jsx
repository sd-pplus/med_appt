import { Link } from 'react-router-dom';
import './ProfileCard.css';

const ProfileCard = ({ onNavigate }) => {
  return (
    <div className="profile-card" role="menu">
      <Link
        to="/profile"
        className="profile-card__link"
        role="menuitem"
        onClick={onNavigate}
      >
        Your Profile
      </Link>
    </div>
  );
};

export default ProfileCard;
